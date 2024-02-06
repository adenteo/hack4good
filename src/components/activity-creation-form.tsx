'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
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
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { TimePicker } from './ui/time-picker';
import { Switch } from '@/components/ui/switch';

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

const forms = [
  {
    id: '1',
    label: 'form1',
  },
  {
    id: '2',
    label: 'form2',
  },
  {
    id: '3',
    label: 'form3',
  },
  {
    id: '4',
    label: 'form4',
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
  customSignUpForm: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  featured: z.boolean(),
  volunteerCountNeeded: z.string(),
  signUpLimit: z.string(),
  signUpDeadline: z.date(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one category.',
  }),
  contactUs: z.string().email({
    message: 'Invalid email address for volunteers to contact.',
  }),
  image: z.string().refine((value) => value.trim() !== '', {
    message: 'Please select an image.',
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
      tags: [''],
      featured: false,
      contactUs: '',
      customSignUpForm: '',
      image: '',
    },
  });

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
  const [isLabelVisible, setIsLabelVisible] = useState(true);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.endTime);
    console.log(values.image);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);

      form.setValue('image', imageUrl); // Set the image URL in the form
      setUploadedImage(imageUrl); // Save the image URL in state
      setImageFile(file);
      setIsLabelVisible(false); // Hide the label when image is chosen
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeleteImage = () => {
    form.setValue('image', ''); // Reset form field
    setImageFile(undefined); // Clear selected image file
    setUploadedImage(undefined); // Clear uploaded image data
    setIsLabelVisible(true);
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
          name="featured"
          render={({ field }) => (
            <FormItem className="">
              <div className="space-y-0.5">
                <FormLabel className="text-black">
                  Turn on Featured Post feature?
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
                    disabled={(date) => date < new Date()}
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
                Image<span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(event) => {
                    const file = event.target.files;
                    if (!file) {
                      return;
                    }
                    handleImageUpload(file[0]);
                  }}
                />
              </FormControl>
              {isLabelVisible && (
                <label
                  className="w-full h-32 rounded-md border-4 border-dotted flex flex-col justify-center items-center cursor-pointer"
                  htmlFor="image"
                >
                  <PlusCircle className="text-slate-200 h-8 w-8" />
                  <div className="text-xs my-2 text-slate-500">
                    JPG, JPEG, PNG
                  </div>
                </label>
              )}
              {uploadedImage && (
                <div className="flex items-center space-x-2">
                  <div className="max-w-full mx-auto">
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="text-black hover:text-red-700 focus:outline-none"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <img
                      src={uploadedImage}
                      alt="image"
                      className="w-full h-[40vh] object-contain"
                    />
                  </div>
                </div>
              )}
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
                    disabled={(date) => date < new Date()}
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

        <FormField
          control={form.control}
          name="customSignUpForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Participants Sign Up Form
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </FormLabel>
              <FormDescription className="w-auto text-xs">
                Note: If no forms are selected, you will have to create a custom
                form later, before this activity can be published
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-start pr-6 w-auto font-normal text-[0.8rem]">
                    <SelectValue placeholder="Select a Sign Up Form" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {forms.map((formItem) => (
                      <SelectItem key={formItem.id} value={formItem.id}>
                        {formItem.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

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
