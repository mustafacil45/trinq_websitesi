import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const stores = await prisma.store.findMany({
    include: { _count: { select: { campaigns: true, stamps: true, transactions: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(stores);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const store = await prisma.store.create({ data: body });
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Mağaza oluşturulamadı" }, { status: 500 });
  }
}
