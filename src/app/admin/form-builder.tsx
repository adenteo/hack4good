// FormBuilder.tsx
'use client';
import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { FormField as FormFieldType } from './types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/datepicker';
import { SelectScrollable } from '@/components/select-scrollable';
import { GripVertical } from 'lucide-react';

const initialFields: FormFieldType[] = [
  {
    id: '1',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
  },
  {
    id: '2',
    label: 'Are you happy?',
    type: 'radio',
    options: ['Yes', 'No', 'Maybe'],
  },
  {
    id: '3',
    label: 'Be contacted for future events',
    type: 'checkbox',
  },
  {
    id: '4',
    label: 'When are you free?',
    type: 'date',
    placeholder: 'Enter your fsdfd',
  },
  {
    id: '5',
    label: 'How sad are you?',
    type: 'range',
  },
  {
    id: '6',
    label: 'Select something',
    type: 'select',
    options: ['Yes', 'No', 'Maybe', 'Yes', 'No', 'Maybe', 'Yes', 'No', 'Maybe'],
  },
];

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormFieldType[]>(initialFields);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const renderField = (field: FormFieldType) => {
    switch (field.type) {
      case 'text':
        return (
          <div>
            <label>{field.label}</label>
            <Input
              className="mt-2"
              type="text"
              placeholder={field.placeholder}
            />
          </div>
        );
      case 'radio':
        return (
          <RadioGroup>
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={idx.toString()} />
                <Label htmlFor={idx.toString()}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
            </label>
          </div>
        );
      case 'date':
        return <DatePicker />;
      case 'range':
        return <Input type="range" />;
      case 'select':
        return <SelectScrollable />;
      default:
        return <Input />; // Default case if type is not matched
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="header">
          <h1 className="my-6 text-xl font-semibold">Form Preview</h1>
        </div>
        <Droppable droppableId="ROOT">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="flex items-center border p-3 rounded-md">
                        <GripVertical className="mr-2" />
                        {renderField(field)}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default FormBuilder;
