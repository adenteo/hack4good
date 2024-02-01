// types.ts
export type FormFieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'radio'
  | 'range';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}
