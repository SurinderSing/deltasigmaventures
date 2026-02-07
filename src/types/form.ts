/**
 * Supported form field types
 */
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "date"
  | "textarea"
  | "select";

/**
 * Validation rule configuration
 */
export interface ValidationRule {
  pattern?: RegExp;
  message: string;
  minLength?: number;
  maxLength?: number;
}

/**
 * Option for select fields
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Field configuration for dynamic form rendering
 * This is the core of the extensibility system
 */
export interface FieldConfig {
  /** Field name - must match User interface property */
  name: string;
  /** Display label */
  label: string;
  /** Input type */
  type: FieldType;
  /** Whether field is required */
  required: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Validation rules */
  validation?: ValidationRule;
  /** Options for select fields */
  options?: SelectOption[];
  /** Default value */
  defaultValue?: string;
  /** Grid width (1-12 for MUI grid) */
  gridWidth?: number;
  /** Helper text shown below input */
  helperText?: string;
}

/**
 * Form validation errors keyed by field name
 */
export interface FormErrors {
  [fieldName: string]: string | undefined;
}

/**
 * Form values keyed by field name
 */
export interface FormValues {
  [fieldName: string]: string;
}
