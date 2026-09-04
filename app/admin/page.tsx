import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listPlatforms } from "./actions";
import AdminLayout from "./components/AdminLayout";
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
      <AdminLayout>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold text-admin-text">Acesso negado</h1>
          <p className="max-w-sm text-admin-text-muted">
            Você está autenticado, mas não possui permissão de administrador.
          </p>
        </main>
      </AdminLayout>
    );
  }

  const platforms = await listPlatforms();

  return (
    <AdminLayout>
      <PlatformsSection initialPlatforms={platforms} />
    </AdminLayout>
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