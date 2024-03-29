'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

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
import { CitizenshipType, Gender, volunteerTheme } from '@/models/types';
import { addVolunteer } from '@/lib/actions/add-volunteer';
import { Session, User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { useSession } from 'next-auth/react';
import { Textarea } from './ui/textarea';
import { debounce } from 'lodash';
import { Separator } from './ui/separator';

const citizenshipDisplayMap: Record<CitizenshipType, string> = {
  [CitizenshipType.Singaporean]: 'Singapore Citizen',
  [CitizenshipType.SingaporePermanentResident]: 'Singapore Permanent Resident',
  [CitizenshipType.LongTermVisitPass]: 'Long Term Visit Pass',
  [CitizenshipType.EmploymentPass]: 'Employment Pass / S Pass',
};

const availabilities = [
  {
    id: 'weekdays',
    label: 'Weekdays',
  },
  {
    id: 'weekends',
    label: 'Weekends',
  },
  {
    id: 'withCar',
    label: 'With Car',
  },
  {
    id: 'withFamily',
    label: 'With Family',
  },
  {
    id: 'remotely',
    label: 'Remotely',
  },
  {
    id: 'onGround',
    label: 'On Ground',
  },
] as const;

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

export const onboardingFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.',
  }),
  gender: z.nativeEnum(Gender),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  phoneNumber: z.string().min(8, {
    message: 'Invalid phone number.',
  }),
  dateOfBirth: z.date(),
  residentialStatus: z.nativeEnum(CitizenshipType),
  availabilities: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  skills: z.string(),
  experience: z.string(),
  contactPermission: z.boolean().default(false).optional(),
  addToWhatsAppGroup: z.boolean().default(false).optional(),
});

export function SignUpForm({ session }: { session: Session }) {
  const { update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      availabilities: [],
      tags: [],
      skills: '',
      experience: '',
    },
  });

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    const dob = new Date(dateString as string);
    form.setValue('dateOfBirth', dob, { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<typeof onboardingFormSchema>) => {
    setIsLoading(true);
    const volunteer = await addVolunteer(session.user.id, values);
    if (volunteer) {
      await update();
      router.push('/');
      router.refresh();
      toast({
        title: 'Success',
        description: 'You are now a verified volunteer!',
        variant: 'default',
        className: 'bg-green-500 text-white border-none',
      });
    } else {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    form.setValue('experience', event.target.value);
  };

  const debouncedHandleChange = useCallback(debounce(handleChange, 500), []);

  const [loading, setLoading] = useState(false);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Last Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Gender<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="r3" />
                    <Label htmlFor="r3">Other</Label>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date of Birth<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <DatePicker onChange={onChange} />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Contact Number<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  type="text"
                  id="phoneNumber"
                  placeholder="Contact Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  type="text"
                  id="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="residentialStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Residential Status in Singapore
                <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-start pr-6 w-auto font-medium text-sm">
                    <SelectValue placeholder="Select Residential Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(citizenshipDisplayMap).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availabilities"
          render={() => (
            <FormItem>
              <div className="">
                <FormLabel className="">
                  Availability<span className="text-red-500">*</span>
                </FormLabel>
              </div>
              {availabilities.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="availabilities"
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
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-medium text-black">
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
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Skills you possess that can benefit the community / less
                privileged
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  type="text"
                  id="skills"
                  placeholder="Photography, Coding, Graphic Design"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Describe your previous relevant experience in those skills
              </FormLabel>
              <FormControl>
                <Textarea
                  id="experience"
                  className="mt-6"
                  placeholder="Describe experience"
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
                <FormLabel>
                  Area(s) of volunteering you are interested in
                  <span className="text-red-500">*</span>
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
        <Separator className="my-2" />
        {/* <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <div className="">
                <FormLabel className="">
                  Area(s) of volunteering you are interested in{' '}
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
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-medium text-black">
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
        /> */}

        <FormField
          control={form.control}
          name="contactPermission"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="ml-2">
                I give you permission to contact me via phone/WhatsApp/email.
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addToWhatsAppGroup"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="ml-2">
                Add me to the Big At Heart volunteers WhatsApp group
              </FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-center pt-10">
          <Button type="submit">
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
