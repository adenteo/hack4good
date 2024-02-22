'use client';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Star, Trash2 } from 'lucide-react';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSignedURL } from '@/lib/actions/s3-actions';
import crypto from 'crypto';
import { useRouter } from 'next/navigation';

// Import your UI components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addFeedback } from '@/lib/actions/add-feedback';
import { toast } from './ui/use-toast';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';

// Define the Zod schema
export const feedbackFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character.',
  }),
  description: z.string().min(30, {
    message: 'Description must be at least 30 characters.',
  }),
  image: z.string().optional(),
  rating: z.number(),
  email: z.string().email(),
  name: z.string(),
});

// Define the component
export function FeedbackForm() {
  // const session = useSession();
  // const user = session.data?.user;

  // Set up React Hook Form with Zod validation
  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email);
    }

    if (user?.username) {
      form.setValue('name', user.username);
    }
  }, [user]);

  // State to manage the selected image file
  const [imageFile, setImageFile] = useState<File>();
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // Form submission handler

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    form.setValue('description', event.target.value);
  };

  const debouncedHandleChange = useCallback(debounce(handleChange, 500), []);

  useEffect(() => {
    const makePostRequest = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getSentiment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text }),
        });
        const data = await response.json();
        console.log(data);
        form.setValue('rating', data.rating);
        setLoading(false);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    if (text) {
      makePostRequest();
    }
  }, [text]);

  const onSubmit = async (values: z.infer<typeof feedbackFormSchema>) => {
    console.log(values);
    if (imageFile) {
      let awsUrl = await handleImageUpload(imageFile);
      values.image = awsUrl;
    }
    const res = await addFeedback(values);
    toast({
      title: 'Success!',
      description: 'Thank you for your feedback',
    });
    router.push('/profile');
  };

  const uniqueFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex');

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

  // Render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Reflection Title <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-sm w-80 md:w-96 lg:w-96"
                  type="text"
                  id="title"
                  placeholder="Reflection Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Describe your experience{' '}
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share with us your thoughts on how the activity process was like"
                  className="resize-none"
                  onChange={debouncedHandleChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {renderRating(form.getValues().rating)}
        {/* Image upload field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Image<span className="text-gray-500 ml-1">(optional)</span>
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

        {/* Submit button */}
        <div className="flex justify-center pb-2 pt-6">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

const renderRating = (rating: number) => {
  return (
    <div className="relative">
      <div className="flex">
        {Array.from({ length: 5 }).map((item, index) => (
          <div key={`heart-${index}`}>
            <Star size={18} fill="gray" color="gray" opacity={0.2} />
          </div>
        ))}
        <div className="flex">
          <div className="flex absolute top-0 left-0">
            {Array.from({ length: rating }).map((item, index) => (
              <div key={`pink-heart-${index}`}>
                <Star size={18} fill="#FC7869" color="#FC7869" />
              </div>
            ))}
          </div>
          {/* <p className="text-gray-500 text-xs lg:text-sm"> (46200 reviews)</p> */}
        </div>
      </div>
    </div>
  );
};
