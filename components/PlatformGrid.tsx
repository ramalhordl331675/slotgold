"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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

interface PlatformGridProps {
  platforms: Platform[];
}

type FilterOption = "todas" | "destaques" | "melhor-avaliadas" | "com-bonus";
type SortOption = "relevancia" | "avaliacao" | "nome";

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "destaques", label: "Destaques" },
  { value: "melhor-avaliadas", label: "Melhor avaliadas" },
  { value: "com-bonus", label: "Com bônus" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "avaliacao", label: "Maior avaliação" },
  { value: "nome", label: "Nome (A-Z)" },
];

function getFilteredPlatforms(
  platforms: Platform[],
  search: string,
  filter: FilterOption
): Platform[] {
  const normalizedSearch = search.toLowerCase().trim();

  return platforms.filter((p) => {
    const matchesSearch =
      normalizedSearch === "" ||
      p.name.toLowerCase().includes(normalizedSearch);

    const matchesFilter = (() => {
      switch (filter) {
        case "destaques":
          return p.is_featured === true;
        case "melhor-avaliadas":
          return p.rating !== null && p.rating > 0;
        case "com-bonus":
          return p.bonus_text !== null && p.bonus_text !== "";
        default:
          return true;
      }
    })();

    return matchesSearch && matchesFilter;
  });
}

function getSortedPlatforms(
  platforms: Platform[],
  sort: SortOption
): Platform[] {
  const sorted = [...platforms];
  switch (sort) {
    case "avaliacao":
      return sorted.sort((a, b) => {
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        return ratingB - ratingA;
      });
    case "nome":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export default function PlatformGrid({ platforms }: PlatformGridProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterOption>("todas");
  const [sort, setSort] = useState<SortOption>("relevancia");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 150);
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  const filteredPlatforms = useMemo(
    () => getFilteredPlatforms(platforms, debouncedSearch, filter),
    [platforms, debouncedSearch, filter]
  );

  const sortedPlatforms = useMemo(
    () => getSortedPlatforms(filteredPlatforms, sort),
    [filteredPlatforms, sort]
  );

  const handleClearSearch = useCallback(() => {
    setSearch("");
    searchInputRef.current?.focus();
  }, []);

  const handleClearAll = useCallback(() => {
    setSearch("");
    setFilter("todas");
    setSort("relevancia");
    searchInputRef.current?.focus();
  }, []);

  return (
    <section id="plataformas" className="py-16 sm:py-24 lg:py-32" aria-labelledby="platforms-title">
      <div className="container-page">
        <div className="mb-8">
          <h2 id="platforms-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            ENCONTRE SUA PLATAFORMA
          </h2>
          <p className="text-text-secondary max-w-xl">
            Explore as plataformas disponíveis no SlotGold e encontre a opção que mais combina com você.
          </p>
        </div>

        <div className="platform-search-bar" role="search" aria-label="Buscar plataformas">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              className="search-input"
              placeholder="Buscar plataforma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar plataforma por nome"
            />
            {search && (
              <button
                className="search-clear"
                onClick={handleClearSearch}
                aria-label="Limpar busca"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="platform-controls">
          <div className="filter-tabs" role="tablist" aria-label="Filtrar plataformas">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                role="tab"
                aria-selected={filter === option.value}
                aria-pressed={filter === option.value}
                className={`filter-tab ${filter === option.value ? "active" : ""}`}
                onClick={() => setFilter(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="sort-wrapper">
            <label htmlFor="platform-sort" className="sr-only">
              Ordenar plataformas
            </label>
            <select
              id="platform-sort"
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Ordenar plataformas"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg className="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="platform-results-info" aria-live="polite">
          <span className="results-count">
            {sortedPlatforms.length} {sortedPlatforms.length === 1 ? "plataforma" : "plataformas"} encontrada{sortedPlatforms.length !== 1 ? "s" : ""}
          </span>
        </div>

        {sortedPlatforms.length === 0 ? (
          <div className="platform-empty" role="status">
            <div className="platform-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className="platform-empty-title">Nenhuma plataforma encontrada</h3>
            <p className="platform-empty-description">
              Experimente alterar sua busca ou remover alguns filtros.
            </p>
            <button className="btn-gold" onClick={handleClearAll} type="button">
              Limpar filtros
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="platform-grid" role="list" aria-label="Lista de plataformas">
            {sortedPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}