"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../actions";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Plataformas", href: "/admin", icon: PlatformsIcon },
];

function PlatformsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function VisualIdentityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adminSidebarCollapsed");
      if (saved !== null) {
        setSidebarCollapsed(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adminSidebarCollapsed", JSON.stringify(sidebarCollapsed));
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/admin/actions/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      <aside
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out sidebar ${sidebarCollapsed ? "w-16" : "w-52"} lg:relative lg:translate-x-0`}
        aria-label="Sidebar navigation"
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-gray-700">
          {!sidebarCollapsed && (
            <Link href="/admin" className="flex items-center gap-1.5" aria-label="SlotGold Admin">
              <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <span className="font-semibold text-white">SlotGold Admin</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-gray-400"
            aria-label={sidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? <ChevronLeftIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-thin" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                className={`sidebar-link ${isActive ? "active" : ""} ${sidebarCollapsed ? "justify-center px-2" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-700">
          <form onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            await logout();
            // O logout já redireciona para /admin/login internamente
          }}>
            <button type="submit" title="Sair" className="sidebar-link hover:bg-gray-700 hover:text-red-500 justify-center px-1.5">
              <LogoutIcon className="w-4 h-4 flex-shrink-0" /> {!sidebarCollapsed && "Sair"}
            </button>
          </form>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-w-0 ${sidebarCollapsed ? "lg:ml-12" : "lg:ml-48"}`}>
        <header className="sticky top-0 z-30 header">
          <div className="flex h-12 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-gray-400"
                aria-label="Open sidebar"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-white">Painel Administrativo</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded bg-gray-800 border">
                <span className="text-xs text-gray-400">Admin</span>
              </div>
              <div className="avatar" aria-label="Admin user">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-2xl mx-auto p-6 lg:p-8 {-translate-x-60}">{children}</div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}