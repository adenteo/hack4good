'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CustomForm,
  FormField as FormFieldType,
} from '../../../../types/formTypes';

// const forms: CustomForm[] = [
//   {
//     title: 'Form 1',
//     description: 'This is the first form',
//     fields: [
//       {
//         id: '1',
//         label: 'Name',
//         type: 'text',
//         placeholder: 'Enter your name',
//       },
//       {
//         id: '2',
//         label: 'Are you happy?',
//         type: 'radio',
//         options: ['Yes', 'No', 'Maybe'],
//       },
//       {
//         id: '3',
//         label: 'Be contacted for future events',
//         type: 'checkbox',
//       },
//       {
//         id: '4',
//         label: 'When are you free?',
//         type: 'date',
//         placeholder: 'Enter your fsdfd',
//       },
//       {
//         id: '5',
//         label: 'How sad are you?',
//         type: 'range',
//       },
//       {
//         id: '6',
//         label: 'Select something',
//         type: 'select',
//         options: [
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Form 2',
//     description: 'This is the first form',
//     fields: [
//       {
//         id: '1',
//         label: 'Name',
//         type: 'text',
//         placeholder: 'Enter your name',
//       },
//       {
//         id: '2',
//         label: 'Are you happy?',
//         type: 'radio',
//         options: ['Yes', 'No', 'Maybe'],
//       },
//       {
//         id: '3',
//         label: 'Be contacted for future events',
//         type: 'checkbox',
//       },
//       {
//         id: '4',
//         label: 'When are you free?',
//         type: 'date',
//         placeholder: 'Enter your fsdfd',
//       },
//       {
//         id: '5',
//         label: 'How sad are you?',
//         type: 'range',
//       },
//       {
//         id: '6',
//         label: 'Select something',
//         type: 'select',
//         options: [
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Form 3',
//     description: 'This is the first form',
//     fields: [
//       {
//         id: '1',
//         label: 'Name',
//         type: 'text',
//         placeholder: 'Enter your name',
//       },
//       {
//         id: '2',
//         label: 'Are you happy?',
//         type: 'radio',
//         options: ['Yes', 'No', 'Maybe'],
//       },
//       {
//         id: '3',
//         label: 'Be contacted for future events',
//         type: 'checkbox',
//       },
//       {
//         id: '4',
//         label: 'When are you free?',
//         type: 'date',
//         placeholder: 'Enter your fsdfd',
//       },
//       {
//         id: '5',
//         label: 'How sad are you?',
//         type: 'range',
//       },
//       {
//         id: '6',
//         label: 'Select something',
//         type: 'select',
//         options: [
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Form 4',
//     description: 'This is the first form',
//     fields: [
//       {
//         id: '1',
//         label: 'Name',
//         type: 'text',
//         placeholder: 'Enter your name',
//       },
//       {
//         id: '2',
//         label: 'Are you happy?',
//         type: 'radio',
//         options: ['Yes', 'No', 'Maybe'],
//       },
//       {
//         id: '3',
//         label: 'Be contacted for future events',
//         type: 'checkbox',
//       },
//       {
//         id: '4',
//         label: 'When are you free?',
//         type: 'date',
//         placeholder: 'Enter your fsdfd',
//       },
//       {
//         id: '5',
//         label: 'How sad are you?',
//         type: 'range',
//       },
//       {
//         id: '6',
//         label: 'Select something',
//         type: 'select',
//         options: [
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//           'Yes',
//           'No',
//           'Maybe',
//         ],
//       },
//     ],
//   },
// ];

interface SelectFormProps {
  forms: CustomForm[];
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
}

export function SelectForm({ forms, setFormFields }: SelectFormProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? forms.find(
                (form) => form.title.toLowerCase() == value.toLowerCase(),
              )?.title
            : 'Select form...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search form..." />
          <CommandEmpty>No form found.</CommandEmpty>
          <CommandGroup>
            {forms.map((form) => (
              <CommandItem
                key={form.title}
                value={form.title}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setFormFields(form.fields);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === form.title.toLowerCase()
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {form.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
