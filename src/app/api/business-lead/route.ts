import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const bodySchema = z.object({
  businessName: z.string().trim().min(2).max(200),
  businessAddress: z.string().trim().min(3).max(500),
  fullName: z.string().trim().min(2).max(120),
  title: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(10).max(20),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Alanları kontrol edin.", issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await prisma.businessLead.create({
      data: parsed.data,
    });
  } catch {
    return NextResponse.json({ error: "Kayıt sırasında hata oluştu." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
