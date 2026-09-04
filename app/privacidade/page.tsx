import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade - SlotGold",
  description: "Política de privacidade do SlotGold. Como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados).",
  robots: "index, follow",
  openGraph: {
    title: "Política de Privacidade - SlotGold",
    description: "Como coletamos, usamos e protegemos seus dados pessoais.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function PrivacidadePage() {
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
                Política de <span className="text-gradient-gold">Privacidade</span>
              </h1>
              <p className="text-text-secondary text-sm">
                Última atualização: <time dateTime="2026-09-01">{lastUpdated}</time>
              </p>
            </header>

            <div className="card-premium p-6 sm:p-8 lg:p-10 space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Controlador de Dados</h2>
                <p className="text-text-secondary leading-relaxed">
                  O SlotGold ("nós", "nosso", "nos") é o controlador dos dados pessoais coletados através deste site. Para exercer seus direitos ou tirar dúvidas, contate: <a href="mailto:claudioramalho1234@gmail.com" className="text-gold-primary hover:underline">claudioramalho1234@gmail.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Dados Coletados</h2>
                <p className="text-text-secondary leading-relaxed mb-3">Coletamos as seguintes categorias de dados:</p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>Dados de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência, referenciador (via cookies e tecnologias similares — veja <Link href="/cookies" className="text-gold-primary hover:underline">Política de Cookies</Link>);</li>
                  <li><strong>Dados de formulário:</strong> Nome, e-mail e mensagem quando você entra em contato voluntariamente;</li>
                  <li><strong>Dados de terceiros:</strong> Ao clicar em links de afiliado, a plataforma de destino pode coletar seus dados conforme sua própria política.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Finalidades do Tratamento</h2>
                <p className="text-text-secondary leading-relaxed mb-3">Usamos seus dados para:</p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Fornecer, manter e melhorar o site e seu conteúdo;</li>
                  <li>Analisar tráfego e padrões de uso (estatísticas agregadas, anônimas);</li>
                  <li>Responder a solicitações de contato e suporte;</li>
                  <li>Cumprir obrigações legais e regulatórias (LGPD, Marco Civil da Internet);</li>
                  <li>Prevenir fraudes e abusos.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Base Legal (LGPD)</h2>
                <p className="text-text-secondary leading-relaxed mb-3">O tratamento baseia-se em:</p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>Legítimo interesse</strong> (Art. 7º, IX): Análise de tráfego, segurança, melhoria contínua;</li>
                  <li><strong>Consentimento</strong> (Art. 7º, I): Cookies não essenciais, comunicações de marketing (se houver);</li>
                  <li><strong>Cumprimento de obrigação legal</strong> (Art. 7º, II): Registros de acesso, requisições judiciais;</li>
                  <li><strong>Exercício regular de direitos</strong> (Art. 7º, VI): Defesa em processos.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Compartilhamento de Dados</h2>
                <p className="text-text-secondary leading-relaxed mb-3">Não vendemos seus dados. Podemos compartilhar com:</p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li><strong>Processadores:</strong> Provedores de hospedagem, analytics (ex: Vercel, Google Analytics) sob contratos de processamento de dados (DPA);</li>
                  <li><strong>Plataformas de afiliado:</strong> Ao clicar em "Acessar", você sai do nosso site e passa a ser regido pela política da plataforma de destino;</li>
                  <li><strong>Autoridades:</strong> Quando exigido por lei, ordem judicial ou para proteger direitos.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Transferência Internacional</h2>
                <p className="text-text-secondary leading-relaxed">
                  Alguns processadores podem estar localizados fora do Brasil (ex: EUA). Nesses casos, exigimos cláusulas contratuais padrão ou decisões de adequação da ANPD para garantir proteção equivalente à LGPD.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Retenção de Dados</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Mantemos dados pelo tempo necessário para a finalidade:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Logs de acesso: 6 meses (Marco Civil da Internet, Art. 15);</li>
                  <li>Dados de formulário de contato: 12 meses após última interação;</li>
                  <li>Cookies: Conforme <Link href="/cookies" className="text-gold-primary hover:underline">Política de Cookies</Link>.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Seus Direitos (LGPD, Art. 18)</h2>
                <p className="text-text-secondary leading-relaxed mb-3">Você pode solicitar, a qualquer momento:</p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Confirmação da existência de tratamento;</li>
                  <li>Acesso aos dados;</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários/excessivos;</li>
                  <li>Portabilidade dos dados a outro fornecedor;</li>
                  <li>Eliminação dos dados tratados com consentimento (exceto hipóteses do Art. 16);</li>
                  <li>Informação sobre entidades com quem compartilhamos dados;</li>
                  <li>Informação sobre a possibilidade de não consentir e consequências;</li>
                  <li>Revogação do consentimento.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-3">
                  Para exercer seus direitos: <a href="mailto:claudioramalho1234@gmail.com" className="text-gold-primary hover:underline">claudioramalho1234@gmail.com</a>. Responderemos em até 15 dias (Art. 19, LGPD).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Segurança</h2>
                <p className="text-text-secondary leading-relaxed">
                  Implementamos medidas técnicas e organizacionais adequadas: HTTPS/TLS 1.3, headers de segurança (CSP, HSTS), acesso restrito a dados, monitoramento de vulnerabilidades. Nenhum sistema é 100% seguro; em caso de incidente, notificaremos conforme Art. 48 da LGPD.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Menores de Idade</h2>
                <p className="text-text-secondary leading-relaxed">
                  O SlotGold não se destina a menores de 18 anos. Não coletamos intencionalmente dados de menores. Se você é pai/mãe/guardião e acredita que coletamos dados de menor, contate-nos para remoção imediata.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">11. Alterações desta Política</h2>
                <p className="text-text-secondary leading-relaxed">
                  Atualizações serão publicadas nesta página com nova data. Alterações materiais serão destacadas. Recomendamos revisão periódica.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">12. Contato do Encarregado (DPO)</h2>
                <p className="text-text-secondary leading-relaxed">
                  Nosso Encarregado de Proteção de Dados pode ser contatado em: <a href="mailto:claudioramalho1234@gmail.com" className="text-gold-primary hover:underline">claudioramalho1234@gmail.com</a>
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
    </>
  );
}