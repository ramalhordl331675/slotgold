"use client";

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

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <article
      className={`platform-card ${platform.is_featured ? "featured" : ""}`}
      role="listitem"
    >
      {platform.is_featured && (
        <div className="card-featured-top" aria-hidden="true" />
      )}
      {platform.is_featured && (
        <div className="card-badge">
          <span className="badge-destaque">
            <svg className="badge-destaque-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Destaque
          </span>
        </div>
      )}

      <div className="card-header">
        {platform.logo_url && (
          <div className="card-logo-wrapper">
            <img
              src={platform.logo_url}
              alt={`Logo de ${platform.name}`}
              className="card-logo"
              loading="lazy"
              width={56}
              height={56}
            />
          </div>
        )}
        <div className="card-info">
          <h3 className="card-name">{platform.name}</h3>
          {platform.rating !== null && (
            <div className="card-rating" aria-label={`${platform.rating.toFixed(1)} de 5 estrelas`}>
              <div className="stars" role="img" aria-label={`${platform.rating.toFixed(1)} estrelas`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`star ${i < Math.round(platform.rating!) ? "filled" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="rating-value">{platform.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {platform.description && (
        <p className="card-description">{platform.description}</p>
      )}

      {platform.bonus_text && (
        <div className="card-bonus" aria-label={`Bônus: ${platform.bonus_text}`}>
          <span className="bonus-icon" aria-hidden="true">🎁</span>
          <p className="bonus-text">{platform.bonus_text}</p>
        </div>
      )}

      <a
        href={platform.affiliate_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold card-cta w-full"
        aria-label={`Acessar ${platform.name} - abre em nova aba`}
      >
        Visitar plataforma
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </article>
  );
}