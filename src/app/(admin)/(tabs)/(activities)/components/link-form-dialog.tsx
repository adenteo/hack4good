import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { getForms } from '@/lib/actions/get-forms';
import { CustomForm } from '@/types/formTypes';
import { useEffect, useState } from 'react';
import { SelectForm } from './select-forms';
import linkFormToActivity from '@/lib/actions/link-form-to-activity';
import { Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { ExtendedActivityType } from '@/models/Activity';
import getActivityById from '@/lib/actions/get-activity-by-id';

interface LinkFormDialogProps {
  activityId: string;
  signUpForm: string;
}

const LinkFormDialog: React.FC<LinkFormDialogProps> = ({
  activityId,
  signUpForm,
}: LinkFormDialogProps) => {
  const [forms, setForms] = useState<CustomForm[]>([]);
  const [activity, setActivity] = useState<ExtendedActivityType>();
  const [formId, setFormId] = useState('');
  const [isLinked, setIsLinked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const formsString = await getForms();
      const forms = JSON.parse(formsString);
      setForms(forms);
      const activityString = await getActivityById(activityId);
      if (!activityString) return;
      const activity = JSON.parse(activityString);
      setActivity(activity);
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-left p-6">
      <h1 className="text-xl font-semibold mb-2">Link Form</h1>
      <p className="text-lg mb-6">
        Select a form to link to this activity. This form will be used by
        volunteers during the registration process.
      </p>
      {isLinked && (
        <div className="flex justify-center items-center mb-3">
          <div>
            <Info size={15} className="text-red-500" />
          </div>
          <p className="ml-2 text-red-500 font-semibold">
            This activity is already linked to a form. Linking a new form will
            replace the existing one.
          </p>
        </div>
      )}
      {activity ? (
        <SelectForm
          forms={forms}
          signUpForm={activity.customSignUpForm}
          setFormId={setFormId}
          setIsLinked={setIsLinked}
        />
      ) : (
        <span className="loading loading-dots loading-lg mx-auto"></span>
      )}
      <DialogClose asChild>
        <Button
          className="text-[0.9rem] mt-8"
          onClick={async () => {
            if (!activityId || !formId) return;
            const response = await linkFormToActivity(activityId, formId);
          }}
        >
          Link Form
        </Button>
      </DialogClose>
    </div>
  );
};

export default LinkFormDialog;
