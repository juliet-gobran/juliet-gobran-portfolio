export function formatDisplayUrl(url: string): string {
  const withoutProtocol = url.replace(/^https?:\/\//, "");
  const withoutWww = withoutProtocol.replace(/^www\./, "");
  return withoutWww.replace(/\/$/, "");
}
