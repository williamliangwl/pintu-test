import { useState } from 'react';
import { Button } from '../components/Button';
import { HorizontalList } from '../components/HorizontalList';
import { TableRenderer } from '../components/TableRenderer/TableRenderer';
import { TableDataWithButtonLabel, useTableData } from '../hooks/useTableData';
import LoadingImage from '../assets/loading.gif';
import { Header } from '../components/Header';

export function ListPage() {
  const [filter, setFilter] = useState('');
  const { isLoading, tableData } = useTableData(filter);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleFilterChange(text: string) {
    setFilter(text);
  }

  function handleSetActiveTableData(index: number) {
    setActiveIndex(index);
  }

  function renderTableDataButton(data: TableDataWithButtonLabel, index: number) {
    const isSelected = data.type === tableData[activeIndex].type;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';

    return (
      <Button
        key={data.type}
        text={data.buttonLabel}
        onPress={() => handleSetActiveTableData(index)}
        className={`${style} ml-3`}
      />
    );
  }

  if (isLoading) {
    return <img className="w-full sm:w-1/3 m-auto" src={LoadingImage} />;
  }

  return (
    <div className="sm:w-2/3 sm:m-auto">
      <Header onFilterChange={handleFilterChange} />
      <HorizontalList data={tableData} renderItem={renderTableDataButton} className="my-2" />
      <div className="sm:flex sm:justify-center">
        <TableRenderer data={tableData[activeIndex]} />
      </div>
    </div>
  );
}
