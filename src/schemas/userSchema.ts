import type { FieldConfig } from "../types";

/**
 * USER SCHEMA CONFIGURATION
 *
 * This is the single source of truth for user fields.
 * To add a new field, simply add a new entry to this array.
 * The form, validation, and table will automatically update.
 *
 * @example Adding a new field:
 * {
 *   name: 'dateOfBirth',
 *   label: 'Date of Birth',
 *   type: 'date',
 *   required: false,
 *   placeholder: 'Select date',
 *   gridWidth: 6,
 * }
 */
export const userSchema: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Enter first name",
    gridWidth: 6,
    validation: {
      minLength: 2,
      maxLength: 50,
      message: "First name must be 2-50 characters",
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter last name",
    gridWidth: 6,
    validation: {
      minLength: 2,
      maxLength: 50,
      message: "Last name must be 2-50 characters",
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "email@example.com",
    gridWidth: 6,
    validation: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address",
    },
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "+1-555-123-4567",
    gridWidth: 6,
    helperText: "Format: +1-555-123-4567",
    validation: {
      pattern: /^\+?[\d\s\-()]{10,20}$/,
      message: "Please enter a valid phone number",
    },
  },
];

/**
 * Get field names as an array (useful for table columns)
 */
export function getFieldNames(): string[] {
  return userSchema.map((field) => field.name);
}

/**
 * Get a specific field config by name
 */
export function getFieldConfig(name: string): FieldConfig | undefined {
  return userSchema.find((field) => field.name === name);
}

/**
 * Get initial empty form values based on schema
 */
export function getInitialFormValues(): Record<string, string> {
  return userSchema.reduce<Record<string, string>>((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {});
}
