import * as React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FieldType,
  FormField as FormFieldType,
} from '../../../../types/formTypes';
import FieldItem from './components/field-item';

interface FieldsScrollableProps {
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
}

const fields: FormFieldType[] = [
  {
    id: '1',
    label: 'Name',
    type: FieldType.Text,
    placeholder: 'Enter your name',
  },
  {
    id: '2',
    label: 'Are you happy?',
    type: FieldType.Radio,
    options: ['Yes', 'No', 'Maybe'],
  },
  {
    id: '3',
    label: 'Be contacted for future events',
    type: FieldType.Checkbox,
  },
  {
    id: '4',
    label: 'What areas are you interested in?',
    type: FieldType.Multicheckbox,
  },
  {
    id: '5',
    label: 'Select a date',
    type: FieldType.Date,
  },
  {
    id: '6',
    label: 'How satisfied are you?',
    type: FieldType.Range,
  },
  {
    id: '7',
    label: 'Select something',
    type: FieldType.Select,
  },
];

const FieldsScrollable: React.FC<FieldsScrollableProps> = ({
  setFormFields,
}) => {
  return (
    <ScrollArea className="w-full h-full rounded-md border">
      <div className="p-4 flex flex-col">
        {fields.map((field) => (
          <div key={field.id}>
            <FieldItem formField={field} setFormFields={setFormFields} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default FieldsScrollable;
