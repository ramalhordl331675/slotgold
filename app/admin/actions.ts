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
