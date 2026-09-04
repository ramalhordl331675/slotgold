"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { href: "#plataformas", label: "Plataformas" },
  { href: "#sobre", label: "Sobre" },
  { href: "#jogo-responsavel", label: "Jogo Responsável" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
  { href: "#blog", label: "Blog", disabled: true },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (!mounted) {
    return (
      <header className="header-base" aria-label="Cabeçalho do SlotGold">
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white" aria-hidden="true">SlotGold</span>
              <span className="hidden sm:inline-flex h-5 w-px bg-gradient-gold" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium text-gold-primary tracking-wider">Portal de Comparação</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`header-base sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "header-scrolled" : ""
      }`}
      role="banner"
      aria-label="Cabeçalho do SlotGold"
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="SlotGold - Início"
            onClick={closeMobileMenu}
          >
            <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
              <svg
                className="h-8 w-8 text-gold-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold-primary animate-pulse" />
            </span>
            <div className="hidden sm:block text-left">
              <span className="text-xl font-bold tracking-tight text-white block">SlotGold</span>
              <span className="text-[10px] font-medium text-gold-primary tracking-wider uppercase block">Portal de Comparação</span>
            </div>
          </Link>

          <nav
            className={`header-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}
            aria-label="Navegação principal"
            role="navigation"
          >
            <ul className="flex flex-col md:flex-row items-center gap-1 md:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.disabled ? (
                    <span
                      className="nav-link disabled"
                      aria-disabled="true"
                      title="Em desenvolvimento"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className="nav-link"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            <a
              href="/admin/login"
              className="btn-gold hidden sm:inline-flex px-5 py-2 text-sm"
              onClick={closeMobileMenu}
            >
              Entrar / Admin
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </a>

            <button
              className="mobile-menu-btn md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              id="mobile-menu-button"
            >
              <span className="sr-only">{isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-border-subtle animate-slide-down"
            role="region"
            aria-label="Menu mobile"
          >
            <nav aria-label="Navegação mobile">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {item.disabled ? (
                      <span className="nav-link mobile disabled" aria-disabled="true">
                        {item.label}
                      </span>
                    ) : (
                      <a
                        href={item.href}
                        className="nav-link mobile"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
                <li className="pt-2 border-t border-border-subtle">
                  <a
                    href="/admin/login"
                    className="btn-gold w-full justify-center py-3"
                    onClick={closeMobileMenu}
                  >
                    Entrar / Admin
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}