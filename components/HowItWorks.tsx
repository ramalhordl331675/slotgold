import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Pesquise",
    description: "Conheça as plataformas disponíveis e suas características.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Compare",
    description: "Veja as informações de cada opção em um só lugar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Escolha",
    description: "Acesse a plataforma que mais combina com você com segurança.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="container-page">
        <div className="how-it-works-header">
          <span className="how-it-works-badge" aria-hidden="true">COMO FUNCIONA</span>
          <h2 id="how-it-works-title" className="how-it-works-title">
            Entenda o processo em 3 passos
          </h2>
          <p className="how-it-works-subtitle">
            O SlotGold simplifica sua experiência para encontrar a melhor plataforma de slots.
          </p>
        </div>

        <div className="how-it-works-steps" role="list" aria-label="Passos do SlotGold">
          {steps.map((step, index) => (
            <div key={step.number} className="how-it-works-step" role="listitem">
              <div className="how-it-works-step-connector" aria-hidden="true" />
              <div className="how-it-works-step-card card-premium">
                <span className="how-it-works-step-number" aria-hidden="true">
                  {step.number}
                </span>
                <span className="how-it-works-step-icon" aria-hidden="true">
                  {step.icon}
                </span>
                <h3 className="how-it-works-step-title">{step.title}</h3>
                <p className="how-it-works-step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="how-it-works-cta">
          <Link href="#plataformas" className="btn-gold">
            Começar a explorar
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <p className="how-it-works-responsibility">
          Jogue com responsabilidade. O jogo deve ser uma forma de entretenimento.{" "}
          <a href="#jogo-responsavel" className="how-it-works-link">
            Saiba mais
          </a>
        </p>
      </div>
    </section>
  );
}