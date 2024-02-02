'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Skeleton from '../../../components/skeleton';

const Loading = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultado para: <span className="font-semibold">{query ?? ''}</span>
      </p>
      <div className="grid grid-cols-3 gap-6 slg:grid-cols-2 md:grid-cols-important">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
      </div>
    </div>
  );
};

export default Loading;
