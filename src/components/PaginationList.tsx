import React, { useEffect, useMemo, useState } from 'react';
import { generatePaginationData } from '../utils/paginationUtil';
import { Button } from './Button';
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
        <Button
          key={page || `${page}${index}`}
          text={page.toString() || '...'}
          onPress={() => setSelectedPage(page)}
          className={`${style} py-1.5 ml-2 my-2`}
        />
      );
    }

    return <HorizontalList data={pages} renderItem={renderItem} />;
  },
  (prevProps: Props, nextProps: Props) => nextProps.totalPages === prevProps.totalPages
);
