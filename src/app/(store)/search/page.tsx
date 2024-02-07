'use client';
import { Product } from '@/data/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
interface SearchProps {
  searchParams: {
    q: string;
  };
}

function searchProducts(query: string): Promise<Product[]> {
  return fetch(`/api/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    });
}

const Page = ({ searchParams }: SearchProps) => {
  const { q: query } = searchParams;
  const [productsSearched, setProductsSearched] = React.useState<
    Product[] | null
  >(null);

  React.useEffect(() => {
    if (!query) {
      redirect('/');
      return;
    }

    searchProducts(query)
      .then((result) => setProductsSearched(result))
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [query]);

  if (!productsSearched) {
    return <div>Produto não encontrado</div>;
  }
  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6 slg:grid-cols-2 md:grid-cols-important">
        {productsSearched &&
          productsSearched.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="relative group crounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end "
              >
                <Image
                  className="group-hover:scale-105 transition-transform duration-500"
                  width={480}
                  height={480}
                  quality={100}
                  alt=""
                  src={product.image}
                />
                <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[250px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5 lg:right-1 lg:max-w-[80%] md:max-w-[100%] md:bottom-5 sm:bottom-2 sm:h-9">
                  <span className="text-sm truncate">{product.title}</span>
                  <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold sm:w-11 sm:font-light ">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
