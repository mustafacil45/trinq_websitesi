import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email ve şifre gereklidir." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Geçersiz email veya şifre." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Geçersiz email veya şifre." }, { status: 401 });
    }

    // Simple token-based session (cookie)
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = Buffer.from(JSON.stringify(sessionData)).toString("base64");

    const response = NextResponse.json({ success: true, user: sessionData });
    response.cookies.set("trinq-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
