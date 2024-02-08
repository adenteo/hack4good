import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import UserAccountButton from './user-account-button';
import { HeartHandshake,Home, LibraryBig } from 'lucide-react';

export default async function NavBar() {
  const session = await getAuthSession();
  return (
  <div className="navbar bg-[#FC7869] text-white shadow-md px-0 py-0 lg:px-1">
    <div className="navbar-start">
      <div className="dropdown bg-[#FC7869]">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <div tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[1] px-4 pb-2 shadow bg-[#FC7869] w-[100vw] text-lg">
          <Link href="/" className="flex">
            <p className="mr-1 mt-1"><Home size={19}/></p>
            <p>Home </p>
           
            </Link>
          <Link href="/blogs" className="flex">
            <p className="mr-1 mt-1"><LibraryBig size={19}/></p>
            <p>Blogs </p>
            </Link>
          {/* <li><a>Item 3</a></li> */}
        </div>
      </div>
      <Link href="/" className="btn btn-ghost text-xl text-white">
            <HeartHandshake />
            Big At Heart
          </Link>
    </div>
    <div className="navbar-end pr-6">

        <div className="hidden lg:flex mr-6">
          <Link href="/blogs" className="menu menu-horizontal px-1">
            <p className="mr-1 mt-1"><LibraryBig size={20}/></p>
            <p className="text-lg">Blogs </p>
          </Link>
        </div>
      
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
