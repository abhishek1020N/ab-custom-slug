import React, { useState, useEffect } from "react";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import {
  Field,
  FieldAction,
  FieldInput,
  FieldLabel,
  FieldError,
} from "@strapi/design-system/Field";

import { Stack } from "@strapi/design-system/Stack";
import Refresh from "@strapi/icons/Refresh";
import slugify from "../../utils/slugify";

const Input = ({ name, value, intlLabel, attribute }) => {
  const targetField = attribute.options?.targetField;
  const theme = localStorage.getItem("STRAPI_THEME");
  const { modifiedData, onChange } = useCMEditViewDataManager();
  const [slug, setSlug] = useState(value);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (
      !modifiedData ||
      !modifiedData[targetField] ||
      value !== modifiedData[targetField]
    ) {
      return;
    }

    setSlug(encodeURIComponent(modifiedData[targetField], "-"));
    onChange({
      target: {
        name,
        value: encodeURIComponent(modifiedData[targetField], "-"),
        type: "text",
      },
    });
  }, []);

  useEffect(() => {
    if (!modifiedData || !modifiedData[targetField] || isModified) {
      return;
    }

    setIsModified(false);
    modifySlugAndData(modifiedData[targetField]);
  }, [modifiedData]);

  const changeInputField = (value) => {
    setIsModified(true);
    modifySlugAndData(value);
  };

  const modifySlugAndData = (value) => {
    const sluggifiedValue = encodeURIComponent(value, "-");

    setSlug(sluggifiedValue);
    onChange({ target: { name, value: sluggifiedValue, type: "text" } });
  };

  return (
    <Stack spacing={1}>
      <Field name="slug" error={!slug ? "Slug is required" : null}>
        <FieldLabel required={attribute.required}>
          {intlLabel?.defaultMessage}
        </FieldLabel>
        <FieldInput
          label="slug"
          name="slug"
          value={slug}
          onBlur={() => changeInputField(slug)}
          onChange={(e) => changeInputField(e.target.value)}
          endAction={
            <Stack horizontal spacing={2}>
              <div
                style={{
                  backgroundColor:
                    theme === "light" ? "" : "rgb(240, 240, 255)",
                }}
              >
                <FieldAction label="regenerate">
                  <Refresh
                    onClick={() => changeInputField(modifiedData[targetField])}
                  />
                </FieldAction>
              </div>
            </Stack>
          }
        />
        <FieldError />
      </Field>
    </Stack>
  );
};

export default Input;
