// src/models/Certificate.ts
import { Schema, model, models } from 'mongoose';
import { FieldType } from '@/types/formTypes';

const customFormSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  activity: { type: Schema.Types.ObjectId, ref: 'Activity' },
  fields: [
    {
      id: { type: String, required: true },
      label: { type: String, required: true },
      type: { type: String, enum: Object.values(FieldType), required: true },
      placeholder: { type: String },
      options: [{ type: String }],
      required: { type: Boolean },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const CustomForm = models.CustomForm || model('CustomForm', customFormSchema);

export default CustomForm;
