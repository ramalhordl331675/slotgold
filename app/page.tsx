import { createClient } from "@/lib/supabase/server";

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

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  const { data: platforms, error } = await supabase
    .from("platforms")
    .select("*")
    .eq("is_active", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          SlotGold
        </h1>
        <p className="mt-4 max-w-md text-center text-zinc-600 dark:text-zinc-400">
          Não foi possível carregar as plataformas no momento.
        </p>
      </main>
    );
  }

  const activePlatforms = (platforms as Platform[]) ?? [];

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            SlotGold
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Portal de divulgação e comparação de plataformas de slots.
          </p>
        </header>

        {activePlatforms.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              Nenhuma plataforma disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activePlatforms.map((platform) => (
              <article
                key={platform.id}
                className={`flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 ${
                  platform.is_featured
                    ? "border-amber-400 ring-2 ring-amber-400/40 dark:border-amber-500"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {platform.is_featured && (
                  <span className="mb-3 w-fit rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                    Destaque
                  </span>
                )}

                <div className="flex items-center gap-3">
                  {platform.logo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={platform.logo_url}
                      alt={`Logo de ${platform.name}`}
                      className="h-12 w-12 rounded-lg object-contain"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {platform.name}
                  </h2>
                </div>

                {platform.description && (
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {platform.description}
                  </p>
                )}

                {platform.bonus_text && (
                  <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    🎁 {platform.bonus_text}
                  </p>
                )}

                <div className="mt-4 flex flex-1 items-end justify-between gap-3">
                  {platform.rating !== null && (
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Avaliação:{" "}
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {platform.rating.toFixed(1)}
                      </span>
                      /5
                    </span>
                  )}
                </div>

                <a
                  href={platform.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  Acessar
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
