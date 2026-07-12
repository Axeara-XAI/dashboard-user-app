import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../db/index";

export const authOptions: NextAuthOptions = {
  providers: process.env.NODE_ENV === "development" 
    ? [
        CredentialsProvider({
          name: "Developer Mock",
          credentials: {
            username: { label: "Ketik apa saja untuk login", type: "text", placeholder: "developer" }
          },
          async authorize() {
            // Memberikan akses otomatis tanpa verifikasi apapun di mode lokal
            return { 
              id: "dev-1", 
              name: "Dr. Developer (Mock)", 
              email: "dev@axara.local", 
              role: "admin" 
            };
          }
        })
      ]
    : [],
  callbacks: {
    async jwt({ token, user }) {
      // Jika dari authorize (mode mock lokal), copy role ke token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "admin";
        token.name = user.name;
        return token;
      }

      // Di mode produksi, cookie JWT diterbitkan oleh Auth Repo.
      // Kita coba mengambil data terbaru dari database (jika email ada).
      if (token.email) {
        const dbUser = await db.users.findUnique({
          where: { email: token.email },
          select: { id: true, role: true, name: true }
        });
        if (dbUser) {
          token.id = dbUser.id.toString();
          token.role = dbUser.role;
          token.name = dbUser.name;
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
  secret: process.env.NEXTAUTH_SECRET,
  /*
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
  */
};
