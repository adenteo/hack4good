import { ActivityCreationForm } from '@/components/activity-creation-form';

export default function ActivityCreationPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="font-bold text-2xl mb-6">Create New Activity</h1>
      <ActivityCreationForm />
    </div>
  );
}
