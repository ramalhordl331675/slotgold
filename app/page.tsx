export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          SlotGold
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Portal de divulgação e comparação de plataformas de slots.
        </p>
        <span className="mt-2 rounded-full bg-amber-400/20 px-4 py-1 text-sm font-medium text-amber-700 dark:text-amber-300">
          Projeto base — em construção
        </span>
      </div>
    </main>
  );
}
