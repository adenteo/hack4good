'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormBuilder from './form-builder';
import FormRenderer from './form-renderer';

type Inputs = {
  example: string;
  exampleRequired: string;
};

const fields = [
  {
    name: 'First Name',
    type: 'text',
    defaultValue: 'John',
  },
  {
    name: 'Date Picker',
    type: 'datetime-local',
  },
  {
    name: 'Gay',
    type: 'radio',
    options: 'Yes;No',
  },
];

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    // <form
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="flex flex-col p-6 space-y-4"
    // >
    //   {fields.map((field) => {
    //     if (field.type === 'radio') {
    //       return (
    //         <div className="flex flex-col space-y-2">
    //           <label htmlFor={field.name}>{field.name}</label>
    //           {field.options!.split(';').map((option) => (
    //             <div className="flex items-center space-x-2">
    //               <input type={field.type} id={field.name} />
    //               <label htmlFor={field.name}>{option}</label>
    //             </div>
    //           ))}
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div>
    //           <p>{field.name}</p>
    //           <Input type={field.type} />
    //         </div>
    //       );
    //     }
    //   })}
    //   <Button type="submit" />
    // </form>
    <div className="p-6">
      {/* <FormBuilder /> */}
      <FormRenderer />
    </div>
  );
}
