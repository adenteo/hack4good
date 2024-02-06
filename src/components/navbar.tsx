import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import UserAccountButton from './user-account-button';
import { HeartHandshake } from 'lucide-react';

export default async function NavBar() {
  const session = await getAuthSession();
  return (
    <div className="navbar bg-red-100 text-white shadow-md px-1 py-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-red-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl text-red-600">
          <HeartHandshake />
          Big At Heart
        </Link>
        {/* <a className="btn btn-ghost text-xl">Hack4Good</a> */}
      </div>
      <div className="navbar-center hidden bg-red-100 lg:flex ">
        <ul className="menu menu-horizontal px-1 text-black">
          <li>
            <a className="text-black">Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
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
