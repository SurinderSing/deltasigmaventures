import { TextField } from "@mui/material";
import type { FieldConfig } from "../types";

interface DynamicFieldProps {
  config: FieldConfig;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
}

/**
 * Renders appropriate MUI input based on field type
 * Supports: text, email, tel, number, date, textarea
 */
export function DynamicField({
  config,
  value,
  error,
  onChange,
  onBlur,
}: DynamicFieldProps): React.JSX.Element {
  const { name, label, type, required, placeholder, helperText } = config;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(name, e.target.value);
  };

  const handleBlur = (): void => {
    onBlur(name);
  };

  const inputType = type === "textarea" ? "text" : type;
  const isMultiline = type === "textarea";

  return (
    <TextField
      fullWidth
      id={`field-${name}`}
      name={name}
      label={label}
      type={inputType}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(error)}
      helperText={error ?? helperText}
      required={required}
      placeholder={placeholder}
      multiline={isMultiline}
      rows={isMultiline ? 4 : undefined}
      slotProps={{
        inputLabel: {
          shrink: type === "date" ? true : undefined,
        },
      }}
    />
  );
}
