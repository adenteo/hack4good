import { LandPlot } from 'lucide-react';
import FormBuilderArea from './form-builder-area';
import { SelectForm } from './select-form';
import FieldsScrollable from './fields-scrollable';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { CustomForm, FormField } from '@/types/formTypes';
import { getForms } from '@/lib/actions/get-forms';
import { Button } from '@/components/ui/button';

interface FormBuilderProps {}

const FormBuilder: React.FC<FormBuilderProps> = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const forms = await getForms();
      const formsJson = JSON.parse(forms);
      setForms(formsJson);
    };
    fetchForms();
  }, []);

  return (
    <div className="flex flex-col p-6 min-h-screen">
      <div className="flex flex-grow">
        <div className="flex flex-col">
          <h1 className="font-semibold text-2xl mb-4">Form Builder</h1>
          <SelectForm forms={forms} setFormFields={setFormFields} />
          <Button
            variant={'destructive'}
            className="mt-3"
            onClick={() => {
              setFormFields([]);
            }}
          >
            Reset all fields
          </Button>
          <Separator className="my-8" />
          <label className="mb-2 flex justify-center items-center">
            <p className="font-semibold mr-2">Fields</p>
            <LandPlot size={16} />
          </label>
          <p className="text-xs text-center text-gray-400 mb-1">
            Click on a field to add to form.
          </p>
          <div className="flex flex-col flex-grow">
            <FieldsScrollable setFormFields={setFormFields} />
          </div>
        </div>
        <FormBuilderArea
          formFields={formFields}
          setFormFields={setFormFields}
          className="flex-grow ml-6 rounded-md"
        />
      </div>
    </div>
  );
};

export default FormBuilder;
