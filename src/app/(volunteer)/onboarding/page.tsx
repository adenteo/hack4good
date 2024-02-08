import { SignUpForm } from '@/components/signup-form';
import { getAuthSession } from '@/lib/auth';

export default async function SignUpFormPage() {
  const session = await getAuthSession();
  if (!session) {
    return <div>Error getting auth session</div>;
  }
  return (
    <div className="min-h-screen p-10 sm:p-20">
      <h1 className="text-2xl font-bold">Onboarding Form</h1>
      <p className="text-gray-800 my-3 text-xs sm:text-base">
        Welcome! Thank you for your interest in joining our community. Your
        support is vital to our mission. Please fill out this short form to help
        us match your skills and interests with the right opportunities. Your
        information will remain confidential. We&apos;re excited to have you on
        board and look forward to making a difference together!
      </p>
      <SignUpForm session={session} />
    </div>
  );
}
