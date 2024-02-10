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
import { signInSchema } from '@/lib/validators/auth-validator';

const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function loginWithGoogle() {
    setIsLoading(true);
    signIn('google');
  }

  function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    signIn('credentials', { ...values, redirect: false }).then((res) => {
      if (res?.ok) {
        toast({
          className: 'bg-green-500 border-none text-white',
          title: 'Successfully logged in!',
          description: 'You are now logged in.',
        });
        setIsLoading(false);
        router.replace('/');
        router.refresh();
      }

      if (res?.error) {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          title: 'Error logging in.',
          description: 'Please check your credentials and try again.',
        });
        form.reset();
      }
    });
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center p-6">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
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
                  Sign In with Email
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
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div> */}
            {/* <Button
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
            </Button> */}
          </div>
        </CardContent>
        <CardFooter className="text-xs">
          Don&apos;t have an account?
          <span className="ml-1 underline font-semibold">
            <Link className="ml-1 underline font-semibold" href="/sign-up">
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
      <div className="mt-8 text-base flex flex-col justify-center items-center p-4 border-2 border-dotted rounded-md">
        <p className="text-gray-500">
          As part of the demo, you can sign in to the admin account to access
          all admin features with the following credentials:
        </p>
        <p className="text-gray-500 font-bold">Email: admin@gmail.com</p>
        <p className="text-gray-500 font-bold">Password: 12345678</p>
      </div>
    </div>
  );
};

export default SignIn;
