import type { Metadata } from "next";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "Política de Cookies - SlotGold",
  description: "Política de cookies do SlotGold. Quais cookies usamos, para que servem, como gerenciar suas preferências e seus direitos sob a LGPD.",
  robots: "index, follow",
  openGraph: {
    title: "Política de Cookies - SlotGold",
    description: "Quais cookies usamos, para que servem e como gerenciar preferências.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function CookiesPage() {
  const lastUpdated = "1 de Setembro de 2026";

  return (
    <PhoneFrame>
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
                Política de <span className="text-gradient-gold">Cookies</span>
              </h1>
              <p className="text-text-secondary text-sm">
                Última atualização: <time dateTime="2026-09-01">{lastUpdated}</time>
              </p>
            </header>

            <div className="card-premium p-6 sm:p-8 lg:p-10 space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. O que são Cookies</h2>
                <p className="text-text-secondary leading-relaxed">
                  Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, celular, tablet) quando você visita um site. Eles permitem que o site "lembre" suas ações e preferências (login, idioma, tamanho da fonte, etc.) por um período, para que você não precise reinseri-las a cada visita.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Categorias de Cookies que Usamos</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Classificamos nossos cookies conforme a finalidade:
                </p>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-bg-primary border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-bold">1</span>
                      <h3 className="text-lg font-semibold text-white">Essenciais (Estritamente Necessários)</h3>
                    </div>
                    <p className="text-text-secondary text-sm ml-11 leading-relaxed">
                      Permitem a navegação e uso das funcionalidades básicas do site. Sem eles, o site não funciona corretamente. Não requerem consentimento (Art. 7º, IX, LGPD — legítimo interesse).
                    </p>
                    <ul className="text-text-secondary text-sm ml-11 mt-2 space-y-1 list-disc">
                      <li>Sessão e autenticação (admin)</li>
                      <li>Segurança (CSRF, rate limiting)</li>
                      <li>Preferências de consentimento de cookies</li>
                      <li>Balanceamento de carga / infraestrutura</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-bg-primary border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold">2</span>
                      <h3 className="text-lg font-semibold text-white">Analíticos / Desempenho</h3>
                    </div>
                    <p className="text-text-secondary text-sm ml-11 leading-relaxed">
                      Coletam informações anônimas sobre como os visitantes usam o site (páginas mais visitadas, tempo de permanência, origem do tráfego). Ajudam-nos a melhorar o conteúdo e a experiência. Requerem consentimento.
                    </p>
                    <ul className="text-text-secondary text-sm ml-11 mt-2 space-y-1 list-disc">
                      <li>Google Analytics / GA4 (IP anonimizado)</li>
                      <li>Vercel Analytics</li>
                      <li>Métricas de Core Web Vitals</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-bg-primary border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-bold">3</span>
                      <h3 className="text-lg font-semibold text-white">Funcionais / Preferências</h3>
                    </div>
                    <p className="text-text-secondary text-sm ml-11 leading-relaxed">
                      Permitem lembrar escolhas do usuário para proporcionar experiência personalizada. Requerem consentimento.
                    </p>
                    <ul className="text-text-secondary text-sm ml-11 mt-2 space-y-1 list-disc">
                      <li>Idioma/região preferida</li>
                      <li>Tema (embora usemos apenas dark mode)</li>
                      <li>Filtros salvos de plataformas</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-bg-primary border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-sm font-bold">4</span>
                      <h3 className="text-lg font-semibold text-white">Marketing / Publicidade (Terceiros)</h3>
                    </div>
                    <p className="text-text-secondary text-sm ml-11 leading-relaxed">
                      Usados para exibir anúncios relevantes, limitar frequência e medir eficácia de campanhas. Podem ser definidos por parceiros de publicidade (plataformas de afiliado, redes de anúncios). Requerem consentimento explícito.
                    </p>
                    <ul className="text-text-secondary text-sm ml-11 mt-2 space-y-1 list-disc">
                      <li>Rastreamento de conversão de afiliados (clique em "Acessar")</li>
                      <li>Pixels de plataformas parceiras (se aplicável)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Cookies de Terceiros Específicos</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Ao clicar em links de afiliado ("Acessar plataforma"), você é redirecionado para o site da plataforma. Nesse momento, a plataforma pode definir seus próprios cookies para:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Atribuir a indicação ao SlotGold (cookie de afiliado);</li>
                  <li>Rastrear conversão (cadastro, depósito);</li>
                  <li>Personalizar a experiência na plataforma de destino.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-3">
                  Não temos controle sobre esses cookies. Recomendamos revisar a <Link href="/privacidade" className="text-gold-primary hover:underline">Política de Privacidade</Link> e a política de cookies de cada plataforma antes de prosseguir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Gerenciamento de Cookies</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Você pode controlar cookies de várias formas:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>Banner de consentimento:</strong> Ao acessar o site, você pode aceitar, rejeitar ou personalizar categorias (exceto essenciais);</li>
                  <li><strong>Configurações do navegador:</strong> Bloquear/limpar cookies (pode quebrar funcionalidades do site);</li>
                  <li><strong>Ferramentas de opt-out:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:underline">Google Analytics Opt-out</a>, <a href="https://www.youronlinechoices.com/br/" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:underline">YourOnlineChoices Brasil</a>;</li>
                  <li><strong>Modo privado/incógnito:</strong> Não salva cookies após fechar a janela.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Tabela Detalhada de Cookies</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-text-secondary border border-border-subtle rounded-lg">
                    <thead className="bg-bg-primary border-b border-border-subtle">
                      <tr>
                        <th className="p-3 text-left font-medium text-white">Nome</th>
                        <th className="p-3 text-left font-medium text-white">Categoria</th>
                        <th className="p-3 text-left font-medium text-white">Finalidade</th>
                        <th className="p-3 text-left font-medium text-white">Duração</th>
                        <th className="p-3 text-left font-medium text-white">Origem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      <tr>
                        <td className="p-3 font-mono text-gold-light">__session</td>
                        <td className="p-3"><span className="badge-destaque">Essencial</span></td>
                        <td className="p-3">Sessão de administrador</td>
                        <td className="p-3">Sessão</td>
                        <td className="p-3">SlotGold</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-gold-light">cookie_consent</td>
                        <td className="p-3"><span className="badge-destaque">Essencial</span></td>
                        <td className="p-3">Registra preferências de consentimento</td>
                        <td className="p-3">1 ano</td>
                        <td className="p-3">SlotGold</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-gold-light">_ga, _ga_*</td>
                        <td className="p-3"><span className="badge-destaque" style={{background: 'rgba(59,130,246,0.15)', borderColor: '#3b82f6', color: '#60a5fa'}}>Analítico</span></td>
                        <td className="p-3">Google Analytics — distinguir usuários/sessões</td>
                        <td className="p-3">2 anos / 24h</td>
                        <td className="p-3">Google</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-gold-light">vercel_analytics</td>
                        <td className="p-3"><span className="badge-destaque" style={{background: 'rgba(59,130,246,0.15)', borderColor: '#3b82f6', color: '#60a5fa'}}>Analítico</span></td>
                        <td className="p-3">Vercel Analytics — métricas de performance</td>
                        <td className="p-3">Sessão</td>
                        <td className="p-3">Vercel</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-gold-light">affiliate_*</td>
                        <td className="p-3"><span className="badge-destaque" style={{background: 'rgba(244,114,182,0.15)', borderColor: '#f472b6', color: '#f9a8d4'}}>Marketing</span></td>
                        <td className="p-3">Rastreamento de cliques em links de afiliado</td>
                        <td className="p-3">30-90 dias</td>
                        <td className="p-3">Plataformas parceiras</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Consentimento e Retirada</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Ao continuar navegando após o banner, você consente com cookies não essenciais (conforme configuração escolhida). Você pode retirar o consentimento a qualquer momento:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Limpando cookies do site nas configurações do navegador;</li>
                  <li>Usando o botão "Gerenciar Cookies" no rodapé (se implementado);</li>
                  <li>Enviando e-mail para <a href="mailto:claudioramalho1234@gmail.com" className="text-gold-primary hover:underline">claudioramalho1234@gmail.com</a>.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-3">
                  A retirada não afeta a legalidade do tratamento realizado antes dela.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Cookies e LGPD</h2>
                <p className="text-text-secondary leading-relaxed">
                  Cookies que identificam direta ou indiretamente uma pessoa natural são dados pessoais (LGPD, Art. 5º, I). Tratamos cookies analíticos, funcionais e de marketing com base no <strong>consentimento</strong> (Art. 7º, I). Cookies essenciais baseiam-se em <strong>legítimo interesse</strong> (Art. 7º, IX). Seus direitos (Art. 18) aplicam-se integralmente — veja <Link href="/privacidade" className="text-gold-primary hover:underline">Política de Privacidade</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Alterações desta Política</h2>
                <p className="text-text-secondary leading-relaxed">
                  Atualizações serão publicadas aqui com nova data. Se houver mudança de finalidade ou novos cookies não essenciais, solicitaremos novo consentimento.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Contato</h2>
                <p className="text-text-secondary leading-relaxed">
                  Dúvidas sobre cookies: <a href="mailto:claudioramalho1234@gmail.com" className="text-gold-primary hover:underline">claudioramalho1234@gmail.com</a>
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
                <li><a href="https://www.jogadoresanonimos.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Jogadores Anônimos Brasil</a></li>
                <li><a href="https://cvv.org.br/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Centro de Valorização da Vida (188)</a></li>
                <li><a href="https://www.gov.br/fazenda/pt-br/assuntos/jogo-responsavel" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Limites de depósito</a></li>
                <li><a href="https://www.gov.br/pt-br/servicos/plataforma-centralizada-de-autoexclusao-apostas" target="_blank" rel="noopener noreferrer" className="hover:text-gold-primary transition-colors">Autoexclusão</a></li>
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
    </PhoneFrame>
  );
}