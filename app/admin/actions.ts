"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const ALLOWED_LOGO_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB
const LOGO_BUCKET = "admin-assets";
const LOGO_PATH = "logo";

export async function uploadLogo(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado" };
  }

  const role = (user!.app_metadata?.role as string | undefined) ?? "";
  if (role !== "admin") {
    return { error: "Acesso negado: função administrativa requerida" };
  }

  const file = formData.get("logo") as File;
  if (!file || file.size === 0) {
    return { error: "Nenhum arquivo selecionado" };
  }

  if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
    return { error: "Formato inválido. Use PNG, JPG, JPEG ou WebP" };
  }

  if (file.size > MAX_LOGO_SIZE) {
    return { error: "Arquivo muito grande. Máximo 2MB" };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${LOGO_PATH}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(LOGO_BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    if (uploadError.message.includes("Bucket not found")) {
      return { error: "Bucket de armazenamento não configurado. Crie o bucket 'admin-assets' no Supabase Storage." };
    }
    return { error: uploadError.message };
  }

  const { data: urlData } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(fileName);
  const publicUrl = urlData.publicUrl;

  revalidatePath("/admin");
  revalidatePath("/admin/identidade-visual");
  return { success: true, url: publicUrl };
}

export async function removeLogo() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado" };
  }

  const role = (user!.app_metadata?.role as string | undefined) ?? "";
  if (role !== "admin") {
    return { error: "Acesso negado: função administrativa requerida" };
  }

  const { error: listError } = await supabase.storage.from(LOGO_BUCKET).list(LOGO_PATH);

  if (!listError) {
    const files = await supabase.storage.from(LOGO_BUCKET).list("", {
      search: "logo",
    });
    if (files.data && files.data.length > 0) {
      const fileNames = files.data.map((f) => f.name);
      await supabase.storage.from(LOGO_BUCKET).remove(fileNames);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/identidade-visual");
  return { success: true };
}

export async function getLogoUrl() {
  const supabase = await createClient();

  const { data: files } = await supabase.storage.from(LOGO_BUCKET).list("", {
    search: "logo",
  });

  if (files && files.length > 0) {
    const { data: urlData } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(files[0].name);
    return { url: urlData.publicUrl };
  }

  return { url: null };
}

export async function deletePlatform(platformId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado" };
  }

  const role = (user!.app_metadata?.role as string | undefined) ?? "";

  if (role !== "admin") {
    return { error: "Acesso negado: função administrativa requer role admin" };
  }

  const { error } = await supabase
    .from("platforms")
    .delete()
    .eq("id", platformId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function listPlatforms() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("platforms")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createPlatform(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado" };
  }

  const role = (user!.app_metadata?.role as string | undefined) ?? "";
  if (role !== "admin") {
    return { error: "Acesso negado: função administrativa requerida" };
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const logoUrl = formData.get("logo_url") as string;
  const description = formData.get("description") as string;
  const affiliateUrl = formData.get("affiliate_url") as string;
  const bonusText = formData.get("bonus_text") as string;
  const rating = formData.get("rating") as string;
  const isFeatured = formData.get("is_featured") === "on";
  const isActive = formData.get("is_active") !== "off";
  const position = formData.get("position") as string;

  if (!name?.trim()) {
    return { error: "Nome é obrigatório" };
  }

  const finalSlug = slug?.trim() || generateSlug(name);
  if (!finalSlug) {
    return { error: "Slug não pôde ser gerado. Informe um nome válido ou preencha o slug manualmente." };
  }

  if (!affiliateUrl?.trim()) {
    return { error: "URL de afiliado é obrigatória" };
  }
  if (!isValidHttpUrl(affiliateUrl.trim())) {
    return { error: "URL de afiliado deve ser HTTP ou HTTPS válida" };
  }

  const ratingValue = rating?.trim() ? parseFloat(rating) : null;
  if (ratingValue !== null && (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5)) {
    return { error: "Avaliação deve ser um número entre 0 e 5" };
  }

  const positionValue = position?.trim() ? parseInt(position, 10) : 0;
  if (isNaN(positionValue)) {
    return { error: "Posição deve ser um número inteiro" };
  }

  const { error } = await supabase.from("platforms").insert({
    name: name.trim(),
    slug: finalSlug,
    logo_url: logoUrl?.trim() || null,
    description: description?.trim() || null,
    affiliate_url: affiliateUrl.trim(),
    bonus_text: bonusText?.trim() || null,
    rating: ratingValue,
    is_featured: isFeatured,
    is_active: isActive,
    position: positionValue,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe uma plataforma com este slug" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function updatePlatform(platformId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Usuário não autenticado" };
  }

  const role = (user!.app_metadata?.role as string | undefined) ?? "";
  if (role !== "admin") {
    return { error: "Acesso negado: função administrativa requerida" };
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const logoUrl = formData.get("logo_url") as string;
  const description = formData.get("description") as string;
  const affiliateUrl = formData.get("affiliate_url") as string;
  const bonusText = formData.get("bonus_text") as string;
  const rating = formData.get("rating") as string;
  const isFeatured = formData.get("is_featured") === "on";
  const isActive = formData.get("is_active") !== "off";
  const position = formData.get("position") as string;

  if (!name?.trim()) {
    return { error: "Nome é obrigatório" };
  }

  const finalSlug = slug?.trim() || generateSlug(name);
  if (!finalSlug) {
    return { error: "Slug não pôde ser gerado. Informe um nome válido ou preencha o slug manualmente." };
  }

  if (!affiliateUrl?.trim()) {
    return { error: "URL de afiliado é obrigatória" };
  }
  if (!isValidHttpUrl(affiliateUrl.trim())) {
    return { error: "URL de afiliado deve ser HTTP ou HTTPS válida" };
  }

  const ratingValue = rating?.trim() ? parseFloat(rating) : null;
  if (ratingValue !== null && (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5)) {
    return { error: "Avaliação deve ser um número entre 0 e 5" };
  }

  const positionValue = position?.trim() ? parseInt(position, 10) : 0;
  if (isNaN(positionValue)) {
    return { error: "Posição deve ser um número inteiro" };
  }

  const { error } = await supabase
    .from("platforms")
    .update({
      name: name.trim(),
      slug: finalSlug,
      logo_url: logoUrl?.trim() || null,
      description: description?.trim() || null,
      affiliate_url: affiliateUrl.trim(),
      bonus_text: bonusText?.trim() || null,
      rating: ratingValue,
      is_featured: isFeatured,
      is_active: isActive,
      position: positionValue,
    })
    .eq("id", platformId);

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe uma plataforma com este slug" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}