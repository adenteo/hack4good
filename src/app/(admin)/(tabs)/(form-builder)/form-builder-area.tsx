import { cn } from '@/lib/utils';
import FormBuilder from '../../form-builder';
import { CustomForm, FormField } from '@/types/formTypes';

interface FormBuilderAreaProps {
  className?: string;
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  selectedForm: CustomForm | null;
}

const FormBuilderArea: React.FC<FormBuilderAreaProps> = ({
  className,
  formFields,
  setFormFields,
  selectedForm,
}) => {
  return (
    <div
      className={cn(
        className,
        'border flex flex-col justify-center items-center',
      )}
    >
      <FormBuilder
        setFormFields={setFormFields}
        selectedForm={selectedForm}
        formFields={formFields}
      />
    </div>
  );
};

export default FormBuilderArea;
