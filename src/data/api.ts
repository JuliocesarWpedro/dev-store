export function api(path: string, init?: RequestInit) {
  const apiPrefix = '/api';
  const url = `http://127.0.0.1:3000${apiPrefix}${path}`;

  return fetch(url, init);
}
