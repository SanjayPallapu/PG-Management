import { useState } from 'react';

export const usePagination = (initialPage: number = 0, initialSize: number = 10) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(0, prev - 1));
  const goToPage = (pageNumber: number) => setPage(pageNumber);
  const changeSize = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  return {
    page,
    size,
    nextPage,
    prevPage,
    goToPage,
    changeSize,
  };
};
