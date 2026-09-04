import { getLogoUrl } from "../actions";
import IdentidadeVisualClient from "./IdentidadeVisualClient";

export default async function IdentidadeVisualPage() {
  const { url: logoUrl } = await getLogoUrl();
  return <IdentidadeVisualClient initialLogoUrl={logoUrl} />;
}