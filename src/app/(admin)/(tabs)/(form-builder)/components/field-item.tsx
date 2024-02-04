'use client ';
import { FieldType, FormField as FormFieldType } from '@/types/formTypes';
import { DatePicker } from '@/components/datepicker';
import { SelectScrollable } from '@/components/select-scrollable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createFormFieldSchema } from '@/lib/validators/create-form-field-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { nanoid } from 'nanoid';
import { toast } from '@/components/ui/use-toast';

interface FieldItemProps {
  formField: FormFieldType;
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
}

const FieldItem = ({ formField, setFormFields }: FieldItemProps) => {
  const form = useForm<z.infer<typeof createFormFieldSchema>>({
    resolver: zodResolver(createFormFieldSchema),
    defaultValues: {
      label: '',
      placeholder: '',
      type: formField.type,
      options: '',
      required: false,
    },
  });

  async function onSubmit(values: z.infer<typeof createFormFieldSchema>) {
    setFormFields((prev) => [
      ...prev,
      {
        ...values,
        id: nanoid(),
        options: values.options?.split(';'),
      },
    ]);
    toast({
      className: 'bg-green-500 text-white font-semibold border-none',
      title: 'Field added',
      description: `The ${values.type} field has been added to the form.`,
    });

    form.reset();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between p-4 rounded-md group hover:bg-slate-100">
          <Label>{capitalizeFirstLetter(formField.type)}</Label>
          <Plus size={15} className="hidden group-hover:block text-slate-600" />
        </div>
      </DialogTrigger>

      <Separator className="my-1" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Example {formField.type} field
          </DialogTitle>
          <DialogDescription className="bg-gray-100 rounded-md p-4">
            <div>{renderExampleField(formField)}</div>
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add {formField.type} field
          </DialogTitle>
          <DialogDescription>
            <p className="mb-4">
              Customise and add your own {formField.type} field.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Label<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {formField.type === FieldType.Text && (
                  <FormField
                    control={form.control}
                    name="placeholder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          Placeholder
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Placeholder" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {(formField.type === FieldType.Radio ||
                  formField.type === FieldType.Select) && (
                  <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          Options<span className="text-red-500">*</span>
                          <span className="text-xs text-gray-400">
                            {' '}
                            (Separate with ;)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Option1;Option2;Option3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="required"
                  render={({ field }) => (
                    <FormItem className="flex justify-start items-center">
                      <FormLabel className="text-black mr-2 mt-2">
                        Is this field required?
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Add field
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const renderExampleField = (field: FormFieldType) => {
  switch (field.type) {
    case 'text':
      return (
        <div>
          <label>{field.label}</label>
          <Input
            disabled
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
              <RadioGroupItem disabled value={option} id={idx.toString()} />
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
      return (
        <div>
          <DatePicker />
        </div>
      );
    case 'range':
      return <Input type="range" />;
    case 'select':
      return <SelectScrollable options={['Item 1', 'Item 2', 'Item 3']} />;
  }
};

function capitalizeFirstLetter(fieldName: string) {
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

export default FieldItem;
