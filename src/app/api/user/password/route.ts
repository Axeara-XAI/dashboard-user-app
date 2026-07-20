import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { db } from "../../../../db/index";
import bcrypt from "bcryptjs";

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

    const dbUser = await db.users.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser || !dbUser.password_hash) {
      return NextResponse.json({ error: "User not found or password not set" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(oldPassword, dbUser.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid old password" }, { status: 401 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.users.update({
      where: { email: session.user.email },
      data: { password_hash: hashedNewPassword },
    });

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
