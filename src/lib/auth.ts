import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../db/index";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Dashboard (No Local Login)",
      credentials: {},
      async authorize() {
        // user-dashboard tidak boleh menangani proses login mandiri.
        // Proses login DITANGANI sepenuhnya oleh auth-app.
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // (Tidak ada user mock lagi)

      // Di mode produksi, cookie JWT diterbitkan oleh Auth Repo.
      // Kita coba mengambil data terbaru dari database (jika email ada).
      if (token.email) {
        try {
          const dbUser = await db.users.findUnique({
            where: { email: token.email },
            select: { id: true, role: true, name: true }
          });
          if (dbUser) {
            token.id = dbUser.id.toString();
            token.role = dbUser.role;
            token.name = dbUser.name;
          }
        } catch (error) {
          console.warn("Could not reach DB during JWT callback. Using existing token data.", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: process.env.NODE_ENV === "production" 
      ? "https://auth.axara-xai.com/login"
      : "http://localhost:3001/login",
    error: process.env.NODE_ENV === "production"
      ? "https://auth.axara-xai.com/error"
      : "http://localhost:3001/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? `__Secure-next-auth.session-token` 
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Wildcard domain agar cookie berlaku di semua subdomain axara-xai.com
        domain: process.env.NODE_ENV === "production" ? ".axara-xai.com" : undefined,
      },
    },
  },
};
