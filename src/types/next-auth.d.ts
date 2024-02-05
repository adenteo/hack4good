import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    username?: string | null;
    isAdmin: boolean;
  }
}

declare module 'next-auth' {
  interface User {
    isAdmin: boolean;
  }
  interface Session {
    user: User & {
      id: UserId;
      isAdmin: boolean;
      username?: string | null;
    };
  }
}
