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
  image: z.string(),
});

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
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
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

  const handleImageUpload = async (file: File) => {
    try {
      // Example: You can upload the image to a server and get the URL
      // const imageUrl = await uploadImageToServer(file);

      // For demonstration purposes, using a local URL
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

        {/* Submit button */}
        <div className="flex justify-center pb-2 pt-6">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
