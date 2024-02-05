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

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First Name must be at least 1 character.',
  }),
  lastName: z.string().min(1, {
    message: 'Last Name must be at least 1 character.',
  }),
  gender: z.string(),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  phoneNumber: z.string().min(8, {
    message: 'Invalid phone number.',
  }),
  dateOfBirth: z.date(),
  residentialStatus: z.string(),
  availabilities: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),

  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  volunteerAreas: z.object({
    donation: z.boolean(),
  }),
  skills: z.string(),
  experience: z.string(),
  contactPermission: z.string(),
  addToWhatsAppGroup: z.string(),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
      residentialStatus: '',
      availabilities: [''],
      tags: [''],

      volunteerAreas: {
        donation: false,
      },
      skills: '',
      experience: '',
      contactPermission: '',
      addToWhatsAppGroup: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup {...field}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Others" id="r3" />
                    <Label htmlFor="r3">Others</Label>
                  </div>
                </RadioGroup>
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
              <FormLabel>Residential Status in Singapore</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-auto font-medium text-sm">
                    <SelectValue placeholder="Select Residential Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="citizen">Singapore Citizen</SelectItem>
                      <SelectItem value="pr">Singapore PR</SelectItem>
                      <SelectItem value="ep-pep-dp">
                        EP / PEP / DP with LOC / WP / S Pass etc.
                      </SelectItem>
                      <SelectItem value="dp">DP</SelectItem>
                      <SelectItem value="ltvp">LTVP</SelectItem>
                      <SelectItem value="student-pass">Student Pass</SelectItem>
                      <SelectItem value="visitor-visa">Visitor Visa</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

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
                <FormLabel className="">Availability</FormLabel>
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
                                      (value) => value !== item.id
                                    )
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
                                      (value) => value !== item.id
                                    )
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
                Skills you posses that can benefit the community / less
                privileged
              </FormLabel>
              {/* <FormDescription className="w-auto text-xs">
                Please list skills you posses that can benefit the community or
                less privileged groups in Singapore
              </FormDescription> */}
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
                <Input
                  className="text-xs"
                  type="text"
                  id="experience"
                  placeholder="Previous experience..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Permission (Radio) */}
        <FormField
          control={form.control}
          name="contactPermission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                I give you permission to contact me via phone/WhatsApp/email.
              </FormLabel>
              <FormControl>
                <RadioGroup {...field}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="r1" />
                    <Label htmlFor="r1">Yes</Label>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add to WhatsApp Group (Check Box) */}
        <FormField
          control={form.control}
          name="addToWhatsAppGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Add me to the Big At Heart volunteers WhatsApp group
              </FormLabel>
              <FormControl>
                <RadioGroup {...field}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="r1" />
                    <Label htmlFor="r1">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="r2" />
                    <Label htmlFor="r2">No</Label>
                  </div>
                </RadioGroup>
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
