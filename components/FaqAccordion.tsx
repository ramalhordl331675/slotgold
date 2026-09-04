"use client";

import { useState, useId } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "O que é o SlotGold?",
    answer:
      "O SlotGold é um portal que reúne informações sobre diferentes plataformas de slots, ajudando visitantes a descobrir e comparar opções disponíveis.",
  },
  {
    question: "Como encontrar uma plataforma?",
    answer:
      "Você pode navegar pelas plataformas em destaque ou utilizar a busca e os filtros disponíveis na área de plataformas.",
  },
  {
    question: "O SlotGold oferece jogos?",
    answer:
      "O SlotGold funciona como um portal de divulgação e descoberta. As informações apresentadas ajudam o visitante a conhecer as plataformas, enquanto a utilização dos serviços ocorre nos respectivos sites.",
  },
  {
    question: "As plataformas são recomendadas pelo SlotGold?",
    answer:
      "As plataformas apresentadas são organizadas para facilitar a descoberta e comparação. As informações devem ser avaliadas pelo próprio visitante antes de qualquer decisão.",
  },
  {
    question: "O jogo envolve riscos?",
    answer:
      "Sim. Jogos de azar podem envolver perdas financeiras. Por isso, é importante jogar com responsabilidade, estabelecer limites e nunca utilizar dinheiro necessário para despesas essenciais.",
  },
  {
    question: "Como entrar em contato com o SlotGold?",
    answer:
      "Utilize a seção de contato disponível no site para enviar sua mensagem.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-list" role="list">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        const questionId = `${baseId}-q-${index}`;
        const answerId = `${baseId}-a-${index}`;

        return (
          <div
            key={index}
            className={`faq-item${isOpen ? " open" : ""}`}
            role="listitem"
          >
            <h3>
              <button
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="faq-question"
                onClick={() => toggle(index)}
                type="button"
              >
                <span>{item.question}</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              className={`faq-answer-wrapper${isOpen ? " open" : ""}`}
            >
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
