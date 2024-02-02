import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import CartWidget from './cart-widget';
import SearchForm from './search-form';
const Header = () => {
  return (
    <header className="flex items-center justify-between bsm:flex-col bsm:gap-3">
      <div className="flex items-center gap-5 bgsm:flex-col">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>
      <SearchForm />
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
