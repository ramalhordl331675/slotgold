"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { createPlatform, listPlatforms, deletePlatform, updatePlatform, uploadLogo, removeLogo } from "./actions";

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
  logo: string | null;
  logoUrl: string;
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
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [editorSuccess, setEditorSuccess] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    name: "",
    slug: "",
    logo: null,
    logoUrl: "",
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
    // Envia os campos esperados pelo createPlatform
    fd.append("name", formData.name);
    fd.append("slug", formData.slug);
    // Usa a URL fornecida manualmente se houver, senão usa o logo fazido upload
    fd.append("logo_url", formData.logoUrl ?? (formData.logo ?? ""));
    fd.append("description", formData.description);
    fd.append("affiliate_url", formData.affiliate_url);
    fd.append("bonus_text", formData.bonus_text);
    fd.append("rating", formData.rating);
    fd.append("is_featured", formData.is_featured ? "on" : "");
    fd.append("is_active", formData.is_active ? "on" : "");
    fd.append("position", formData.position);

    const result = await createPlatform(fd);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Plataforma cadastrada com sucesso!");
      setFormData({
        name: "",
        slug: "",
        logo: null,
        logoUrl: "",
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
      logo: null,
      logoUrl: "",
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

  const handleEditClick = (platform: Platform) => {
    setEditingPlatform(platform);
    setEditorError(null);
    setEditorSuccess(null);
    setFormData({
      name: platform.name,
      slug: platform.slug,
      logo: null,
      logoUrl: platform.logo_url || "",
      description: platform.description || "",
      affiliate_url: platform.affiliate_url,
      bonus_text: platform.bonus_text || "",
      rating: platform.rating?.toString() || "",
      is_featured: platform.is_featured,
      is_active: platform.is_active,
      position: platform.position.toString(),
    });
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

  const handleConfirmEdit = async () => {
    if (!editingPlatform) return;

    setEditorError(null);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("slug", formData.slug);
    fd.append("logo_url", formData.logoUrl ?? (formData.logo ?? ""));
    fd.append("description", formData.description);
    fd.append("affiliate_url", formData.affiliate_url);
    fd.append("bonus_text", formData.bonus_text);
    fd.append("rating", formData.rating);
    fd.append("is_featured", formData.is_featured ? "on" : "");
    fd.append("is_active", formData.is_active ? "on" : "");
    fd.append("position", formData.position);

    const result = await updatePlatform(editingPlatform.id, fd);

    if (result.error) {
      setEditorError(result.error);
    } else {
      setEditorSuccess(`Plataforma "${editingPlatform.name}" atualizada com sucesso!`);
      setEditingPlatform(null);
      const fresh = await listPlatforms();
      setPlatforms(fresh as Platform[]);
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setEditingPlatform(null);
    setEditorError(null);
    setEditorSuccess(null);
    setFormData({
      name: "",
      slug: "",
      logo: null,
      logoUrl: "",
      description: "",
      affiliate_url: "",
      bonus_text: "",
      rating: "",
      is_featured: false,
      is_active: true,
      position: "0",
    });
  };

  const handleCancelDelete = () => {
    setPlatformToDelete(null);
    setDeleteError(null);
  };

  return (
    <section className="space-y-6">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Plataformas</h2>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="admin-btn-primary"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar plataforma
        </button>
      </div>

      {deleteSuccess && (
        <div className="admin-alert admin-alert-success" role="status">
          {deleteSuccess}
        </div>
      )}

      {deleteError && (
        <div className="admin-alert admin-alert-error" role="alert">
          {deleteError}
        </div>
      )}

      {platformToDelete && (
        <div className="admin-card p-6 border-admin-error-border">
          <h3 className="text-lg font-medium text-admin-error mb-2">Confirmar exclusão</h3>
          <p className="text-sm text-admin-text-muted mb-4">
            Tem certeza que deseja excluir a plataforma <strong>{platformToDelete.name}</strong> (slug: {platformToDelete.slug})?
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelDelete}
              disabled={deleting}
              className="admin-btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="admin-btn-danger"
            >
              {deleting ? "Excluindo..." : "Confirmar exclusão"}
            </button>
          </div>
        </div>
      )}

      {editingPlatform && (
        <div className="admin-card p-6 border-admin-warning-border">
          <h3 className="text-lg font-medium text-admin-warning mb-2">Confirmar edição</h3>
          <p className="text-sm text-admin-text-muted mb-4">
            Tem certeza que deseja editar a plataforma <strong>{editingPlatform.name}</strong> (slug: {editingPlatform.slug})?
            Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={!!editorError}
              className="admin-btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmEdit}
              disabled={!!editorError}
              className="admin-btn-primary"
            >
              {editingPlatform.name}
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-admin-text mb-4">Nova plataforma</h3>
          {error && (
            <div className="admin-alert admin-alert-error mb-4" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="admin-alert admin-alert-success mb-4" role="status">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="admin-form-group">
                <label htmlFor="name" className="admin-label">
                  Nome <span className="text-admin-error">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                  className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                  placeholder="Ex: Super Slots"
                />
              </div>
              <div className="admin-form-group">
                <label htmlFor="slug" className="admin-label">
                  Slug <span className="text-admin-error">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                  placeholder="super-slots"
                />
                <p className="mt-1 text-xs text-admin-text-muted">Gerado automaticamente a partir do nome. Pode ser editado.</p>
              </div>
            </div>

<div className="admin-form-group">
                <label htmlFor="description" className="admin-label">Descrição (opcional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="admin-input w-full px-3 py-2 text-sm placeholder-admin-text-muted resize-y"
                  placeholder="Descrição curta da plataforma..."
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="logo-url" className="admin-label">URL do Logo (opcional)</label>
                <input
                  type="text"
                  id="logo-url"
                  value={formData.logoUrl || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="https://exemplo.com/logo.png"
                  className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                />
                <p className="mt-1 text-xs text-admin-text-muted">Deixe em branco para fazer upload de arquivo. URLs PNG, JPG, JPEG ou WebP · Máx. 2MB</p>
              </div>

              <div className="admin-form-group">
                <div id="logo-upload-area">
                  {formData.logo ? (
                    <div className="admin-card p-4 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.logo}
                          alt="Logo da plataforma"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-admin-text">
                            {formData.logo.split("/").pop()}
                          </p>
                          <p className="text-xs text-admin-text-muted">
                            Clique para substituir ou remover
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, logo: null }))}
                          className="admin-btn-danger px-3 py-1 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="admin-card p-4 mb-3 border border-admin-border cursor-pointer"
                      onClick={() => document.getElementById("logo-input")?.click()}
                    >
                      <div className="flex items-center justify-center h-24 rounded-lg bg-admin-input-bg">
                        <svg
                          className="w-8 h-8 text-admin-text-muted"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <p className="mt-2 text-admin-text-muted">Adicionar logo</p>
                        <p className="text-xs text-admin-text-muted">PNG, JPG, JPEG ou WebP · Máx. 2MB</p>
                      </div>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        id="logo-input"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formDataTemp = new FormData();
                            formDataTemp.append("logo", file);
                            uploadLogo(formDataTemp).then((result) => {
                              if (result.success) {
                                setFormData((prev) => ({
                                  ...prev,
                                  logo: result.url || null,
                                }));
                                setSuccess("Logo enviado com sucesso!");
                              } else {
                                setError(result.error || "Erro ao fazer upload");
                              }
                            });
                            e.target.value = "";
                          }
                        }}
                        />
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor="affiliate_url" className="admin-label">
                URL de Afiliado <span className="text-admin-error">*</span>
              </label>
              <input
                type="url"
                id="affiliate_url"
                name="affiliate_url"
                value={formData.affiliate_url}
                onChange={handleChange}
                required
                className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                placeholder="https://parceiro.com/tracking?id=123"
              />
              <p className="mt-1 text-xs text-admin-text-muted">Apenas URLs HTTP/HTTPS válidas. Será validada no servidor.</p>
            </div>

            <div className="admin-form-group">
              <label htmlFor="bonus_text" className="admin-label">Texto do Bônus (opcional)</label>
              <input
                type="text"
                id="bonus_text"
                name="bonus_text"
                value={formData.bonus_text}
                onChange={handleChange}
                className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                placeholder="Ex: 100% até R$ 500 + 50 giros grátis"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="admin-form-group">
                <label htmlFor="rating" className="admin-label">Avaliação (0-5, opcional)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                  placeholder="4.5"
                />
              </div>
              <div className="admin-form-group">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-admin-border text-admin-accent focus:ring-admin-accent"
                  />
                  <span className="text-sm text-admin-text">Destaque</span>
                </label>
              </div>
              <div className="admin-form-group">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-admin-border text-admin-accent focus:ring-admin-accent"
                  />
                  <span className="text-sm text-admin-text">Ativo</span>
                </label>
              </div>
              <div className="admin-form-group">
                <label htmlFor="position" className="admin-label">Posição</label>
                <input
                  type="number"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  min="0"
                  className="admin-input w-full h-10 px-3 text-sm placeholder-admin-text-muted"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t admin-border">
              <button
                type="button"
                onClick={handleCancel}
                className="admin-btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="admin-btn-primary"
              >
                {loading ? (
                  <>
                    <svg className="admin-spinner mr-2" aria-hidden="true" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-container">
        {platforms.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 mx-auto text-admin-border mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <p className="text-admin-text-muted mb-1">Nenhuma plataforma cadastrada.</p>
            <p className="text-sm text-admin-text-muted">Clique em "Adicionar plataforma" para criar a primeira.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Destaque</th>
                <th>Avaliação</th>
                <th>Posição</th>
                <th style={{ width: "100px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((platform) => (
                <tr key={platform.id}>
                  <td>
                    <div className="font-medium text-admin-text">{platform.name}</div>
                    <div className="text-xs text-admin-text-muted">Slug: {platform.slug}</div>
                  </td>
                  <td>
                    <span className={`admin-badge ${platform.is_active ? "admin-badge-success" : "admin-badge-error"}`}>
                      {platform.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${platform.is_featured ? "admin-badge-warning" : "admin-badge-neutral"}`}>
                      {platform.is_featured ? "Sim" : "Não"}
                    </span>
                  </td>
                  <td className="text-admin-text">
                    {platform.rating !== null ? platform.rating.toFixed(1) : "—"}
                  </td>
                  <td className="text-admin-text">{platform.position}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditClick(platform)}
                        className="text-sm font-medium text-admin-accent hover:text-admin-primary transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(platform)}
                        disabled={deleting || platformToDelete !== null}
                        className="text-sm font-medium text-admin-error hover:text-admin-danger transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}