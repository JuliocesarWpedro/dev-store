'use client'

import { useCart } from '@/contexts/cart-context';
export interface AddToCartButtonProps {
  productId: number;
}

const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const { addToCart } = useCart();

  function handleAddProductToCart() {
    addToCart(productId);
  }
  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white px-5"
    >
      Adicionar ao carrinho
    </button>
  );
};

export default AddToCartButton;
