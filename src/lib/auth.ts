import { NextAuthOptions, getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { connectToDB } from './mongoose';
import Role from '@/models/Role';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null;
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          return null;
        }
        return {
          id: user._id.toString(),
          name: user.firstName,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const currentUser = await User.findOne({ email: user.email });
        token.isAdmin = currentUser.isAdmin;
        token.email = currentUser.email;
        token.username = currentUser.firstName + ' ' + currentUser.lastName;
        token.id = currentUser._id.toString();
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
