// Import necessary libraries
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

// Define the Zod schema
const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character.',
  }),
  description: z.string().min(30, {
    message: 'Description must be at least 30 characters.',
  }),
  image: z.string().refine((value) => isValidImageFile(value), {
    message: 'Invalid image file.',
  }),
});

const isValidImageFile = (value: string | undefined): boolean => {
  if (!value) return true; // No file selected is considered valid
  // Implement your custom file validation logic here
  // For example, check file extension or MIME type
  return true; // Replace with your validation logic
};

// Define the component
export function FeedbackForm() {
  // Set up React Hook Form with Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  // State to manage the selected image file
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [isLabelVisible, setIsLabelVisible] = useState(true);

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Handle form submission logic here
      console.log(values);
    } catch (error) {
      // Handle submission error, if any
      if (error instanceof ZodError) {
        console.error(error.errors);
      }
    }
  };

  const handleDeleteImage = () => {
    form.setValue('image', ''); // Reset form field
    setImageFile(undefined); // Clear selected image file
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
              <FormLabel className="text-black">Reflection Title</FormLabel>
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
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share with us your thoughts on how the activity process was like"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image upload field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Photo<span className="text-slate-400"> (optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="productPhoto"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(event) => {
                    const file = event.target.files;
                    field.onChange(file);
                    if (!file) {
                      return;
                    }
                    setImageFile(file[0]);
                    setIsLabelVisible(false); // Hide the label when image is chosen
                  }}
                />
              </FormControl>
              {isLabelVisible && (
                <label
                  className="w-full h-32 rounded-md border-4 border-dotted flex flex-col justify-center items-center cursor-pointer"
                  htmlFor="productPhoto"
                >
                  <PlusCircle className="text-slate-200 h-8 w-8" />
                  <div className="text-xs my-2 text-slate-500">
                    JPG, JPEG, PNG
                  </div>
                </label>
              )}
              {imageFile && (
                <div className="flex items-center space-x-2">
                  <div className="max-w-full mx-auto">
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="text-black hover:text-red-700 focus:outline-none"
                    >
                      <Trash2 className="h-6 w-6" />
                    </button>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="product image"
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
