export function api(path: string, init?: RequestInit) {
  const baseUrl = process.env.API_URL || 'http://localhost:3000';
  const apiPrefix = '/api';
  const url = new URL(apiPrefix.concat(path), baseUrl);

  return fetch(url, init);
}
