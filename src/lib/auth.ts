import { NextAuthOptions, getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { connectToDB } from './mongoose';
import Role from '@/models/Role';

//TODO edit login logic for google. Or consider removing.

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
          id: user.id,
          name: user.firstName,
          email: user.email,
          roleId: user.roleId,
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
        session.user.roleId = token.roleId;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Fetch the role from the database
        const role = await Role.findById(user.roleId);
        token.roleId = role?.roleName; // Add roleName to the JWT token
      }
      console.log(token);
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
