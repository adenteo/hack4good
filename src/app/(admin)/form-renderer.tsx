import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema as formSchema } from '@/lib/validators/auth-validator';
import { useState } from 'react';
import { FieldType, FormField as FormFieldType } from '../../types/formTypes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/datepicker';
import { SelectScrollable } from '@/components/select-scrollable';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

function createFormSchema(fields: FormFieldType[]) {
  const schemaObject: { [key: string]: any } = {};

  fields.forEach((field) => {
    let validation;
    console.log(field.options);
    switch (field.type) {
      case 'text':
        if (field.required) {
          validation = z.string().min(1, 'This field is required');
          break;
        } else {
          validation = z.string().optional();
        }
        break;
      case 'radio':
        if (field.required) {
          validation = z.enum(field.options as [string, ...string[]], {
            required_error: 'You need to select at least one option',
          });
          break;
        } else {
          validation = z
            .enum(field.options as [string, ...string[]])
            .optional();
        }
        break;
      case 'select':
        if (field.required) {
          validation = z.string().min(1, 'Please select at least one item');
          break;
        } else {
          validation = z.string().optional();
        }
        break;
      case 'checkbox':
        if (field.required) {
          validation = z.boolean().default(false);
          break;
        } else {
          validation = z.boolean().default(false).optional();
        }

        break;
      case 'date':
        if (field.required) {
          validation = z.date({
            required_error: 'A date is required.',
          });
          break;
        } else {
          validation = z.date().optional();
        }
        break;
      case 'range':
        if (field.required) {
          validation = z.number().min(0, 'Value should be 0 or higher');
          break;
        } else {
          validation = z
            .number()
            .min(0, 'Value should be 0 or higher')
            .optional();
        }
      default:
        validation = z.string().optional();
    }

    schemaObject[field.id] = validation;
  });

  return z.object(schemaObject);
}

export default function FormRenderer({
  formFields,
}: {
  formFields: FormFieldType[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = createFormSchema(formFields);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    // },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const renderField = (formField: FormFieldType) => {
    switch (formField.type) {
      case 'text':
        return (
          <FormField
            control={form.control}
            name={formField.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input placeholder={formField.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'radio':
        return (
          <FormField
            control={form.control}
            name={formField.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {formField.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={idx.toString()} />
                        <Label htmlFor={idx.toString()}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'checkbox':
        return (
          <FormField
            control={form.control}
            name={formField.id}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-2">{formField.label}</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'date':
        return (
          <FormField
            control={form.control}
            name={formField.id}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{formField.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'range':
        return (
          <FormField
            control={form.control}
            name={formField.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    type="range"
                    placeholder={formField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'select':
        return (
          <FormField
            control={form.control}
            name={formField.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return <Input />; // Default case if type is not matched
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}
        <Button
          className="w-full"
          disabled={isLoading}
          type="button"
          onClick={form.handleSubmit(onSubmit)}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up with Email
        </Button>
      </form>
    </Form>
  );
}
