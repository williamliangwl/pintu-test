import { ChangeEvent, useState } from 'react';
import { HorizontalList } from '../components/HorizontalList';
import { TableRenderer } from '../components/TableRenderer/TableRenderer';
import { TableDataWithButtonLabel, useTableData } from '../hooks/useTableData';

export function ListPage() {
  const [filter, setFilter] = useState('');
  const { tableData } = useTableData(filter);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  function handleSetActiveTableData(index: number) {
    setActiveIndex(index);
  }

  function renderTableDataButton(data: TableDataWithButtonLabel, index: number) {
    const isSelected = data.type === tableData[activeIndex].type;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';

    return (
      <button
        key={data.type}
        className={`${style} font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-3 my-2 text-sm`}
        type="button"
        onClick={() => handleSetActiveTableData(index)}
      >
        {data.buttonLabel}
      </button>
    );
  }

  return (
    <div className="sm:w-2/3 sm:m-auto">
      <div className="flex">
        <input
          className="shadow appearance-none border rounded flex-1 m-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="filter"
          type="text"
          placeholder="Search coin name"
          onChange={handleFilterChange}
        />
      </div>
      <HorizontalList data={tableData} renderItem={renderTableDataButton} />
      <div className="sm:flex sm:justify-center">
        <TableRenderer data={tableData[activeIndex]} />
      </div>
    </div>
  );
}
