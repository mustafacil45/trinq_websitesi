import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Dashboard istatistikleri
export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalStores,
      activeStores,
      totalCampaigns,
      activeCampaigns,
      totalCustomers,
      totalTransactions,
      todayTransactions,
      monthTransactions,
      recentTransactions,
      topCampaigns,
    ] = await Promise.all([
      prisma.store.count(),
      prisma.store.count({ where: { isActive: true } }),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { isActive: true } }),
      prisma.stampCard.count(),
      prisma.transaction.count(),
      prisma.transaction.aggregate({ where: { createdAt: { gte: todayStart } }, _sum: { amount: true }, _count: true }),
      prisma.transaction.aggregate({ where: { createdAt: { gte: monthStart } }, _sum: { amount: true }, _count: true }),
      prisma.transaction.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { store: { select: { name: true } } },
      }),
      prisma.campaign.findMany({
        take: 5,
        orderBy: { usageCount: "desc" },
        select: { title: true, usageCount: true, type: true },
      }),
    ]);

    // Son 7 gün ciro verisi
    const dailyRevenue: { date: string; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i + 1);
      const result = await prisma.transaction.aggregate({
        where: { createdAt: { gte: dayStart, lt: dayEnd } },
        _sum: { amount: true },
      });
      dailyRevenue.push({
        date: dayStart.toLocaleDateString("tr-TR", { weekday: "short", day: "numeric" }),
        revenue: result._sum.amount || 0,
      });
    }

    return NextResponse.json({
      totalStores,
      activeStores,
      totalCampaigns,
      activeCampaigns,
      totalCustomers,
      totalTransactions,
      todayCiro: todayTransactions._sum.amount || 0,
      todayCount: todayTransactions._count,
      monthCiro: monthTransactions._sum.amount || 0,
      monthCount: monthTransactions._count,
      recentTransactions,
      topCampaigns,
      dailyRevenue,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
