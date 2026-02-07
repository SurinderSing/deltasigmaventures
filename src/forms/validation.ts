import type { FieldConfig, FormErrors, FormValues } from "../types";

/**
 * Validate a single field value against its config
 */
export function validateField(
  value: string,
  config: FieldConfig,
): string | undefined {
  const trimmedValue = value.trim();

  // Required check
  if (config.required && !trimmedValue) {
    return `${config.label} is required`;
  }

  // Skip further validation if empty and not required
  if (!trimmedValue) {
    return undefined;
  }

  // Custom validation rules
  if (config.validation) {
    const { pattern, minLength, maxLength, message } = config.validation;

    if (pattern && !pattern.test(trimmedValue)) {
      return message;
    }

    if (minLength !== undefined && trimmedValue.length < minLength) {
      return message;
    }

    if (maxLength !== undefined && trimmedValue.length > maxLength) {
      return message;
    }
  }

  return undefined;
}

/**
 * Validate all form values against schema
 */
export function validateForm(
  values: FormValues,
  schema: FieldConfig[],
): FormErrors {
  const errors: FormErrors = {};

  for (const field of schema) {
    const value = values[field.name] ?? "";
    const error = validateField(value, field);
    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}

/**
 * Check if form has any errors
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}
