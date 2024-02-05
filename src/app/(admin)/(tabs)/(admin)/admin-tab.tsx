'use client';

import { ActivityCreationForm } from '@/components/activity-creation-form';

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  return (
    <div className="p-6">
      <ActivityCreationForm />
    </div>
  );
};

export default Admin;
