interface TrustSealProps {
  size?: "large" | "small";
  className?: string;
}

export default function TrustSeal({ size = "large", className = "" }: TrustSealProps) {
  const isLarge = size === "large";

  return (
    <div
      className={`trust-seal ${isLarge ? "trust-seal-large" : "trust-seal-small"} ${className}`}
      role="img"
      aria-label="Selo de confiança SlotGold — Confiança, Transparência e Responsabilidade"
    >
      <div className="trust-seal-badge" aria-hidden="true">
        <svg viewBox="0 0 64 64" className="trust-seal-shield">
          <path
            className="trust-seal-shield-bg"
            d="M32 4 L56 13 v18 c0 12-10 22-24 27 C18 53 8 43 8 31 V13 Z"
          />
          <path
            className="trust-seal-shield-border"
            d="M32 4 L56 13 v18 c0 12-10 22-24 27 C18 53 8 43 8 31 V13 Z"
          />
          <circle cx="32" cy="28" r="12" className="trust-seal-check-ring" />
          <path
            className="trust-seal-check"
            d="M26 28 l4.5 4.5 L39 23"
          />
        </svg>
      </div>
      <div className="trust-seal-text">
        <span className="trust-seal-wordmark">SLOTGOLD</span>
        <span className="trust-seal-tagline">
          {isLarge
            ? "Confiança • Transparência • Responsabilidade"
            : "Portal Seguro & Transparente"}
        </span>
      </div>
    </div>
  );
}
