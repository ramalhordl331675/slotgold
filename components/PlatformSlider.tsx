"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PlatformCard from "./PlatformCard";

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

interface PlatformSliderProps {
  platforms: Platform[];
  className?: string;
}

export default function PlatformSlider({ platforms, className = "" }: PlatformSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const maxIndex = Math.max(0, platforms.length - cardsPerView);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex(Math.min(currentIndex, Math.max(0, platforms.length - cardsPerView)));
  }, [cardsPerView, platforms.length]);

  const startAutoplay = useCallback(() => {
    if (reduceMotion || isHovering || platforms.length <= cardsPerView) return;
    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
  }, [reduceMotion, isHovering, platforms.length, cardsPerView, maxIndex]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
      setTouchStart(null);
    }
  }, [touchStart, goPrev, goNext]);

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null);
  }, []);

  const cardWidth = 100 / cardsPerView;
  const translateX = -currentIndex * cardWidth;

  if (platforms.length === 0) {
    return (
      <div className="card-premium py-20 px-8 text-center" role="status">
        <svg className="mx-auto h-16 w-16 text-text-muted mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">Nenhuma plataforma disponível</h3>
        <p className="text-text-secondary">No momento não há plataformas cadastradas. Volte em breve para novidades.</p>
      </div>
    );
  }

  return (
    <section className={`py-16 sm:py-24 lg:py-32 ${className}`} aria-labelledby="platforms-title-slider">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 id="platforms-title-slider" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Plataformas <span className="text-gradient-gold">em destaque</span>
            </h2>
            <p className="mt-2 text-text-secondary max-w-md">
              Confira algumas das plataformas disponíveis no SlotGold.
            </p>
          </div>
        </div>

        <div
          className="slider-container"
          ref={sliderRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          role="region"
          aria-label="Carrossel de plataformas em destaque"
          aria-roledescription="carousel"
        >
          <button
            className="slider-btn prev"
            onClick={goPrev}
            aria-label="Plataforma anterior"
            disabled={platforms.length <= cardsPerView}
            tabIndex={platforms.length <= cardsPerView ? -1 : 0}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="slider-track"
            ref={trackRef}
            style={{ transform: `translateX(${translateX}%)` } as React.CSSProperties}
            role="list"
            aria-live="polite"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {platforms.map((platform) => (
              <div key={platform.id} className="slider-slide" style={{ flexBasis: `${cardWidth}%` } as React.CSSProperties}>
                <PlatformCard platform={platform} />
              </div>
            ))}
          </div>

          <button
            className="slider-btn next"
            onClick={goNext}
            aria-label="Próxima plataforma"
            disabled={platforms.length <= cardsPerView}
            tabIndex={platforms.length <= cardsPerView ? -1 : 0}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {platforms.length > cardsPerView && (
          <div
            className="slider-dots"
            role="tablist"
            aria-label="Navegação do carrossel"
          >
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                className={`slider-dot ${i === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(i)}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Ir para slide ${i + 1}`}
                tabIndex={i === currentIndex ? 0 : -1}
              >
                <span className="sr-only">Slide {i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}