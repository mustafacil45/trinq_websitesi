import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.stampCard.findMany({
    include: { store: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(customers);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const card = await prisma.stampCard.create({ data: body });
    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Oluşturulamadı" }, { status: 500 });
  }
}
