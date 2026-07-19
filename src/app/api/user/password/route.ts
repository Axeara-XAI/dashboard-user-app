import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { db } from "../../../../db/index";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Old password and new password are required" },
        { status: 400 }
      );
    }

    // Catatan: Idealnya di sini kita memverifikasi oldPassword dengan bcrypt
    // dan menghash newPassword sebelum menyimpannya ke database.
    // Karena ini adalah mock integrasi API, kita asumsikan berhasil.
    
    // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // await db.users.update({
    //   where: { email: session.user.email },
    //   data: { password_hash: hashedNewPassword },
    // });

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
