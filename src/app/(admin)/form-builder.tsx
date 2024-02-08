'use client';
import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { CustomForm, FormField as FormFieldType } from '../../types/formTypes';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/datepicker';
import { SelectScrollable } from '@/components/select-scrollable';
import { GripVertical, LucideTrash2, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createForm } from '@/lib/actions/create-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FormBuilderProps {
  formFields: FormFieldType[];
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
  selectedForm: CustomForm | null;
  forms: CustomForm[];
}

const FormBuilder = ({
  formFields,
  setFormFields,
  selectedForm,
  forms,
}: FormBuilderProps) => {
  const [open, setOpen] = useState(false);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(formFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormFields(items);
  };

  const onDelete = (id: string) => {
    const newFormFields = formFields.filter((field) => field.id !== id);
    setFormFields(newFormFields);
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
            <div className="mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </div>
            <DatePicker />
          </div>
        );
      case 'range':
        return (
          <div className="w-full">
            <div className="mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </div>
            <Input type="range" />
          </div>
        );
      case 'select':
        return (
          <div className="w-full">
            <div className="mb-2">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </div>
            <SelectScrollable options={field.options!} />
          </div>
        );
      default:
        return <Input />; // Default case if type is not matched
    }
  };

  const createFormSchema = z.object({
    title: z
      .string()
      .min(1, 'Title must be at least 1 character long')
      .max(20, 'Title must be at most 20 characters long'),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (form) {
      form.setValue('title', selectedForm?.title ?? '');
      form.setValue('description', selectedForm?.description ?? '');
    }
  }, [selectedForm, form]);

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    const response = await createForm(
      formFields,
      values.title,
      values.description ?? 'placeholder description',
    );
    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Error encountered while saving form.',
      });
    } else {
      toast({
        className: 'bg-green-500 border-none text-white',
        title: 'Successfully saved form!',
        description: 'You can now view it in the forms tab.',
      });
    }
    window.location.reload();
  }

  if (formFields.length === 0)
    return (
      <div className="text-sm">
        Select a form to edit or start creating a new form by selecting one of
        the fields.
      </div>
    );

  return (
    <div className="my-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between mb-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Title<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {formFields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div className="relative flex items-center border p-3 rounded-md w-[500px]">
                            <GripVertical className="mr-2" />
                            <Button
                              className="ml-5 absolute -left-20"
                              variant={'ghost'}
                              size={'icon'}
                              onClick={() => {
                                onDelete(field.id);
                              }}
                            >
                              <LucideTrash2 className=" text-red-500" />
                            </Button>
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
              Continue adding fields here or click &apos;Save Form&apos; to save
              your form.
            </p>
            <Button
              type="button"
              variant={'default'}
              className="mt-3"
              onClick={() => {
                if (
                  forms.some(
                    (existingForm) =>
                      existingForm.title === form.getValues('title'),
                  )
                ) {
                  setOpen(true);
                } else {
                  form.handleSubmit(onSubmit)();
                }
              }}
            >
              Save Form
            </Button>
          </DragDropContext>
        </form>
      </Form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Existing form exists</AlertDialogTitle>
            <AlertDialogDescription>
              A form with the same title already exists. Do you want to
              overwrite it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FormBuilder;
