import FormBuilderArea from './form-builder-area';
import { SelectForm } from './select-form';

interface FormBuilderProps {}

const FormBuilder: React.FC<FormBuilderProps> = () => {
  return (
    <div className="p-6">
      <h1 className="font-semibold text-2xl">Form Builder</h1>
      <div className="mt-4">
        <SelectForm />
        <FormBuilderArea />
      </div>
    </div>
  );
};

export default FormBuilder;
