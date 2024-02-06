'use client';
import { SignUpForm } from '@/components/signup-form';
import { useSearchParams } from 'next/navigation';

interface ActivitySignUpProps {}

const ActivitySignUp: React.FC<ActivitySignUpProps> = () => {
  const params = useSearchParams();
  const id = params.get('id');
  return (
    <div className="p-10 sm:p-20">
      <h1 className="text-2xl font-bold">Registration</h1>
      {/* <SignUpForm /> */}
    </div>
  );
};

export default ActivitySignUp;
