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
import { useRouter, useSearchParams } from 'next/navigation';

interface SelectFormProps {
  forms: CustomForm[];
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
  setSelectedForm: React.Dispatch<React.SetStateAction<CustomForm | null>>;
}

export function SelectForm({
  forms,
  setFormFields,
  setSelectedForm,
}: SelectFormProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const params = useSearchParams();
  const formParams = params.get('form');
  const router = useRouter();

  React.useEffect(() => {
    if (formParams) {
      const matchingForm = forms.find(
        (form) => form.title.toLowerCase() == formParams.toLowerCase(),
      );
      if (!matchingForm) return;
      setValue(formParams);
      setSelectedForm(matchingForm);
      setFormFields(matchingForm.fields);
    }
  }, [forms, formParams, setFormFields, setSelectedForm]);

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
                  setSelectedForm(form);
                  setOpen(false);
                  router.push(`?tab=form%20builder&form=${form.title}`);
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
