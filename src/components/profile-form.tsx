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
  interests: z.string(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      skills: '',
      interests: '',
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="text"
                  id="firstName"
                  placeholder="Amy"
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
                  className="text-sm"
                  type="text"
                  id="lastName"
                  placeholder="Tan"
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
                  className="text-sm"
                  type="email"
                  id="email"
                  placeholder="amytan@gmail.com"
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
                  placeholder="9126 3728"
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
                  placeholder="Photography, Coding, Graphic Design"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="text"
                  id="interests"
                  placeholder="Fashion, Animals"
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
