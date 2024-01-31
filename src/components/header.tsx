import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Search } from 'lucide-react';
import CartWidget from './cart-widget';
const Header = () => {
  return (
    <header className="flex items-center justify-between bsm:flex-col bsm:gap-3">
      <div className="flex items-center gap-5 bgsm:flex-col">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>
        <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700 sm:w-[160px] bsm:w-[200px]">
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            placeholder="Buscar produtos..."
            type="text"
            className="flex-1 bg-transparent w-[320px text-sm outline-none placeholder:text-zinc-500 sm:w-[120px] bsm:w-[160px]"
          />
        </form>
      </div>
      <div className="flex items-center gap-4 md:flex-col md:items-end bsm:flex-row bsm:items-center">
       <CartWidget />
        <div className="w-px h-4 bg-zinc-700 md:hidden bsm:block" />
        <div className="flex gap-5 align-center md:gap-1 md:text-sm bsm:gap-5">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <span className="">Account</span>
          </Link>
          <Image
            alt="Image Profile"
            src="https://github.com/JuliocesarWpedro.png"
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
