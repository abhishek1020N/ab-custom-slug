import React, { useState, useEffect } from "react";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import {
  Field,
  FieldAction,
  FieldInput,
  FieldLabel,
  FieldError,
} from "@strapi/design-system/Field";
import styled from "styled-components";
import { Stack } from "@strapi/design-system/Stack";
import Refresh from "@strapi/icons/Refresh";
import slugify from '@sindresorhus/slugify';

export const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const Input = ({ name, value, intlLabel, attribute }) => {
  const targetField = attribute.options?.targetField;
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

    modifySlugAndData(modifiedData[targetField]);
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
    const sluggifiedValue = encodeURI(slugify(value));

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
              {targetField ? (
                <FieldActionWrapper label="regenerate">
                  <Refresh
                    onClick={() => changeInputField(modifiedData[targetField])}
                  />
                </FieldActionWrapper>
              ) : null}
            </Stack>
          }
        />
        <FieldError />
      </Field>
    </Stack>
  );
};

export default Input;
