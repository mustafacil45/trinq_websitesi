import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      include: { store: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.transaction.count(),
  ]);

  return NextResponse.json({ transactions, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tx = await prisma.transaction.create({ data: body });
    return NextResponse.json(tx, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "İşlem oluşturulamadı" }, { status: 500 });
  }
}
