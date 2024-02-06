import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import UserAccountButton from './user-account-button';
import { HeartHandshake } from 'lucide-react';

export default async function NavBar() {
  const session = await getAuthSession();
  return (
    <div className="navbar bg-[#FC7869] text-white shadow-md px-1 py-0">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl text-white">
          <HeartHandshake />
          Big At Heart
        </Link>
        {/* <a className="btn btn-ghost text-xl">Hack4Good</a> */}
      </div>
      <div className="navbar-end pr-6">
        {session?.user ? (
          <UserAccountButton user={session.user!} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
