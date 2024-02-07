'use client';
import { Product } from '@/data/types/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSearchParams } from 'next/navigation';
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

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [productsSearched, setProductsSearched] = React.useState<
    Product[] | null
  >(null);
  const [errorProductNotFound, setErrorProductNotFound] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setErrorProductNotFound(false);
      setLoading(true);
      try {
        if (query) {
          const result = await searchProducts(query);
          if (result.length) {
            setProductsSearched(result);
            setLoading(false);
          } else {
            setErrorProductNotFound(true);
            setProductsSearched([]);
          }
        } else {
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setErrorProductNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (errorProductNotFound) {
    return <div>O produto não foi encontrado</div>;
  }

  return (
    <>
      {productsSearched && (
        <div className="flex flex-col gap-4 ">
          <p className="text-sm">
            Resultados para: <span className="font-semibold">{query}</span>
          </p>
          <div className="grid grid-cols-3 gap-6 slg:grid-cols-2 md:grid-cols-important">
            {productsSearched.map((product) => (
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
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
