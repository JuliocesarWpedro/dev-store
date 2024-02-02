'use client';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent } from 'react';

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const query = data.q;
    if (!query) {
      return null;
    }

    router.push(`/search?q=${query}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700 sm:w-[160px] bsm:w-[200px]"
    >
      <Search className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Buscar produtos..."
        type="text"
        required
        className="flex-1 bg-transparent w-[320px text-sm outline-none placeholder:text-zinc-500 sm:w-[120px] bsm:w-[160px]"
      />
    </form>
  );
};

export default SearchForm;
