import type { Metadata } from "next";
import Link from "next/link";
import PhoneFrame from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "Termos de Uso - SlotGold",
  description: "Termos e condições de uso do portal SlotGold. Regras para uso do site, comparação de plataformas, responsabilidades e limitações.",
  robots: "index, follow",
  openGraph: {
    title: "Termos de Uso - SlotGold",
    description: "Termos e condições de uso do portal SlotGold.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function TermosPage() {
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
                Termos de <span className="text-gradient-gold">Uso</span>
              </h1>
              <p className="text-text-secondary text-sm">
                Última atualização: <time dateTime="2026-09-01">{lastUpdated}</time>
              </p>
            </header>

            <div className="card-premium p-6 sm:p-8 lg:p-10 space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
                <p className="text-text-secondary leading-relaxed">
                  Ao acessar e utilizar o SlotGold ("nós", "nosso", "nos"), você ("usuário", "você") concorda em cumprir e ficar vinculado a estes Termos de Uso ("Termos"). Se você não concordar com qualquer parte destes termos, não deve utilizar nosso site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Natureza do Serviço</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  O SlotGold é um portal independente de comparação e informação sobre plataformas de slots online. Nós:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Fornecemos informações, análises e comparações baseadas em pesquisa pública e testes independentes;</li>
                  <li>Não somos um cassino, operador de jogos ou plataforma de apostas;</li>
                  <li>Não processamos apostas, depósitos, saques ou transações financeiras de qualquer tipo;</li>
                  <li>Não garantimos a precisão, completude ou atualidade de todas as informações, embora nos esforcemos para mantê-las corretas.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Links de Afiliado e Divulgação</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Nosso site contém links de afiliado para plataformas de terceiros. Ao clicar nesses links e se cadastrar ou depositar, podemos receber uma comissão. Isso <strong className="text-white">não afeta</strong>:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>A ordem ou posicionamento das plataformas em nossos rankings;</li>
                  <li>O conteúdo de nossas análises e avaliações;</li>
                  <li>Os bônus ou condições oferecidos aos usuários.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-3">
                  Para detalhes completos, consulte nossa <Link href="/afiliados" className="text-gold-primary hover:underline">Divulgação de Afiliados</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Responsabilidades do Usuário</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  Ao usar o SlotGold, você concorda em:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Ter idade legal para jogos de azar em sua jurisdição (mínimo 18 anos no Brasil);</li>
                  <li>Usar o site apenas para fins informativos e de comparação;</li>
                  <li>Não reproduzir, distribuir ou criar obras derivadas do nosso conteúdo sem permissão;</li>
                  <li>Não utilizar sistemas automatizados (bots, scrapers) para acessar o site;</li>
                  <li>Verificar os termos e condições das plataformas antes de se cadastrar ou depositar.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Jogo Responsável</h2>
                <p className="text-text-secondary leading-relaxed mb-3">
                  O SlotGold promove o jogo responsável. O jogo deve ser uma forma de entretenimento, não uma fonte de renda. Recomendamos fortemente:
                </p>
                <ul className="text-text-secondary leading-relaxed space-y-2 ml-6 list-disc">
                  <li>Definir limites de tempo e dinheiro antes de jogar;</li>
                  <li>Nunca perseguir perdas ou jogar sob influência de álcool/substâncias;</li>
                  <li>Buscar ajuda se o jogo estiver afetando sua vida pessoal, financeira ou profissional.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-3">
                  Recursos de apoio: <a href="https://www.jogadoresanonimos.com.br/" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:underline">Jogadores Anônimos Brasil</a> | <a href="https://cvv.org.br/" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:underline">CVV - 188</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Isenção de Garantias</h2>
                <p className="text-text-secondary leading-relaxed">
                  O SlotGold é fornecido "como está" e "conforme disponível", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a: precisão, confiabilidade, adequação a um propósito específico, não violação, ou funcionamento ininterrupto/livre de erros. Não garantimos que as plataformas listadas sejam legais em sua jurisdição.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Limitação de Responsabilidade</h2>
                <p className="text-text-secondary leading-relaxed">
                  Em nenhuma hipótese o SlotGold, seus diretores, funcionários ou afiliados serão responsáveis por danos diretos, indiretos, incidentais, consequenciais ou punitivos (incluindo perda de lucros, dados, uso ou boa vontade) decorrentes do uso ou incapacidade de usar nosso site, ou de qualquer plataforma acessada através de nossos links.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Propriedade Intelectual</h2>
                <p className="text-text-secondary leading-relaxed">
                  Todo o conteúdo do SlotGold (textos, análises, design, logotipos, código) é de nossa propriedade ou licenciado para nós. Marcas de terceiros (plataformas, provedores de jogos) pertencem a seus respectivos proprietários e são usadas apenas para fins identificativos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Modificações dos Termos</h2>
                <p className="text-text-secondary leading-relaxed">
                  Podemos atualizar estes Termos a qualquer momento. Alterações materiais serão comunicadas através do site. O uso contínuo após as alterações constitui aceitação dos novos termos. Recomendamos revisar periodicamente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Lei Aplicável e Jurisdição</h2>
                <p className="text-text-secondary leading-relaxed">
                  Estes Termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão resolvidas nos tribunais competentes do foro da comarca de São Paulo/SP, com renúncia a qualquer outro, por mais privilegiado que seja.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">11. Contato</h2>
                <p className="text-text-secondary leading-relaxed">
                  Dúvidas sobre estes Termos? Entre em contato: <a href="mailto:claudioramalho1234@gmail.com" className="text-gold-primary hover:underline">claudioramalho1234@gmail.com</a>
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