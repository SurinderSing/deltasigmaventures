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
    placeholder: "+1 (555) 123-4567",
    gridWidth: 6,
    helperText: "Include country code (e.g., +1 for US)",
    validation: {
      // Validates international phone formats:
      // +1-555-123-4567, +1 (555) 123-4567, +44 20 7946 0958, +91 98765 43210
      // Requires: country code starting with +, followed by 7-15 digits
      pattern:
        /^\+[1-9]\d{0,2}[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
      minLength: 10,
      maxLength: 20,
      message:
        "Enter a valid phone number with country code (e.g., +1 555-123-4567)",
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
