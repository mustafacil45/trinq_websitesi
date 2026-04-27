import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = await prisma.store.findUnique({
    where: { id },
    include: { campaigns: true, stamps: true, _count: { select: { transactions: true } } },
  });
  if (!store) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json(store);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const store = await prisma.store.update({ where: { id }, data: body });
    return NextResponse.json(store);
  } catch {
    return NextResponse.json({ error: "Güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.store.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silinemedi" }, { status: 500 });
  }
}
