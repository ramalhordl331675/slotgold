"use client";

import { useState, useEffect } from "react";

export default function ActivityNotification() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handler = () => setIsVisible(false);
    const handlerShow = () => setIsVisible(true);
    window.addEventListener("mouseleave", handler);
    window.addEventListener("mouseenter", handlerShow);
    return () => {
      window.removeEventListener("mouseleave", handler);
      window.removeEventListener("mouseenter", handlerShow);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="activity-notification"
      role="alert"
      aria-live="polite"
      aria-label="Notificação de atividade"
      onMouseEnter={() => setIsVisible(false)}
      onMouseLeave={() => setIsVisible(true)}
    >
      <div className="activity-notification-inner">
        <span className="activity-notification-icon" aria-hidden="true">🟢</span>
        <div className="activity-notification-content">
          <span className="activity-notification-title">Usuário ativo</span>
          <span className="activity-notification-message">Pedro entrou na plataforma</span>
        </div>
      </div>
    </div>
  );
}