"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { createPlatform, listPlatforms, deletePlatform } from "./actions";

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

interface FormState {
  name: string;
  slug: string;
  logo_url: string;
  description: string;
  affiliate_url: string;
  bonus_text: string;
  rating: string;
  is_featured: boolean;
  is_active: boolean;
  position: string;
}

export default function PlatformsSection({ initialPlatforms }: { initialPlatforms: Platform[] }) {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [platformToDelete, setPlatformToDelete] = useState<Platform | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    slug: "",
    logo_url: "",
    description: "",
    affiliate_url: "",
    bonus_text: "",
    rating: "",
    is_featured: false,
    is_active: true,
    position: "0",
  });

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentSlug = generateSlug(formData.name);
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: prev.slug === currentSlug || prev.slug === "" ? generateSlug(value) : prev.slug,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        fd.append(key, value ? "on" : "");
      } else {
        fd.append(key, value);
      }
    });

    const result = await createPlatform(fd);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Plataforma cadastrada com sucesso!");
      setFormData({
        name: "",
        slug: "",
        logo_url: "",
        description: "",
        affiliate_url: "",
        bonus_text: "",
        rating: "",
        is_featured: false,
        is_active: true,
        position: "0",
      });
      setShowForm(false);
      const fresh = await listPlatforms();
      setPlatforms(fresh as Platform[]);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setError(null);
    setSuccess(null);
    setFormData({
      name: "",
      slug: "",
      logo_url: "",
      description: "",
      affiliate_url: "",
      bonus_text: "",
      rating: "",
      is_featured: false,
      is_active: true,
      position: "0",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDeleteClick = (platform: Platform) => {
    setPlatformToDelete(platform);
    setDeleteError(null);
    setDeleteSuccess(null);
  };

  const handleConfirmDelete = async () => {
    if (!platformToDelete) return;

    setDeleting(true);
    setDeleteError(null);

    const result = await deletePlatform(platformToDelete.id);

    if (result.error) {
      setDeleteError(result.error);
    } else {
      setDeleteSuccess(`Plataforma "${platformToDelete.name}" excluída com sucesso!`);
      setPlatformToDelete(null);
      const fresh = await listPlatforms();
      setPlatforms(fresh as Platform[]);
    }
    setDeleting(false);
  };

  const handleCancelDelete = () => {
    setPlatformToDelete(null);
    setDeleteError(null);
  };

  return (
    <section className="w-full max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Plataformas</h2>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="h-10 px-4 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Adicionar plataforma
        </button>
      </div>

      {deleteSuccess && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300" role="status">
          {deleteSuccess}
        </div>
      )}

      {deleteError && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
          {deleteError}
        </div>
      )}

      {platformToDelete && (
        <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-800 dark:bg-zinc-900">
          <h3 className="text-lg font-medium text-red-900 dark:text-red-100">Confirmar exclusão</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Tem certeza que deseja excluir a plataforma <strong>{platformToDelete.name}</strong> (slug: {platformToDelete.slug})?
            Esta ação não pode ser desfeita.
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelDelete}
              disabled={deleting}
              className="h-10 px-4 rounded-lg border border-zinc-300 bg-white text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="h-10 px-4 rounded-lg bg-red-600 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-700 dark:hover:bg-red-800"
            >
              {deleting ? "Excluindo..." : "Confirmar exclusão"}
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">Nova plataforma</h3>
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300" role="status">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  placeholder="Ex: Super Slots"
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  placeholder="super-slots"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Gerado automaticamente a partir do nome. Pode ser editado.</p>
              </div>
            </div>

            <div>
              <label htmlFor="logo_url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                URL do Logo (opcional)
              </label>
              <input
                type="url"
                id="logo_url"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="https://exemplo.com/logo.png"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Descrição (opcional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="Descrição curta da plataforma..."
              />
            </div>

            <div>
              <label htmlFor="affiliate_url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                URL de Afiliado <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="affiliate_url"
                name="affiliate_url"
                value={formData.affiliate_url}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="https://parceiro.com/tracking?id=123"
              />
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Apenas URLs HTTP/HTTPS válidas. Será validada no servidor.</p>
            </div>

            <div>
              <label htmlFor="bonus_text" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Texto do Bônus (opcional)
              </label>
              <input
                type="text"
                id="bonus_text"
                name="bonus_text"
                value={formData.bonus_text}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="Ex: 100% até R$ 500 + 50 giros grátis"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Avaliação (0-5, opcional)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  placeholder="4.5"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 dark:border-zinc-600"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Destaque</span>
                </label>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 dark:border-zinc-600"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Ativo</span>
                </label>
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Posição
                </label>
                <input
                  type="number"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCancel}
                className="h-10 px-4 rounded-lg border border-zinc-300 bg-white text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="h-10 px-4 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {platforms.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">Nenhuma plataforma cadastrada.</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">Clique em &quot;Adicionar plataforma&quot; para criar a primeira.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Destaque</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Avaliação</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Posição</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {platforms.map((platform) => (
                  <tr key={platform.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">{platform.name}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">Slug: {platform.slug}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          platform.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {platform.is_active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          platform.is_featured
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {platform.is_featured ? "Sim" : "Não"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">
                      {platform.rating !== null ? platform.rating.toFixed(1) : "\u2014"}
                    </td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{platform.position}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(platform)}
                        disabled={deleting || platformToDelete !== null}
                        className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}