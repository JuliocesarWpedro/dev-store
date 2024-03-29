import Skeleton from '@/components/skeleton';
import React from 'react';

const loading = () => {
  return (
    <div className="grid h-full grid-cols-9 grid-rows-6 gap-6">
      <Skeleton className="col-span-6 row-span-6 h-[857px] sm:h-[200px] sm:col-span-9 sm:row-span-2" />
      <Skeleton className="col-span-3 row-span-3  sm:col-span-9 sm:row-span-2" />
      <Skeleton className="col-span-3 row-span-3 sm:col-span-9 sm:row-span-2" />
    </div>
  );
};

export default loading;
