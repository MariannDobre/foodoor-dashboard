import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { supabaseClient } from './supabaseClient';

async function getUser(email: string) {
  const { data, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('email', email);

  if (error) {
    console.error('Error fetching user:', error.message);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  // Handle multiple users case
  if (data.length > 1) {
    console.warn(`Multiple users found for email: ${email}`);
    // Return the first user or handle as needed
    return data[0];
  }

  return data.length === 1 ? data[0] : null;
}

async function createUser(newUser) {
  const { data, error } = await supabaseClient
    .from('users')
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error.message);
    throw new Error('The user could not be created...');
  }

  return data;
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user?.email);

        if (!existingUser) {
          console.log('Creating new user:', user?.email);
          await createUser({
            username: user?.name,
            email: user?.email,
            avatar_url: user?.image,
          });
        } else {
          console.log('User already exists:', user?.email);
        }

        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
    async session({ session, user }) {
      try {
        const supabaseUser = await getUser(session?.user?.email);
        if (supabaseUser) {
          session.user.user_id = supabaseUser.id;
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
