export function api(path: string, init?: RequestInit) {
  const apiPrefix = '/api';
  const url = `${process.env.API_BASE_URL}${apiPrefix}${path}`;

  return fetch(url, init);
}
