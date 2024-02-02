export function api(path: string, init?: RequestInit) {
  const baseUrl =
    process.env.VERCEL_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:3000';
  const apiPrefix = '/api';

  try {
    const url = new URL(apiPrefix.concat(path), baseUrl);
    return fetch(url.toString(), init);
  } catch (error) {
    console.error('Error constructing URL:', error);
    throw new Error('Error constructing URL');
  }
}
