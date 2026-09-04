import { createClient } from "@/lib/supabase/server";

interface TrustBarData {
  platformCount: number;
}

async function getTrustBarData(): Promise<TrustBarData> {
  const supabase = await createClient();
  const { data: platforms } = await supabase
    .from("platforms")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  return {
    platformCount: (platforms ?? []).length,
  };
}

interface TrustBarProps {
  platformCount: number;
}

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    label: "Plataformas Verificadas",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    label: "Comparação Fácil",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: "Navegação Rápida",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    label: "Experiência Segura",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "Conteúdo Organizado",
  },
];

export default async function TrustBar() {
  const { platformCount } = await getTrustBarData();

  return (
    <section className="trust-bar" aria-label="Indicadores de confiança">
      <div className="container-page">
        <div className="trust-bar-grid">
          {trustItems.map((item) => (
            <div key={item.label} className="trust-bar-item">
              <span className="trust-bar-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="trust-bar-label">{item.label}</span>
            </div>
          ))}
          <div className="trust-bar-item trust-bar-stat">
            <span className="trust-bar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </span>
            <span className="trust-bar-label">
              {platformCount}+ Plataformas Ativas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}