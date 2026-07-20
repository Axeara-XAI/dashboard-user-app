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
      // Jika development, biarkan NextAuth menggunakan default halamannya.
      signIn: process.env.NODE_ENV === "production" 
        ? "https://auth.axara-xai.com/login"
        : "http://localhost:3001/login", 
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

export const config = {
  // Hanya memproteksi rute internal Dasbor (dan mengabaikan rute statis/API auth)
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
