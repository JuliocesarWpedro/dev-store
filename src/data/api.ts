export function api(path: string, init?: RequestInit) {
  const apiPrefix = '/api';
  const baseUrl = 'http://127.0.0.1:3000';
  const url = `${baseUrl}${apiPrefix}${path}`;

  return fetch(url, init);
}
