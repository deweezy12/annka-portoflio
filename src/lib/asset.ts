/**
 * Resolves a repo-relative asset path against Vite's configured base URL.
 * Keeps image/asset references portable across different deployment targets
 * (root domain, GitHub Pages subpath, etc.) without hardcoding "/".
 */
export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanedPath = path.replace(/^\/+/, "");
  return cleanedPath ? `${normalizedBase}${cleanedPath}` : normalizedBase;
}

export function asset(path: string): string {
  return withBase(path);
}
