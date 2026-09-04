"use client";

interface HeroPremiumProps {
  className?: string;
}

export default function HeroPremium({ className = "" }: HeroPremiumProps) {
  return (
    <section
      className={`hero-premium ${className}`}
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient-orb orb-1" />
        <div className="hero-gradient-orb orb-2" />
        <div className="hero-gradient-orb orb-3" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container-page relative hero-content">
        <div className="hero-inner">
          <div className="hero-badge" aria-label="Destaque">
            <span className="badge-pulse" aria-hidden="true" />
            <span className="hero-badge-text">AS MELHORES PLATAFORMAS EM UM SÓ LUGAR</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            As Melhores Plataformas
            <br className="hidden sm:block" />
            <span className="text-gradient-gold">em um único lugar</span>
          </h1>

          <p className="hero-subtitle">
            Comparação independente, bônus exclusivos e transparência total para
            você comparar e escolher a opção ideal.
          </p>

          <div className="hero-cta-group">
            <a
              href="#plataformas"
              className="btn-gold btn-hero-primary"
              aria-label="Explorar plataformas de slots"
            >
              VER PLATAFORMAS
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#jogo-responsavel"
              className="btn-hero-secondary"
              aria-label="Conhecer princípios de jogo responsável"
            >
              Jogo responsável
            </a>
          </div>

          <div className="hero-stats" role="list" aria-label="Estatísticas do SlotGold">
            <div className="stat-item" role="listitem">
              <div className="stat-value">
                <span className="counter" data-target="48">4.8</span>
                <span className="stat-suffix">/5</span>
              </div>
              <div className="stat-label">Média de avaliação</div>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat-item" role="listitem">
              <div className="stat-value">
                <span className="counter" data-target="12">12</span>
                <span className="stat-suffix">+</span>
              </div>
              <div className="stat-label">Plataformas analisadas</div>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat-item" role="listitem">
              <div className="stat-value">
                <span className="counter" data-target="50">50</span>
                <span className="stat-suffix">k+</span>
              </div>
              <div className="stat-label">Usuários mensais</div>
            </div>
          </div>
        </div>

        <div className="hero-activity-notice" aria-label="Notificação de usuário ativo" style={{ position: 'relative', zIndex: 1000 }}>
          <div className="hero-activity-card">
            <span className="hero-activity-indicator" />
            <span className="hero-activity-name">Pedro</span>
            <span className="hero-activity-platform">R38.COM</span>
          </div>
        </div>
      </div>
    </section>
  );
}