import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_API_URL)
      throw new Error(`Erro na requisição`);
    const response = await api('/products/featured', {
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

export const metadata: Metadata = {
  title: 'Home',
};

const Home = async () => {
  const [hightlightedProduct, ...otherProducts] = await getFeaturedProducts();
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${hightlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flel justify-center items-end sm:col-span-9 sm:row-span-2"
      >
        <Image
          className="group-hover:scale-105 transition-transform duration-500"
          src={hightlightedProduct.image}
          width={920}
          height={920}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5 lg:right-1 lg:max-w-[80%] md:max-w-[100%] lg:bottom-5 sm:bottom-2 sm:h-9">
          <span className="text-sm truncate">{hightlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {hightlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.slice(0, 2).map((product: Product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flel justify-center items-end sm:col-span-9 sm:row-span-2"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              width={920}
              height={920}
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
  );
};

export default Home;
