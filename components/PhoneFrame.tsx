interface PhoneFrameProps {
  children: React.ReactNode;
}

/**
 * Moldura 9:16 (retrato, estilo tela de celular) para o site público.
 *
 * - Em telas < 768px o conteúdo ocupa 100% da largura (experiência mobile atual).
 * - Em telas >= 768px o conteúdo fica centralizado numa coluna estreita com
 *   largura = altura disponível * 9 / 16, com fundo neutro nas laterais.
 * - O container é um CSS container (`container-type: inline-size`), então os
 *   ajustes internos usam unidades `cqw` (proporcionais à moldura).
 */
export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="phone-frame-page">
      <div className="phone-frame">{children}</div>
    </div>
  );
}
