import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    include: { store: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const campaign = await prisma.campaign.create({ data: body });
    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Kampanya oluşturulamadı" }, { status: 500 });
  }
}
