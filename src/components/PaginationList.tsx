import React, { useEffect, useMemo, useState } from 'react';
import { HorizontalList } from './HorizontalList';

type Props = {
  totalPages: number;
  onPageSelected: (page: number) => void;
};

export const PaginationList = React.memo(
  (props: Props) => {
    const { totalPages, onPageSelected } = props;
    const [selectedPage, setSelectedPage] = useState(1);

    const pages = useMemo(() => generatePaginationData(selectedPage, totalPages), [selectedPage, totalPages]);

    useEffect(() => {
      onPageSelected(selectedPage);
    }, [selectedPage, onPageSelected]);

    function renderItem(page: number, index: number) {
      const isSelected = page === selectedPage;
      const style = isSelected ? 'bg-gray-500 text-white' : 'text-gray-500';
      return (
        <button
          key={page || `${page}${index}`}
          className={`${style} font-bold py-1.5 px-3 rounded focus:outline-none focus:shadow-outline ml-2 my-2 text-sm`}
          type="button"
          onClick={() => setSelectedPage(page)}
          disabled={page === 0}
        >
          {page || '...'}
        </button>
      );
    }

    return <HorizontalList data={pages} renderItem={renderItem} />;
  },
  (prevProps: Props, nextProps: Props) => nextProps.totalPages === prevProps.totalPages
);

function generatePaginationData(selectedPage: number, totalPages: number) {
  if (totalPages < 7) {
    return generateSequentialArray(totalPages);
  }

  // value 0 = ... in render
  const pages = [];
  // intentionally convert
  if (selectedPage === 1) {
    selectedPage = 2;
  }

  const leftBound = selectedPage - 1;
  const rightBound = selectedPage + 1;
  if (leftBound - 1 > 2) {
    pages.push(...[1, 0, leftBound]);
  } else {
    pages.push(...generateSequentialArray(leftBound));
  }

  pages.push(selectedPage);

  if (totalPages - rightBound > 2) {
    pages.push(...[rightBound, 0, totalPages]);
  } else {
    pages.push(...generateSequentialArray(totalPages - rightBound + 1, rightBound));
  }

  return pages;
}

function generateSequentialArray(length: number, start: number = 1) {
  return new Array(length).fill(0).map((_, i) => i + start);
}
