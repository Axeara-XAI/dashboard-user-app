import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      // Jika environment = production, lemparkan ke portal auth pusat.
      // Jika development, gunakan halaman default login NextAuth (yang berisi tombol Mock).
      signIn: process.env.NODE_ENV === "production" 
        ? "https://auth.axara-xai.com/login"
        : "/api/auth/signin", 
    },
  }
);

export const config = {
  // Hanya memproteksi rute internal Dasbor (dan mengabaikan rute statis/API auth)
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
