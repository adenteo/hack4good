'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CircleUser, CircleUserRound } from 'lucide-react';
import { Badge } from './ui/badge';
interface UserAccountButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email' | 'isAdmin' | 'isOnboarded'>;
}

export default function UserAccountButton({ user }: UserAccountButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user.image ? (
          <Avatar>
            <AvatarImage src={user.image!} alt="@shadcn" />
          </Avatar>
        ) : (
          <CircleUser size={30} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
            {user.isOnboarded === true && (
              <span className="bg-green-500 text-white text-xs font-bold px-4 p-1 rounded-full w-fit">
                Verified Volunteer
              </span>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {user.isAdmin === true && (
          <DropdownMenuItem asChild>
            <Link className="text-red-500" href="/admin">
              Admin
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
