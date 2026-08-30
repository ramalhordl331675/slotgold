import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { ok: false, connected: false, error: error.message },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ok: true,
      connected: true,
      message: "Conexão com o Supabase estabelecida com sucesso.",
      session: data.session ? "ativa" : null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { ok: false, connected: false, error: message },
      { status: 200 }
    );
  }
}
