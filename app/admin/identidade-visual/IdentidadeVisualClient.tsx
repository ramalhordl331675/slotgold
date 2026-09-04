"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { uploadLogo, removeLogo } from "../actions";

interface IdentidadeVisualClientProps {
  initialLogoUrl: string | null;
}

export default function IdentidadeVisualClient({ initialLogoUrl }: IdentidadeVisualClientProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
      e.target.value = "";
    }
  };

  const handleFileUpload = async (file: File) => {
    setError(null);
    setSuccess(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("logo", file);

    const result = await uploadLogo(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Logo enviado com sucesso!");
      setLogoUrl(result.url || null);
      setPreviewUrl(result.url || null);
    }
    setUploading(false);
  };

  const handleRemoveLogo = async () => {
    setError(null);
    setSuccess(null);
    setRemoving(true);

    const result = await removeLogo();

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Logo removido. O logo padrão será usado.");
      setLogoUrl(null);
      setPreviewUrl(null);
    }
    setRemoving(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    input?.click();
  };

  return (
    <section className="space-y-6">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Identidade Visual</h2>
      </div>

      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-admin-text mb-4">Logo do Painel</h3>
        <p className="text-admin-text-muted text-sm mb-6">
          O logo será exibido no cabeçalho do painel administrativo e na página de login. Formatos aceitos: PNG, JPG, JPEG, WebP. Tamanho máximo: 2MB.
        </p>

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

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                className={`admin-dropzone ${dragOver ? "drag-over" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="logo-upload"
                  disabled={uploading || removing}
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="w-12 h-12 mx-auto rounded-full bg-admin-accent-light flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-admin-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-admin-text font-medium">Clique ou arraste o arquivo aqui</p>
                  <p className="text-sm text-admin-text-muted mt-1">PNG, JPG, JPEG ou WebP · Máx. 2MB</p>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t admin-border">
                <button
                  type="submit"
                  disabled={uploading || removing}
                  className="admin-btn-primary px-6 py-2"
                >
                  {uploading ? (
                    <>
                      <svg className="admin-spinner mr-2" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar logo"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-admin-text">Prévia</h4>
            {logoUrl ? (
              <div className="space-y-3">
                <div className="p-4 bg-admin-input-bg border admin-border rounded-lg">
                  <img
                    src={logoUrl}
                    alt="Prévia do logo"
                    className="admin-preview-img mx-auto"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    disabled={removing || uploading}
                    className="admin-btn-danger px-4 py-2 flex items-center gap-2"
                  >
                    {removing ? (
                      <>
                        <svg className="admin-spinner mr-2" aria-hidden="true" />
                        Removendo...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remover logo
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-admin-input-bg border admin-border rounded-lg">
                <svg className="w-12 h-12 mx-auto text-admin-border mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-admin-text-muted">Nenhum logo enviado</p>
                <p className="text-xs text-admin-text-muted mt-1">O logo padrão (SG) será exibido</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-admin-text mb-4">Como funciona</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 bg-admin-input-bg border admin-border rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-admin-accent-light flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-admin-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-medium text-admin-text mb-1">Upload Simples</h4>
            <p className="text-sm text-admin-text-muted">Arraste e solte ou clique para selecionar o arquivo do seu computador.</p>
          </div>
          <div className="p-4 bg-admin-input-bg border admin-border rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-admin-accent-light flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-admin-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-medium text-admin-text mb-1">Validação Automática</h4>
            <p className="text-sm text-admin-text-muted">Verifica formato, tamanho e tipo do arquivo antes do upload.</p>
          </div>
          <div className="p-4 bg-admin-input-bg border admin-border rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-admin-accent-light flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-admin-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-medium text-admin-text mb-1">Armazenamento Seguro</h4>
            <p className="text-sm text-admin-text-muted">Salvo no Supabase Storage com URL pública para uso imediato.</p>
          </div>
        </div>
      </div>
    </section>
  );
}