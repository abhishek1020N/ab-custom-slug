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

const Input = ({ name, value, intlLabel, attribute, required }) => {
  const targetField = attribute?.options?.targetField;
  const { modifiedData, onChange } = useCMEditViewDataManager();
  const [slug, setSlug] = useState(value || "");

  useEffect(() => {
    if (!value && targetField && modifiedData?.[targetField]) {
      const initialSlug = encodeURI(slugify(modifiedData[targetField]));
      setSlug(initialSlug);
      onChange({ target: { name, value: initialSlug, type: "text" } });
    }
  }, [value, targetField, modifiedData]);

  const updateSlug = (newValue) => {
    const sluggified = encodeURI(slugify(newValue));
    setSlug(sluggified);
    onChange({ target: { name, value: sluggified, type: "text" } });
  };

  const handleChange = (e) => {
    setSlug(e.target.value);
    onChange({ target: { name, value: e.target.value, type: "text" } });
  };

  return (
    <Stack spacing={1}>
      <Field name={name} error={!slug && required ? "Slug is required" : null}>
        <FieldLabel required={attribute?.required}>
          {intlLabel?.defaultMessage || name}
        </FieldLabel>
        <FieldInput
          name={name}
          value={slug}
          onChange={handleChange}
          endAction={
            targetField ? (
              <FieldActionWrapper label="Regenerate">
                <Refresh onClick={() => updateSlug(modifiedData?.[targetField] || "")} />
              </FieldActionWrapper>
            ) : null
          }
        />
        <FieldError />
      </Field>
    </Stack>
  );
};

export default Input;
