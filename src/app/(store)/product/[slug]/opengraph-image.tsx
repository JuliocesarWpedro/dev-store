import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { ImageResponse } from 'next/server';
import { zinc } from 'tailwindcss/colors';
import { env } from 'process';

export const runtime = 'edge';
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

async function getProduct(slug: string): Promise<Product> {
  try {
    const response = await api(`/products/${slug}`, {
      next: {
        revalidate: 60 * 60,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  const productImageUrl = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  );
}
