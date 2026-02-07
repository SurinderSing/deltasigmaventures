import { useState, useCallback } from "react";
import { Box, Button, Grid2 } from "@mui/material";
import { DynamicField } from "./DynamicField";
import { validateField, validateForm, hasErrors } from "./validation";
import type { FieldConfig, FormErrors, FormValues } from "../types";

interface DynamicFormProps {
  schema: FieldConfig[];
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

/**
 * Dynamic form that renders fields based on schema configuration
 * Handles validation, state management, and submission
 */
export function DynamicForm({
  schema,
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  isLoading = false,
}: DynamicFormProps): React.JSX.Element {
  // Initialize form values from schema defaults merged with initial values
  const getInitialValues = useCallback((): FormValues => {
    const defaults: FormValues = {};
    for (const field of schema) {
      defaults[field.name] =
        initialValues[field.name] ?? field.defaultValue ?? "";
    }
    return defaults;
  }, [schema, initialValues]);

  const [values, setValues] = useState<FormValues>(getInitialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (name: string, value: string): void => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (name: string): void => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate on blur
      const fieldConfig = schema.find((f) => f.name === name);
      if (fieldConfig) {
        const error = validateField(values[name] ?? "", fieldConfig);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [schema, values],
  );

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Validate all fields
    const formErrors = validateForm(values, schema);
    setErrors(formErrors);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    for (const field of schema) {
      allTouched[field.name] = true;
    }
    setTouched(allTouched);

    if (!hasErrors(formErrors)) {
      onSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid2 container spacing={2}>
        {schema.map((field) => (
          <Grid2 key={field.name} size={{ xs: 12, sm: field.gridWidth ?? 12 }}>
            <DynamicField
              config={field}
              value={values[field.name] ?? ""}
              error={touched[field.name] ? errors[field.name] : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
        <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </Box>
    </Box>
  );
}
