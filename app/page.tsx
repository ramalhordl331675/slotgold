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
      <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold tracking-tight text-white">SlotGold</h1>
          <p className="mt-4 text-text-secondary">
            Não foi possível carregar as plataformas no momento.
          </p>
        </div>
      </main>
    );
  }

  const activePlatforms = (platforms as Platform[]) ?? [];

  return (
    <>
      <header className="border-b border-border-subtle bg-bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-2" aria-label="SlotGold - Início">
              <span className="text-2xl font-bold text-white">SlotGold</span>
              <span className="hidden sm:inline-flex h-5 w-px bg-gradient-gold" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium text-gold-primary tracking-wider">
                Portal de Comparação
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
              <a href="#plataformas" className="text-sm font-medium text-text-secondary hover:text-gold-primary transition-colors">
                Plataformas
              </a>
              <a href="#sobre" className="text-sm font-medium text-text-secondary hover:text-gold-primary transition-colors">
                Como Avaliamos
              </a>
              <a href="#contato" className="text-sm font-medium text-text-secondary hover:text-gold-primary transition-colors">
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-primary/5 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gold-primary/5 rounded-full blur-3xl" aria-hidden="true" />

          <div className="container-page relative">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-1.5 text-sm font-medium text-gold-light mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-primary" />
                </span>
                Comparação imparcial de plataformas
              </span>
              <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance mb-6">
                Encontre a melhor <span className="text-gradient-gold">plataforma de slots</span> para você
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                Analisamos e comparamos as principais plataformas de slots online.
                Bônus exclusivos, avaliações reais e transparência total para sua escolha.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <a
                  href="#plataformas"
                  className="btn-gold w-full sm:w-auto text-base"
                >
                  Ver plataformas
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#sobre"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border-subtle px-6 py-3 text-base font-medium text-text-secondary transition-colors hover:border-gold-primary/50 hover:text-gold-primary hover:bg-bg-card"
                >
                  Como avaliamos
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 star-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  4.8/5 média
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 star-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  12+ plataformas
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 star-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Atualizado semanalmente
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="plataformas" className="py-16 sm:py-24 lg:py-32" aria-labelledby="platforms-title">
          <div className="container-page">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <h2 id="platforms-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Plataformas <span className="text-gradient-gold">em destaque</span>
                </h2>
                <p className="mt-2 text-text-secondary max-w-md">
                  Selecionadas e analisadas por nossa equipe. Ordem baseada em avaliação, bônus e experiência do usuário.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-text-muted">Ordenar por:</span>
                <select className="rounded-lg border border-border-subtle bg-bg-card px-4 py-2 text-sm text-white focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary" aria-label="Ordenar plataformas">
                  <option value="position">Recomendação</option>
                  <option value="rating">Maior nota</option>
                  <option value="bonus">Melhor bônus</option>
                  <option value="newest">Mais recentes</option>
                </select>
              </div>
            </div>

            {activePlatforms.length === 0 ? (
              <div className="card-premium py-20 px-8 text-center">
                <svg className="mx-auto h-16 w-16 text-text-muted mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhuma plataforma disponível</h3>
                <p className="text-text-secondary">No momento não há plataformas cadastradas. Volte em breve para novidades.</p>
              </div>
            ) : (
              <div className="platform-grid" role="list" aria-label="Lista de plataformas de slots">
                {activePlatforms.map((platform) => (
                  <article
                    key={platform.id}
                    className={`card-premium ${platform.is_featured ? "featured" : ""} flex flex-col`}
                    role="listitem"
                  >
                    {platform.is_featured && (
                      <div className="mb-4 w-fit">
                        <span className="badge-destaque">Destaque</span>
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      {platform.logo_url && (
                        <div className="flex-shrink-0">
                          <img
                            src={platform.logo_url}
                            alt={`Logo de ${platform.name}`}
                            className="h-14 w-14 rounded-lg object-cover bg-bg-secondary"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white truncate">{platform.name}</h3>
                        {platform.rating !== null && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-sm font-medium text-text-secondary">Avaliação:</span>
                            <div className="flex items-center gap-0.5" aria-label={`${platform.rating.toFixed(1)} de 5 estrelas`}>
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.round(platform.rating!) ? "star-gold" : "text-border-subtle"}`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                              <span className="text-sm font-semibold text-white ml-1">{platform.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {platform.description && (
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                        {platform.description}
                      </p>
                    )}

                    {platform.bonus_text && (
                      <div className="mb-4 rounded-lg bg-gold-primary/10 border border-gold-primary/20 px-4 py-3">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 text-gold-primary text-lg" aria-hidden="true">🎁</span>
                          <p className="text-sm text-gold-light leading-relaxed">{platform.bonus_text}</p>
                        </div>
                      </div>
                    )}

                    <a
                      href={platform.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold w-full mt-auto"
                      aria-label={`Acessar ${platform.name} - abre em nova aba`}
                    >
                      Acessar plataforma
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="sobre" className="py-16 sm:py-24 lg:py-32 bg-bg-secondary" aria-labelledby="trust-title">
          <div className="container-page">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="trust-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Por que confiar no <span className="text-gradient-gold">SlotGold</span>?
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                Nossa metodologia é transparente e independente. Não recebemos pagamento para melhorar posições.
              </p>
            </div>

            <div className="trust-grid" role="list" aria-label="Critérios de confiança">
              <article className="card-premium p-6 text-center" role="listitem">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Avaliação Independente</h3>
                <p className="text-text-secondary text-sm">Testamos cada plataforma pessoalmente. Sem influência de pagamentos ou parcerias.</p>
              </article>

              <article className="card-premium p-6 text-center" role="listitem">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Segurança em Primeiro Lugar</h3>
                <p className="text-text-secondary text-sm">Apenas plataformas licenciadas, com criptografia SSL e jogo responsável.</p>
              </article>

              <article className="card-premium p-6 text-center" role="listitem">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Atualização Constante</h3>
                <p className="text-text-secondary text-sm">Revisamos bônus, termos e notas semanalmente. Informação sempre atual.</p>
              </article>

              <article className="card-premium p-6 text-center" role="listitem">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Transparência Total</h3>
                <p className="text-text-secondary text-sm">Exibimos prós e contras reais. Links de afiliado não afetam nosso ranking.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="cta-title">
          <div className="container-page">
            <div className="card-premium featured p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/5 via-transparent to-gold-primary/5" aria-hidden="true" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 id="cta-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Pronto para jogar nas melhores plataformas?
                </h2>
                <p className="text-lg text-text-secondary mb-8">
                  Escolha uma plataforma acima, aproveite bônus exclusivos e jogue com responsabilidade.
                </p>
                <a href="#plataformas" className="btn-gold text-base px-8 py-3">
                  Ver todas as plataformas
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="py-16 sm:py-24 lg:py-32 bg-bg-secondary" aria-labelledby="contact-title">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="contact-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                <span className="text-gradient-gold">Contato</span> & Suporte
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                Estamos aqui para ajudar. Escolha a melhor forma de entrar em contato conosco.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <article className="card-premium p-8 text-center">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">E-mail para Parcerias e Imprensa</h3>
                <p className="text-text-secondary text-sm mb-6">
                  Para parcerias comerciais, imprensa ou sugestões de plataformas:
                </p>
                <div className="p-4 rounded-lg bg-bg-primary border border-border-subtle text-center">
                  <code className="text-sm text-text-secondary font-mono">contato@slotgold.com</code>
                  <p className="mt-2 text-xs text-text-muted">
                    Endereço configurável — substitua pelo e-mail oficial do projeto
                  </p>
                </div>
              </article>

              <article className="card-premium p-8 text-center">
                <div className="mx-auto w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Dúvidas sobre Plataformas</h3>
                <p className="text-text-secondary text-sm mb-6">
                  Para dúvidas sobre avaliações, metodologia ou correções de informações:
                </p>
                <a href="mailto:contato@slotgold.com?subject=Dúvida sobre plataforma" className="btn-gold w-full">
                  Enviar mensagem
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </a>
              </article>
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <div className="card-premium p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Jogo Responsável — Recursos de Apoio</h3>
                <p className="text-text-secondary text-sm mb-6 text-center">
                  Se você ou alguém que conhece está enfrentando dificuldades com jogos de azar, estes recursos gratuitos e confidenciais podem ajudar:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="https://www.jogadoresanonimos.org.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-premium p-4 hover:border-gold-primary transition-colors text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-5 h-5 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="font-medium text-white group-hover:text-gold-primary transition-colors">Jogadores Anônimos Brasil</span>
                    </div>
                    <p className="text-xs text-text-secondary">Grupos de apoio, literatura e reuniões presenciais/online em todo o Brasil.</p>
                  </a>

                  <a
                    href="https://www.cvl.org.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-premium p-4 hover:border-gold-primary transition-colors text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-5 h-5 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium text-white group-hover:text-gold-primary transition-colors">CVV — Centro de Valorização da Vida</span>
                    </div>
                    <p className="text-xs text-text-secondary">Apoio emocional 24h, gratuito e sigiloso. Ligue <strong>188</strong> ou acesse o chat online.</p>
                  </a>

                  <a
                    href="https://www.jogadoresanonimos.org.br/ferramentas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-premium p-4 hover:border-gold-primary transition-colors text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-5 h-5 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium text-white group-hover:text-gold-primary transition-colors">Limites de Depósito</span>
                    </div>
                    <p className="text-xs text-text-secondary">Ferramentas para definir limites de depósito, tempo e autoexclusão nas plataformas.</p>
                  </a>

                  <a
                    href="https://www.ibeja.org.br/autoexclusao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-premium p-4 hover:border-gold-primary transition-colors text-center group"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-5 h-5 star-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="font-medium text-white group-hover:text-gold-primary transition-colors">Autoexclusão</span>
                    </div>
                    <p className="text-xs text-text-secondary">Informações sobre programas de autoexclusão e bloqueio de acesso a sites de apostas.</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-bg-secondary border-t border-border-subtle" role="contentinfo">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <a href="/" className="flex items-center gap-2 mb-4" aria-label="SlotGold - Início">
                <span className="text-2xl font-bold text-white">SlotGold</span>
              </a>
              <p className="text-text-secondary max-w-xs mb-6">
                Portal independente de comparação de plataformas de slots online.
                Transparência, segurança e as melhores ofertas em um só lugar.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Navegação</span>
                <a href="#plataformas" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Plataformas</a>
                <a href="#sobre" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Como Avaliamos</a>
                <a href="#contato" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Contato</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Jogo Responsável</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="https://www.jogadoresanonimos.org.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Jogadores Anônimos Brasil</a></li>
                <li><a href="https://www.cvl.org.br" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Centro de Valorização da Vida (188)</a></li>
                <li><a href="https://www.jogadoresanonimos.org.br/ferramentas" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Limites de depósito</a></li>
                <li><a href="https://www.ibeja.org.br/autoexclusao" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Autoexclusão</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="/termos" className="hover:text-gold-primary transition-colors">Termos de Uso</a></li>
                <li><a href="/privacidade" className="hover:text-gold-primary transition-colors">Política de Privacidade</a></li>
                <li><a href="/cookies" className="hover:text-gold-primary transition-colors">Política de Cookies</a></li>
                <li><a href="/afiliados" className="hover:text-gold-primary transition-colors">Divulgação de Afiliados</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-muted">
                © {new Date().getFullYear()} SlotGold. Todos os direitos reservados.
              </p>
              <p className="text-xs text-text-muted">
                Proibido para menores de 18 anos. Jogue com responsabilidade.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold-primary transition-colors" aria-label="Twitter / X">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold-primary transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-gold-primary transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}