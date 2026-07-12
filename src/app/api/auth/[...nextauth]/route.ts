import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

// Tambahkan opsi debug untuk NextAuth
const authOptionsWithDebug = {
  ...authOptions,
  debug: true,
};

const handler = NextAuth(authOptionsWithDebug);

export { handler as GET, handler as POST };
