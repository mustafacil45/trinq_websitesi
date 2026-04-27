import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Bağımlılık sırası: önce alt kayıtlar
  await prisma.transaction.deleteMany();
  await prisma.stampCard.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("trinq2025", 12);

  const admin = await prisma.user.create({
    data: {
      email: "admin@trinq.app",
      password: hashedPassword,
      name: "trinQ Admin",
      role: "admin",
    },
  });

  // Şemada ownerId benzersiz: tek kullanıcı = tek mağaza
  const store = await prisma.store.create({
    data: {
      name: "Brew & Bean Coffee",
      slug: "brew-bean-coffee",
      description: "Özel kahve çeşitleri ve ev yapımı tatlılar",
      address: "İstiklal Caddesi No: 42, Beyoğlu",
      city: "İstanbul",
      phone: "0212 555 01 01",
      email: "info@brewbean.com",
      category: "cafe",
      lat: 41.0336,
      lng: 28.977,
      isActive: true,
      workingHours: JSON.stringify({ open: "08:00", close: "22:00" }),
      ownerId: admin.id,
    },
  });

  await prisma.campaign.createMany({
    data: [
      {
        title: "Hoş Geldin İndirimi",
        description: "İlk alışverişte %20 indirim",
        type: "welcome",
        discount: 20,
        discountType: "percent",
        storeId: store.id,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-12-31"),
        usageCount: 42,
      },
      {
        title: "Öğrenci Kahve Kampanyası",
        description: "Öğrencilere tüm kahvelerde %15 indirim",
        type: "student",
        discount: 15,
        discountType: "percent",
        storeId: store.id,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-12-31"),
        usageCount: 88,
      },
    ],
  });

  await prisma.stampCard.createMany({
    data: [
      {
        customerName: "Ali Yılmaz",
        customerPhone: "0532 111 22 33",
        totalStamps: 7,
        requiredStamps: 10,
        rewardTitle: "Ücretsiz Kahve",
        storeId: store.id,
      },
      {
        customerName: "Zeynep Kaya",
        customerPhone: "0535 222 33 44",
        totalStamps: 10,
        requiredStamps: 10,
        isCompleted: true,
        rewardTitle: "Ücretsiz Kahve",
        storeId: store.id,
      },
    ],
  });

  for (let i = 0; i < 12; i++) {
    await prisma.transaction.create({
      data: {
        amount: 120 + i * 15,
        items: JSON.stringify([{ name: "Latte", qty: 1, price: 65 }]),
        storeId: store.id,
        createdAt: new Date(Date.now() - i * 86400000),
      },
    });
  }

  console.log("✅ Seed tamamlandı (yalnızca admin@trinq.app / trinq2025).");
  console.log(`  → Kullanıcı: ${await prisma.user.count()}`);
  console.log(`  → Mağaza: ${await prisma.store.count()}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
