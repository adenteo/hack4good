import { FieldType } from '@/types/formTypes';
import { z } from 'zod';

export const createFormFieldSchema = z
  .object({
    label: z.string().min(2, 'Label must be at least 2 characters.'),
    type: z.nativeEnum(FieldType),
    placeholder: z.string().optional(),
    options: z.string().optional(),
    required: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const typesRequiringOptions = ['select', 'radio'];
      console.log(data.type);
      if (typesRequiringOptions.includes(data.type)) {
        return data.options && data.options.length > 0;
      }
      return true;
    },
    {
      message: 'Options are required for the selected field type.',
      path: ['options'],
    },
  );
