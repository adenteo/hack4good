'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
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
import { User } from 'next-auth';
import { ExtendedVolunteerType } from '@/models/Volunteer';
import { updateVolunteer } from '@/lib/actions/update-volunteer-profile';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First Name must be at least 1 character.',
  }),
  lastName: z.string().min(1, {
    message: 'Last Name must be at least 1 character.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  phoneNumber: z.string().min(8, {
    message: 'Invalid phone number.',
  }),
  skills: z.string(),
});

export function ProfileForm({
  volunteer,
}: {
  volunteer: ExtendedVolunteerType;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      skills: '',
    },
  });

  useEffect(() => {
    if (volunteer) {
      form.setValue('firstName', volunteer.firstName);
      form.setValue('lastName', volunteer.lastName);
      form.setValue('phoneNumber', volunteer.contactNumber);
      form.setValue('email', volunteer.email!);
      form.setValue('skills', volunteer.skills ? volunteer.skills : '');
    }
  }, []);
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedVolunteer = {
      ...volunteer,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNumber: values.phoneNumber,
      skills: values.skills,
    };

    const res = await updateVolunteer(updatedVolunteer);
    toast({
      title: 'Successfully updated profile!',
    });
    router.push('/profile');
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="text-sm w-80 md:w-96 lg:w-96"
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="text-sm"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="text-sm"
                  type="email"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="text"
                  id="skills"
                  placeholder="Skills"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center pb-2">
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </Form>
  );
}
