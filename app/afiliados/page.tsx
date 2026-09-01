import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Divulgação de Afiliados - SlotGold",
  description: "Divulgação transparente sobre links de afiliados, comissões e como mantemos a independência editorial no SlotGold. Conformidade com diretrizes de publicidade e LGPD.",
  robots: "index, follow",
  openGraph: {
    title: "Divulgação de Afiliados - SlotGold",
    description: "Transparência total sobre nossa relação com plataformas parceiras e links de afiliado.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function AfiliadosPage() {
  const lastUpdated = "1 de Setembro de 2026";

  return (
    <>
      <header className="border-b border-border-subtle bg-bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="SlotGold - Início">
              <span className="text-2xl font-bold text-white">SlotGold</span>
              <span className="hidden sm:inline-flex h-5 w-px bg-gradient-gold" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium text-gold-primary tracking-wider">
                Portal de Comparação
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
              <Link href="#plataformas" className="text-sm font-medium text-text-secondary hover:text-gold-primary transition-colors">
                Plataformas
              </Link>
              <Link href="#sobre" className="text-sm font-medium text-text-secondary hover:text-gold-primary transition-colors">
                Como Avaliamos
              </Link>
              <Link href="#contato" className="text-sm font-medium text-text-secondary hover:text-gold-primary transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 py-16 sm:py-24 lg:py-32">
        <div className="container-page">
          <article className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold-primary transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar ao SlotGold
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Divulgação de <span className="text-gradient-gold">Afiliados</span>
              </h1>
              <p className="text-text-secondary text-sm">
                Última atualização: <time dateTime="2026-09-01">{lastUpdated}</time>
              </p>
            </header>

            <div className="card-premium p-6 sm:p-8 lg:p-10 space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Resumo Executivo</h2>
                <div className="p-4 rounded-lg bg-gold-primary/10 border border-gold-primary/20">
                  <p className="text-gold-light leading-relaxed font-medium">
                    <strong>O SlotGold contém links de afiliado.</strong> Quando você clica em "Acessar plataforma" e se cadastra ou deposita, podemos receber uma comissão da plataforma parceira. <strong>Isso não custa nada a você</strong> e <strong>não influencia nossas avaliações, rankings ou recomendações.</strong>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. O que são Links de Afiliado</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Links de afiliado são URLs especiais que contêm um identificador único do SlotGold. Quando você:
                </p>
                <ol className="text-text-secondary leading-relaxed space-y-2 ml-6 list-decimal">
                  <li>Clica em "Acessar plataforma" no SlotGold;</li>
                  <li>É redirecionado para o site da plataforma;</li>
                  <li>Se cadastra e/ou faz um depósito qualificado;</li>
                </ol>
                <p className="text-text-secondary leading-relaxed mt-3">
                  A plataforma nos paga uma comissão (fixa ou percentual) por essa indicação. O valor vem do orçamento de marketing da plataforma — <strong>nunca do seu bolso</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Nossa Promessa de Independência Editorial</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  A integridade do SlotGold é inegociável. Garantimos:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-3 ml-6 list-disc">
                  <li>
                    <strong className="text-white">Ranking imune a pagamento:</strong> A ordem das plataformas é determinada exclusivamente por nossa metodologia (avaliação, bônus, segurança, UX, reputação). Não vendemos posições.
                  </li>
                  <li>
                    <strong className="text-white">Análises honestas:</strong> Listamos prós e contras reais. Se uma plataforma tem problemas, diremos — mesmo que seja parceira.
                  </li>
                  <li>
                    <strong className="text-white">Sem pressão comercial:</strong> Parceiros não revisam, aprovam ou editam nosso conteúdo antes da publicação.
                  </li>
                  <li>
                    <strong className="text-white">Transparência total:</strong> Esta página existe para que você saiba exatamente como funcionamos.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Como Selecionamos Parceiros</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Não aceitamos qualquer plataforma. Critérios mínimos para parceria:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Licença válida de jurisdição respeitável (Malta, Curaçao, UKGC, Gibraltar, etc.);</li>
                  <li>Histórico de pagamentos confiável e suporte responsivo;</li>
                  <li>Termos de bônus claros e justos (rollover razoável, sem armadilhas);</li>
                  <li>Criptografia SSL/TLS, jogo responsável, ferramentas de autoexclusão;</li>
                  <li>Reputação positiva em comunidades de jogadores e fóruns independentes.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-3">
                  Plataformas que deixam de atender aos critérios são removidas ou rebaixadas, independentemente de acordo comercial.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Tipos de Compensação</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Podemos receber:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>CPA (Cost Per Acquisition):</strong> Valor fixo por jogador depositante qualificado;</li>
                  <li><strong>Revenue Share:</strong> Percentual da receita líquida gerada pelo jogador (vida longa ou período definido);</li>
                  <li><strong>Híbrido:</strong> Combinação de CPA + Revenue Share;</li>
                  <li><strong>Bônus exclusivos para nossos usuários:</strong> Negociamos ofertas melhores (ex: giros grátis extras, rollover reduzido) — isso beneficia você diretamente.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Identificação de Links de Afiliado</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Todos os botões "Acessar plataforma" e links para plataformas parceiras são links de afiliado. Eles:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Abrem em nova aba (<code className="bg-bg-primary px-1.5 py-0.5 rounded text-xs font-mono">target="_blank" rel="noopener noreferrer"</code>);</li>
                  <li>Contêm parâmetros de rastreamento (ex: <code className="bg-bg-primary px-1.5 py-0.5 rounded text-xs font-mono">?ref=slotgold</code> ou ID numérico);</li>
                  <li>São claramente rotulados como links externos.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Conformidade Regulatória</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Cumprimos as principais diretrizes de publicidade e proteção ao consumidor:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>Brasil — CONAR (Código de Auto-Regulamentação Publicitária):</strong> Identificação clara de conteúdo comercial, não enganosidade;</li>
                  <li><strong>Brasil — LGPD (Lei 13.709/2018):</strong> Dados de rastreamento de afiliados tratados com base em legítimo interesse/consentimento — veja <Link href="/privacidade" className="text-gold-primary hover:underline">Política de Privacidade</Link> e <Link href="/cookies" className="text-gold-primary hover:underline">Política de Cookies</Link>;</li>
                  <li><strong>Internacional — FTC (EUA) / ASA (UK) / Diretiva de Comércio Eletrônico (UE):</strong> Divulgação clara e conspicua de relação material (affiliate disclosure).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. O que NÃO Fazemos</h2>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Não criamos avaliações falsas ou pagamos por reviews positivas;</li>
                  <li>Não ocultamos reclamações ou problemas conhecidos de plataformas;</li>
                  <li>Não usamos "dark patterns" para forçar cliques em links de afiliado;</li>
                  <li>Não compartilhamos seus dados pessoais com parceiros além do necessário para atribuição de afiliado (clique → cookie → conversão);</li>
                  <li>Não garantimos ganhos — jogos de azar envolvem risco de perda financeira.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Benefícios para Você</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Nossa modelagem de afiliado alinha nossos interesses aos seus:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>Bônus exclusivos:</strong> Negociamos ofertas que você não encontra acessando direto;</li>
                  <li><strong>Filtro de qualidade:</strong> Só recomendamos plataformas que passam em nossa auditoria;</li>
                  <li><strong>Suporte indireto:</strong> Se tiver problema com uma plataforma parceira, podemos intermediar (embora não tenhamos autoridade legal);</li>
                  <li><strong>Conteúdo gratuito e sem paywall:</strong> A comissão mantém o site no ar, sem anúncios intrusivos.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Como Verificar Nossa Independência</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Convidamos você a auditar nosso trabalho:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Compare nossas notas com fóruns independentes (Reclame Aqui, Reddit r/gambling, Trustpilot);</li>
                  <li>Teste as plataformas você mesmo (muitas têm modo demo grátis);</li>
                  <li>Leia nossos <Link href="/termos" className="text-gold-primary hover:underline">Termos de Uso</Link> e <Link href="/privacidade" className="text-gold-primary hover:underline">Política de Privacidade</Link>;</li>
                  <li>Conteste-nos: se encontrar inconsistência, reporte em <a href="mailto:contato@slotgold.com" className="text-gold-primary hover:underline">contato@slotgold.com</a>.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">11. Atualizações desta Divulgação</h2>
                <p className="text-text-secondary leading-relaxed">
                  Revisamos esta página periodicamente. Alterações materiais serão destacadas. A versão mais recente sempre estará em <code className="bg-bg-primary px-1.5 py-0.5 rounded text-xs font-mono">/afiliados</code>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">12. Contato</h2>
                <p className="text-text-secondary leading-relaxed">
                  Dúvidas sobre nossa política de afiliados: <a href="mailto:afiliados@slotgold.com" className="text-gold-primary hover:underline">afiliados@slotgold.com</a> (endereço configurável — substitua pelo e-mail oficial do projeto).
                </p>
              </section>
            </div>

            <div className="mt-8 text-center">
              <Link href="/" className="btn-gold inline-flex">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar à Home
              </Link>
            </div>
          </article>
        </div>
      </main>

      <footer className="bg-bg-secondary border-t border-border-subtle" role="contentinfo">
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="SlotGold - Início">
                <span className="text-2xl font-bold text-white">SlotGold</span>
              </Link>
              <p className="text-text-secondary max-w-xs mb-6">
                Portal independente de comparação de plataformas de slots online.
                Transparência, segurança e as melhores ofertas em um só lugar.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Navegação</span>
                <Link href="#plataformas" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Plataformas</Link>
                <Link href="#sobre" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Como Avaliamos</Link>
                <Link href="#contato" className="text-sm text-text-secondary hover:text-gold-primary transition-colors">Contato</Link>
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
                <li><Link href="/termos" className="hover:text-gold-primary transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-gold-primary transition-colors">Política de Privacidade</Link></li>
                <li><Link href="/cookies" className="hover:text-gold-primary transition-colors">Política de Cookies</Link></li>
                <li><Link href="/afiliados" className="hover:text-gold-primary transition-colors">Divulgação de Afiliados</Link></li>
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