import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/types/products';
import { api } from '@/data/api';
import { Metadata } from 'next';
import AddToCartButton from '@/components/add-to-cart-button';

interface ProductProps {
  params: {
    slug: string;
  };
}

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

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const response = await api('/products/featured');
  const products: Product[] = await response.json();

  return products.map((product) => {
    return {
      slug: product.slug,
    };
  });
}

const page = async ({ params }: ProductProps) => {
  const product = await getProduct(params.slug);
  return (
    <div className="relative flex max-h-[860px] items-start slg:flex-col slg:items-center">
      <div className=" overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center p-12 slg:items-center">
        <h1 className="text-3xl font-bold leading-tight slg:text-center">
          {product.title}
        </h1>
        <p className="mt-2 leading-relaxed text-zinc-4 slg:text-center">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em até 12x sem juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>
       <AddToCartButton productId={product.id}/>
      </div>
    </div>
  );
};

export default page;
