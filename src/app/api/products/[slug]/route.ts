import { z } from 'zod';
import data from '../data.json';

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo (opcional)

  try {
    const slug = z.string().parse(params.slug);

    const product = data.products.find((product) => product.slug === slug);
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 400 });
    }

    return Response.json(product);
  } catch (error) {
    console.error('Erro ao analisar o parâmetro slug:', error);
    return Response.json({ message: 'Erro ao analisar o parâmetro slug' }, { status: 500 });
  }
}