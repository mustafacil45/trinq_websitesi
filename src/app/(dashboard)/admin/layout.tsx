"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Store,
  Megaphone,
  Users,
  Receipt,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/stores", icon: Store, label: "Mağazalar" },
  { href: "/admin/campaigns", icon: Megaphone, label: "Kampanyalar" },
  { href: "/admin/customers", icon: Users, label: "Müşteriler" },
  { href: "/admin/transactions", icon: Receipt, label: "İşlemler" },
  { href: "/admin/settings", icon: Settings, label: "Ayarlar" },
] as const;

interface User {
  name: string;
  email: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) {
          router.replace("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => router.replace("/admin/login"));
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-[family-name:var(--font-inter),ui-sans-serif,system-ui,sans-serif] text-black antialiased">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          aria-label="Menüyü kapat"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-[#09090B] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link href="/admin" className="flex min-h-0 min-w-0 flex-1 items-center">
            <img
              src="/trinq-logo.png"
              alt="trinQ"
              className="h-[3.125rem] w-auto max-w-[calc(100%-2.5rem)] shrink-0 object-contain object-left brightness-0 invert"
            />
          </Link>
          <button
            type="button"
            className="shrink-0 text-white/50 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} strokeWidth={1.5} className="shrink-0 opacity-90" />
                <span className="flex-1 truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          {user && (
            <div className="mb-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
              <p className="truncate text-xs font-semibold text-white">{user.name}</p>
              <p className="truncate text-[10px] leading-tight text-white/45">{user.email}</p>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Çıkış
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:h-16 lg:px-6">
          <button
            type="button"
            className="text-black/70 hover:text-black lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <h1 className="text-base font-bold text-black lg:text-lg">
            {NAV_ITEMS.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))
              ?.label || "Dashboard"}
          </h1>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-medium text-slate-500 transition hover:text-black"
          >
            Site →
          </Link>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#FAFAFA] p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
