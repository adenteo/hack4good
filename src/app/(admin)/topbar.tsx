import UserAccountButton from '@/components/user-account-button';
import { getAuthSession } from '@/lib/auth';
import { HeartHandshake } from 'lucide-react';

const Topbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="font-bold flex">
        <HeartHandshake />
        <p className="ml-2 text-lg">Big At Heart</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="font-bold mr-2">{session?.user.name}</div>
        <UserAccountButton user={session?.user!} />
      </div>
    </div>
  );
};

export default Topbar;
