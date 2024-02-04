import { cn } from '@/lib/utils';
import FormBuilder from '../../form-builder';
import { FormField } from '@/types/formTypes';

interface FormBuilderAreaProps {
  className?: string;
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const FormBuilderArea: React.FC<FormBuilderAreaProps> = ({
  className,
  formFields,
  setFormFields,
}) => {
  return (
    <div
      className={cn(
        className,
        'border flex flex-col justify-center items-center',
      )}
    >
      <FormBuilder setFormFields={setFormFields} formFields={formFields} />
    </div>
  );
};

export default FormBuilderArea;
