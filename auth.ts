import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

import { signInFormSchema } from "./lib/zod/schema";
import { getUserForSignin } from "./lib/actions/user";

/**
 * NextAuth config (Credentials + JWT sessions)
 */
export const { handlers, signIn, signOut, auth } = NextAuth({

  /**
   * Auth provider: email/password login
   */
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = signInFormSchema.parse(credentials);

        if (!email || !password) return null;

        return await getUserForSignin(email, password);
      },
    }),
  ],

  /**
   * Auth secret used to sign/verify JWT tokens
   */
  secret: process.env.NEXT_AUTH_SECRET,

  /**
   * Token enrichment (runs on sign-in + updates)
   */
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    
    /**
     * Expose token data on session
     */
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.createdAt = new Date(token.createdAt);
      }
      return session;
    },
  },

  /**
   * JWT-based session (24h expiry)
   */
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  /**
   * Custom auth pages
   */
  pages: {
    signIn: '/sign-in',
  },
});