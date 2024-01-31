import { Providers } from '@/app/providers';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
    // Providers.Credentials({
    // 	// The name to display on the sign in form (e.g. 'Sign in with...')
    // 	name: 'Credentials',
    // 	// The credentials is used to generate a suitable form on the sign in page.
    // 	// You can specify whatever fields you are expecting to be submitted.
    // 	// e.g. domain, username, password, 2FA token, etc.
    // 	credentials: {
    // 	  username: { label: "Username", type: "text", placeholder: "jsmith" },
    // 	  password: {  label: "Password", type: "password" }
    // 	},
    // 	async authorize(credentials, req) {
    // 	  // You need to provide your own logic here that takes the credentials
    // 	  // submitted and returns either a object representing a user or value
    // 	  // that is false/null if the credentials are invalid.
    // 	  // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    // 	  // You can also use the `req` object to obtain additional parameters
    // 	  // (i.e., the request IP address)
    // 	  const res = await fetch("/your/endpoint", {
    // 		method: 'POST',
    // 		body: JSON.stringify(credentials),
    // 		headers: { "Content-Type": "application/json" }
    // 	  })
    // 	  const user = await res.json()

    // 	  // If no error and we have user data, return it
    // 	  if (res.ok && user) {
    // 		return user
    // 	  }
    // 	  // Return null if user data could not be retrieved
    // 	  return null
    // 	}
    //   })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
    // async jwt({ token, user }) {
    //   const dbUser = await db.user.findFirst({
    //     where: {
    //       email: token.email,
    //     },
    //   })

    //   if (!dbUser) {
    //     token.id = user!.id
    //     return token
    //   }

    //   if (!dbUser.username) {
    //     await db.user.update({
    //       where: {
    //         id: dbUser.id,
    //       },
    //       data: {
    //         username: nanoid(10),
    //       },
    //     })
    //   }

    //   return {
    //     id: dbUser.id,
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image,
    //     username: dbUser.username,
    //   }
    // },
    redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
