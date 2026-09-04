import TrustSeal from "./TrustSeal";

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Transparência",
    description: "Informações apresentadas de forma clara, sem promessas ou dados inventados.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Comparação",
    description: "Compare as opções em um só lugar, com critérios objetivos e visuais.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Atualização",
    description: "Conteúdo revisado continuamente para refletir as informações disponíveis.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Responsabilidade",
    description: "Incentivamos uma relação consciente e equilibrada com o entretenimento.",
  },
];

export default function WhyTrust() {
  return (
    <section
      id="por-que-confiar"
      className="why-trust"
      aria-labelledby="why-trust-title"
      data-depth="1"
    >
      <div className="container-page">
        <div className="why-trust-header">
          <span className="why-trust-badge" aria-hidden="true">
            TRANSPARÊNCIA
          </span>
          <h2 id="why-trust-title" className="why-trust-title">
            Por que <span className="text-gradient-gold">confiar</span> no SlotGold?
          </h2>
          <p className="why-trust-subtitle">
            Nosso compromisso é reunir informações de forma organizada, objetiva e responsável.
          </p>
        </div>

        <div className="why-trust-grid" role="list" aria-label="Motivos para confiar no SlotGold">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="why-trust-pillar" role="listitem">
              <span className="why-trust-icon" aria-hidden="true">
                {pillar.icon}
              </span>
              <h3 className="why-trust-pillar-title">{pillar.title}</h3>
              <p className="why-trust-pillar-description">{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="why-trust-seal">
          <TrustSeal size="large" />
          <p className="why-trust-seal-note">
            Identidade de branding e transparência do SlotGold. Não representa certificação
            de plataformas ou de órgãos externos.
          </p>
        </div>
      </div>
    </section>
  );
}
