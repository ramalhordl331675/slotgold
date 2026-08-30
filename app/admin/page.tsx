import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout, listPlatforms } from "./actions";
import PlatformsSection from "./PlatformsSection";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const role = (user!.app_metadata?.role as string | undefined) ?? "";

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Acesso negado
        </h1>
        <p className="max-w-sm text-zinc-600 dark:text-zinc-400">
          Você está autenticado, mas não possui permissão de administrador.
        </p>
      </main>
    );
  }

  const platforms = await listPlatforms();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-8">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Painel administrativo
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Bem-vindo, {user!.email}
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Sair
            </button>
          </form>
        </div>

        <PlatformsSection initialPlatforms={platforms} />
      </div>
    </main>
  );
}

interface Platform {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  affiliate_url: string;
  bonus_text: string | null;
  rating: number | null;
  is_featured: boolean;
  is_active: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}
