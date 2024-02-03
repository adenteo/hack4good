'use client';

import * as React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { signUpSchema } from '@/lib/validators/auth-validator';
import onSignUp from '@/lib/actions/sign-up';

const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  console.log('hi');
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function loginWithGoogle() {
    setIsLoading(true);
    signIn('google');
  }

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    const response = await onSignUp(values);
    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Error encountered while signing up.',
        description: response.error,
      });
      setIsLoading(false);
      return;
    }
    toast({
      className: 'bg-green-500 border-none text-white',
      title: 'Successfully signed up!',
      description: 'You are now logged in.',
    });
    signIn('credentials', { ...values });
  }

  return (
    <div className="flex h-screen justify-center items-center my-6 p-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Start volunteering in a few simple clicks!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
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
                        <Input placeholder="Last Name" {...field} />
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
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  disabled={isLoading}
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign Up with Email
                </Button>
              </form>
            </Form>
            {/* <form onSubmit={onSubmit}>
					  <div className="grid gap-2">
						<div className="grid gap-1">
						  <Label className="sr-only" htmlFor="email">
							Email
						  </Label>
						  <Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						  />
						</div>
						<Button disabled={isLoading} type="submit">
						  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						  Sign In with Email
						</Button>
					  </div>
					</form> */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={loginWithGoogle}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-2 h-4 w-4" />
              )}{' '}
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs">
          Already have an account?
          <span className="ml-1 underline font-semibold">
            <Link className="ml-1 underline font-semibold" href="/sign-in">
              Sign in
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
