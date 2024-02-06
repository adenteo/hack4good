'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from './datepicker';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { TimePicker } from './ui/time-picker';

const tags = [
  {
    id: 'children',
    label: 'Children',
  },
  {
    id: 'elderly',
    label: 'Elderly',
  },
  {
    id: 'animals',
    label: 'Animals',
  },
  {
    id: 'foodDrives',
    label: 'Food Drives',
  },
] as const;

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Activity Name must be at least 1 character.',
  }),
  address: z.string().min(1, {
    message: 'Address must be at least 1 character.',
  }),
  description: z.string().min(1, {
    message: 'Description must be at least 1 character.',
  }),
  additionalDetails: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  volunteerCountNeeded: z.string(),
  signUpLimit: z.string(),
  image: z.string().url({
    message: 'Invalid URL for the activity image.',
  }),
  signUpDeadline: z.date(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one category.',
  }),
  contactUs: z.string().email({
    message: 'Invalid email address for volunteers to contact.',
  }),
});

export function ActivityCreationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      address: '',
      description: '',
      additionalDetails: '',
      volunteerCountNeeded: '',
      signUpLimit: '',
      image: '',
      tags: [''],
      contactUs: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.endTime);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Activity Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter the name of the activity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Address<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="address"
                  placeholder="Enter the address where the activity will take place"
                  {...field}
                />
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
              <FormLabel className="text-black">
                Description<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="description"
                  placeholder="Describe the activity details"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-black">
                {' '}
                Start Date and Time of Activity
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, 'PPP HH:mm:ss')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker setDate={field.onChange} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-black">
                {' '}
                End Date and Time of Activity
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, 'PPP HH:mm:ss')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker setDate={field.onChange} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Image URL<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  id="image"
                  placeholder="Enter the URL for the activity image"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <div className="">
                <FormLabel className="text-black">
                  Category of activity
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
              </div>
              {tags.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="tags"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-medium text-gray-600">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="signUpDeadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-black">
                {' '}
                Sign Up Deadline<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
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

        <FormField
          control={form.control}
          name="volunteerCountNeeded"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Volunteer Count Needed
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="volunteerCountNeeded"
                  placeholder="Enter the number of volunteers needed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="signUpLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Sign Up Limit{' '}
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="signUpLimit"
                  placeholder="Enter the limit for how many people can sign up"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Additional Details about the activity
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="additionalDetails"
                  placeholder="Any further details about the activity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Point of contact (Email) */}
        <FormField
          control={form.control}
          name="contactUs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Please provide your email address for volunteers to contact
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="email"
                  id="contactUs"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center pb-2">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
