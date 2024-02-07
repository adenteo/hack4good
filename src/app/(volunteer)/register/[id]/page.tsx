import FormRenderer from '@/app/(admin)/form-renderer';
import getActivityById from '@/lib/actions/get-activity-by-id';
import { ExtendedActivityType } from '@/models/Activity';

type Params = {
  params: {
    id: string;
  };
};

const ActivityRegister = async ({ params: { id } }: Params) => {
  const activityString = await getActivityById(id);
  if (!activityString) {
    return <div>Activity not found</div>;
  }
  const activity: ExtendedActivityType = JSON.parse(activityString);
  const signUpForm: any = activity.customSignUpForm;
  if (!signUpForm) {
    return (
      <div>
        Sign up form is not found. If you are an admin, please link a form in
        the admin dashboard.
      </div>
    );
  }
  return (
    <div className="p-10 sm:p-20">
      <h1 className="text-2xl font-bold">Registration for {activity.title}</h1>
      {/* <SignUpForm /> */}
      <div className="mt-6">
        {' '}
        <FormRenderer formFields={signUpForm.fields} />
      </div>
    </div>
  );
};

export default ActivityRegister;
