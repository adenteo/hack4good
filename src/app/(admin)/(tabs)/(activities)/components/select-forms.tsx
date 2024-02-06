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
import { CustomForm } from '@/types/formTypes';
import { useEffect } from 'react';

interface SelectFormProps {
  forms: CustomForm[];
  signUpForm: any;
  setFormId: React.Dispatch<React.SetStateAction<string>>;
  setIsLinked: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SelectForm({
  forms,
  signUpForm,
  setFormId,
  setIsLinked,
}: SelectFormProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  useEffect(() => {
    if (signUpForm) {
      const matchingForm = forms.find((form) => form._id === signUpForm._id);
      if (matchingForm) {
        setValue(matchingForm.title);
        setIsLinked(true);
      }
    }
  }, [forms, signUpForm]);

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
            {forms.map((form: any) => {
              const formId = form._id;
              return (
                <CommandItem
                  key={form.title}
                  value={form.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setFormId(formId);
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
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
