'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, HeartHandshake } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Topbar = () => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="font-bold flex">
        <HeartHandshake />
        <p className="ml-2 text-lg">Big At Heart</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="font-bold mr-2">{user?.name}</div>
        <Avatar className="scale-90">
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-1 ml-1">
              <ChevronDown className="mx-2" size={15} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {user?.name && <p className="font-medium">{user.name}</p>}
                {user?.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Feed</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/r/create">Create Community</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
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
      </div>
    </div>
  );
};

export default Topbar;
