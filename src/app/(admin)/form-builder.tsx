'use client';
import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { FormField as FormFieldType } from '../../types/formTypes';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/datepicker';
import { SelectScrollable } from '@/components/select-scrollable';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormBuilderProps {
  formFields: FormFieldType[];
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
}

const FormBuilder = ({ formFields, setFormFields }: FormBuilderProps) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(formFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormFields(items);
  };

  const renderField = (field: FormFieldType) => {
    switch (field.type) {
      case 'text':
        return (
          <div className="w-full">
            <label className="mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <Input type="text" placeholder={field.placeholder} />
          </div>
        );
      case 'radio':
        return (
          <div className="w-full">
            <div className="mb-2">{field.label}</div>
            <RadioGroup>
              {field.options?.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={idx.toString()} />
                  <Label htmlFor={idx.toString()}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
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
              {field.required && <span className="text-red-500">*</span>}
            </label>
          </div>
        );
      case 'date':
        return (
          <div className="w-full">
            <div className="mb-2">{field.label}</div>
            <DatePicker />
          </div>
        );
      case 'range':
        return (
          <div className="w-full">
            <div className="mb-2">{field.label}</div>
            <Input type="range" />
          </div>
        );
      case 'select':
        return (
          <div className="w-full">
            <div className="mb-2">{field.label}</div>
            <SelectScrollable options={field.options!} />
          </div>
        );
      default:
        return <Input />; // Default case if type is not matched
    }
  };

  if (formFields.length === 0)
    return (
      <div className="text-sm">
        Select a form to edit or start creating a new form by selecting one of
        the fields.
      </div>
    );

  return (
    <div className="my-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ROOT">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {formFields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="flex items-center border p-3 rounded-md w-[500px]">
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
        <p className="mt-4 text-xs text-slate-500">
          Continue adding fields here or click 'Create Form' to save your form.
        </p>
        <Button variant={'default'} className="mt-3">
          Create Form
        </Button>
      </DragDropContext>
    </div>
  );
};
export default FormBuilder;
