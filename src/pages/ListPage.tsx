import { ChangeEvent, useEffect, useState } from 'react';
import { HorizontalList } from '../components/HorizontalList';
import { TableData, TableRenderer } from '../components/TableRenderer';
import { TableDataWithButtonLabel, useTableData } from '../hooks/useTableData';

export function ListPage() {
  const [filter, setFilter] = useState('');
  const { isLoading, isReady, tableData } = useTableData(filter);
  const [activeTableData, setActiveTableData] = useState<TableData>(tableData[0]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    setActiveTableData(tableData[0]);
  }, [isReady]);

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  function handleSetActiveTableData(data: TableData) {
    setActiveTableData(data);
  }

  function renderTableDataButton(data: TableDataWithButtonLabel) {
    const isSelected = data.type === activeTableData.type;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';

    return (
      <button
        key={data.type}
        className={`${style} font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-3 my-2 text-sm`}
        type="button"
        onClick={() => handleSetActiveTableData(data)}
      >
        {data.buttonLabel}
      </button>
    );
  }

  return (
    <>
      <input
        className="shadow appearance-none border rounded flex-1 m-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="filter"
        type="text"
        placeholder="Search coin name"
        onChange={handleFilterChange}
      />
      <HorizontalList data={tableData} renderItem={renderTableDataButton} />
      <div className="md:flex md:justify-center">
        <TableRenderer data={activeTableData} />
      </div>
    </>
  );
}
