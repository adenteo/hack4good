import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    username?: string | null;
    roleId: string;
  }
}

declare module 'next-auth' {
  interface User {
    roleId: string;
  }
  interface Session {
    user: User & {
      id: UserId;
      roleId: string;
      username?: string | null;
    };
  }
}
