export function api(path: string, init?: RequestInit) {
  const apiPrefix = "/api";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const apiUrl = `${baseUrl}${apiPrefix}${path}`;

  return fetch(apiUrl, init);
}
