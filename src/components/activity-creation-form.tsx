'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import crypto from 'crypto';

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
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { TimePicker } from './ui/time-picker';
import { Switch } from '@/components/ui/switch';
import { getSignedURL } from '@/lib/actions/s3-actions';
import { addActivity } from '@/lib/actions/add-activities';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { volunteerTheme } from '@/models/types';
import { debounce } from 'lodash';
import { Textarea } from './ui/textarea';

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

export const activityFormSchema = z.object({
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
  customSignUpForm: z.string().optional(),
  startTime: z.date(),
  endTime: z.date(),
  featured: z.boolean(),
  volunteerCountNeeded: z.string().optional(),
  signUpLimit: z.string().optional(),
  signUpDeadline: z.date(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one category.',
  }),
  contactUs: z.string().email({
    message: 'Invalid email address for volunteers to contact.',
  }),
  image: z.string().min(1, {
    message: 'Please select an image.',
  }),
});

export function ActivityCreationForm() {
  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: '',
      address: '',
      description: '',
      additionalDetails: '',
      tags: [],
      featured: false,
      contactUs: '',
      image: '',
    },
  });

  const uniqueFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex');

  const [imageFile, setImageFile] = useState<File>();
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof activityFormSchema>) => {
    setFormLoading(true);
    if (imageFile) {
      let awsUrl = await handleImageUpload(imageFile);
      values.image = awsUrl;
    }
    const res = await addActivity(values);
    setFormLoading(false);
    if (res.error) {
      toast({
        title: 'Error occurred',
        description: res.error,
        variant: 'destructive',
      });
    }
    if (res.activity) {
      router.push('/activities/' + res.activity);
      return;
    }
  };

  const handleImageUpload = async (file: File) => {
    const fileName = uniqueFileName();
    const signedURLResult = await getSignedURL(fileName);
    const { url } = signedURLResult.success;

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file?.type,
      },
      body: imageFile,
    });
    return url.split('?')[0]; // Return the base URL without query parameters
  };

  const handleDeleteImage = () => {
    form.setValue('image', ''); // Reset form field
    setImageFile(undefined);
    setUploadedImage(undefined); // Clear selected image file
    setIsLabelVisible(true);
  };

  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    form.setValue('description', event.target.value);
  };

  const debouncedHandleChange = useCallback(debounce(handleChange, 500), []);

  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const makePostRequest = async () => {
      if (text.length < 20) return;
      try {
        setLoading(true);
        const response = await fetch('/api/classify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        });
        const data = await response.json();
        setLoading(false);
        setTags(
          data.tags.map(
            (tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1),
          ),
        );
        form.setValue(
          'tags',
          data.tags.map(
            (tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1),
          ),
        );
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    if (text) {
      makePostRequest();
    }
  }, [text]);

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
                <Textarea
                  id="description"
                  className="mt-6"
                  placeholder="Describe the activity details"
                  onChange={debouncedHandleChange}
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
              <div>
                <FormLabel className="text-black">
                  Category of activity
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
              </div>
              {loading && (
                <span className="loading loading-dots loading-md"></span>
              )}
              <div className="flex items-center max-w-screen flex-wrap">
                {Object.entries(volunteerTheme).map(([key, themeValue]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={key}
                          className="flex items-center justify-center space-y-0 space-x-1 mx-2 my-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(themeValue)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, themeValue])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== themeValue,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-medium text-gray-600">
                            {themeValue}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
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
                      !field.value && 'text-muted-foreground',
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
                      !field.value && 'text-muted-foreground',
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
                    setImageFile(file[0]);
                    const imageUrl = URL.createObjectURL(file[0]);
                    setUploadedImage(imageUrl);
                    if (imageUrl) {
                      form.setValue('image', imageUrl);
                    }
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
                        !field.value && 'text-muted-foreground',
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
          <Button type="submit" disabled={formLoading}>
            Submit
            {formLoading && (
              <span className="loading loading-spinner loading-xs ml-2"></span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
