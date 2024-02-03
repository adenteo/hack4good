// types.ts

export enum FieldType {
  Text = 'text',
  Select = 'select',
  Checkbox = 'checkbox',
  Date = 'date',
  Radio = 'radio',
  Range = 'range',
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface CustomForm {
  title: string;
  description: string;
  fields: FormField[];
}
