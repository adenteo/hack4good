import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    username?: string | null;
    isAdmin: boolean;
    isOnboarded: boolean;
  }
}

declare module 'next-auth' {
  interface User {
    isAdmin: boolean;
    isOnboarded: boolean;
  }
  interface Session {
    user: User & {
      id: UserId;
      isAdmin: boolean;
      isOnboarded: boolean;
      username?: string | null;
    };
  }
}
