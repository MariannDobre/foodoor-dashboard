import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      user_id: number | null;
    } & DefaultSession['user'];
  }
}
