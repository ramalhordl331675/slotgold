import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import HeroPremium from "@/components/HeroPremium";
import PlatformSlider from "@/components/PlatformSlider";
import PlatformGrid from "@/components/PlatformGrid";
import TrustBar from "@/components/TrustBar";
import WhyTrust from "@/components/WhyTrust";
import HowItWorks from "@/components/HowItWorks";
import FaqAccordion from "@/components/FaqAccordion";
import TrustSeal from "@/components/TrustSeal";


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
      <Header />
      <main className="flex-1">
        <HeroPremium />
        <PlatformSlider platforms={activePlatforms} />
        <PlatformGrid platforms={activePlatforms} />
        <WhyTrust />
        <TrustBar />

        <div className="section-cta-band" aria-label="Chamada para ação">
          <div className="container-page">
            <div className="section-cta-inner">
              <p className="section-cta-text">Pronto para comparar?</p>
              <a href="#plataformas" className="btn-gold" aria-label="Ver plataformas">
                VER PLATAFORMAS
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <HowItWorks />

        {/* SOBRE O SLOTGOLD */}
        <section id="sobre" className="py-16 sm:py-24 lg:py-32 bg-bg-secondary" aria-labelledby="sobre-title" data-depth="1">
          <div className="container-page">
            <div className="sobre-header reveal">
              <span className="sobre-badge" aria-hidden="true">SOBRE NÓS</span>
              <h2 id="sobre-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                CONHEÇA O <span className="text-gradient-gold">SLOTGOLD</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                O SlotGold foi criado para reunir informações sobre diferentes plataformas de slots em um único lugar, facilitando a descoberta e a comparação de opções disponíveis.
              </p>
            </div>

            <div className="sobre-content">
              <div className="sobre-text reveal reveal-delay-1">
                <p className="text-text-secondary mb-4">
                  Nosso objetivo é organizar informações de forma clara, apresentar plataformas de forma objetiva e ajudar o visitante a comparar opções antes de tomar uma decisão.
                </p>
                <p className="text-text-secondary">
                  Com uma navegação simples e intuitiva, o SlotGold permite que você encontre o que procura de forma rápida e eficiente, sem complicação.
                </p>
              </div>
              <div className="sobre-visual reveal reveal-delay-2" aria-hidden="true">
                <div className="sobre-visual-card">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="sobre-pillars" role="list" aria-label="Pilares do SlotGold">
              <article className="sobre-pillar reveal reveal-delay-1" role="listitem">
                <div className="sobre-pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <h3 className="sobre-pillar-title">Descoberta</h3>
                <p className="sobre-pillar-description">Encontre diferentes plataformas em um único lugar.</p>
              </article>

              <article className="sobre-pillar reveal reveal-delay-2" role="listitem">
                <div className="sobre-pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                </div>
                <h3 className="sobre-pillar-title">Comparação</h3>
                <p className="sobre-pillar-description">Consulte informações importantes antes de escolher.</p>
              </article>

              <article className="sobre-pillar reveal reveal-delay-3" role="listitem">
                <div className="sobre-pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="sobre-pillar-title">Organização</h3>
                <p className="sobre-pillar-description">Tenha acesso a informações apresentadas de forma simples.</p>
              </article>

              <article className="sobre-pillar reveal" role="listitem">
                <div className="sobre-pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="sobre-pillar-title">Responsabilidade</h3>
                <p className="sobre-pillar-description">Incentivamos uma relação consciente com o entretenimento.</p>
              </article>
            </div>
          </div>
        </section>

        {/* JOGO RESPONSÁVEL */}
        <section id="jogo-responsavel" className="py-16 sm:py-24 lg:py-32" aria-labelledby="jr-title" data-depth="2">
          <div className="container-page">
            <div className="jr-warning-badge reveal" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>IMPORTANTE</span>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="jr-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                JOGUE COM <span className="text-gradient-gold">RESPONSABILIDADE</span>
              </h2>
              <p className="text-lg text-text-secondary">
                Jogue apenas por entretenimento e nunca aposte mais do que pode perder.
              </p>
            </div>

            <div className="jr-principles" role="list" aria-label="Princípios de jogo responsável">
              {[
                { number: "01", title: "Defina um limite", description: "Estabeleça previamente quanto pode gastar." },
                { number: "02", title: "Não tente recuperar perdas", description: "Perdas fazem parte do risco. Evite aumentar as apostas para tentar recuperar dinheiro perdido." },
                { number: "03", title: "Não jogue com dinheiro essencial", description: "Nunca utilize dinheiro destinado a necessidades básicas, contas ou compromissos." },
                { number: "04", title: "Faça pausas", description: "O entretenimento deve permanecer sob controle." },
                { number: "05", title: "Reconheça os sinais", description: "Se o jogo estiver causando problemas financeiros, emocionais ou familiares, procure ajuda especializada." },
              ].map((principle) => (
                <article key={principle.number} className="jr-principle" role="listitem">
                  <span className="jr-principle-number" aria-hidden="true">{principle.number}</span>
                  <div>
                    <h3 className="jr-principle-title">{principle.title}</h3>
                    <p className="jr-principle-description">{principle.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="jr-risk-warning" role="alert">
              <div className="jr-risk-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <h3 className="jr-risk-title">Jogo envolve risco financeiro.</h3>
                <p className="jr-risk-description">
                  As plataformas apresentadas no SlotGold podem envolver atividades de jogo. Verifique as regras, condições e requisitos aplicáveis antes de utilizar qualquer serviço.
                </p>
              </div>
            </div>

            <div className="jr-help-links">
              <h3 className="jr-help-title">Recursos de Apoio</h3>
              <p className="jr-help-subtitle">
                Se você ou alguém que conhece está enfrentando dificuldades com jogos de azar, estes recursos gratuitos e confidenciais podem ajudar:
              </p>
              <div className="jr-help-grid">
                <a
                  href="https://www.jogadoresanonimos.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jr-help-link"
                >
                  <div className="jr-help-link-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="jr-help-link-title">Jogadores Anônimos Brasil</span>
                    <p className="jr-help-link-description">Grupos de apoio, literatura e reuniões presenciais/online em todo o Brasil.</p>
                  </div>
                </a>

                <a
                  href="https://cvv.org.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jr-help-link"
                >
                  <div className="jr-help-link-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="jr-help-link-title">CVV — Centro de Valorização da Vida</span>
                    <p className="jr-help-link-description">Apoio emocional 24h, gratuito e sigiloso. Ligue <strong>188</strong> ou acesse o chat online.</p>
                  </div>
                </a>

                <a
                  href="https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/autoexclusao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jr-help-link"
                >
                  <div className="jr-help-link-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <span className="jr-help-link-title">Autoexclusão</span>
                    <p className="jr-help-link-description">Plataforma Centralizada de Autoexclusão do Ministério da Fazenda (Secretaria de Prêmios e Apostas).</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-24 lg:py-32 bg-bg-secondary" aria-labelledby="faq-title" data-depth="1">
          <div className="container-page">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <span className="section-badge" aria-hidden="true">FAQ</span>
              <h2 id="faq-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                PERGUNTAS <span className="text-gradient-gold">FREQUENTES</span>
              </h2>
              <p className="text-lg text-text-secondary">
                Confira algumas das dúvidas mais comuns sobre o SlotGold.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <FaqAccordion />
            </div>
          </div>
        </section>

        {/* CTA */}
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
                <div className="mt-8 flex justify-center">
                  <TrustSeal size="small" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
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
                  <a href="mailto:claudioramalho1234@gmail.com" className="text-sm text-gold-primary font-mono hover:underline">claudioramalho1234@gmail.com</a>
                  <p className="mt-2 text-sm text-text-muted">
                    E-mail oficial de contato do SlotGold
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
                <a href="mailto:claudioramalho1234@gmail.com?subject=Dúvida sobre plataforma" className="btn-gold w-full">
                  Enviar mensagem
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </a>
              </article>
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
                <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Navegação</span>
                <a href="#plataformas" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Plataformas</a>
                <a href="#sobre" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Sobre</a>
                <a href="#faq" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">FAQ</a>
                <a href="#contato" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Contato</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Jogo Responsável</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="https://www.jogadoresanonimos.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Jogadores Anônimos Brasil</a></li>
                <li><a href="https://cvv.org.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Centro de Valorização da Vida (188)</a></li>
                <li><a href="#jogo-responsavel" className="hover:text-gold-primary transition-colors">Limites de depósito</a></li>
                <li><a href="https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/autoexclusao" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Autoexclusão</a></li>
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
              <p className="text-sm text-text-muted">
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
