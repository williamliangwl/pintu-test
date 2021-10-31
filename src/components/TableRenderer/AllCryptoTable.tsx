import React, { useState } from 'react';
import { ALL_CRYPTO_TAGS, EXCHANGE_RATE_XBT_USD, ITEM_LIMIT } from '../../constants';
import { AllCryptoItem } from '../../types';
import { animatePriceDirection } from '../../utils/animationUtil';
import { HorizontalList } from '../HorizontalList';
import { PaginationList } from '../PaginationList';
import { PriceChangeText } from '../PriceChangeText';

type Props = {
  data: AllCryptoItem[];
};

export function AllCryptoTable(props: Props) {
  const { data } = props;
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(ALL_CRYPTO_TAGS[0].value);

  function handleSetPage(page: number) {
    setPage(page);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  function renderItem(item: { label: string; value: string }) {
    const isSelected = item.value === selectedTag;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';
    return (
      <button
        key={item.value}
        className={`${style} font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-3 my-2 text-sm`}
        type="button"
        onClick={() => setSelectedTag(item.value)}
      >
        {item.label}
      </button>
    );
  }

  const filteredData = selectedTag ? data.filter(item => item.tags.includes(selectedTag)) : data;
  const startIndex = (page - 1) * ITEM_LIMIT;

  return (
    <div className="flex-col sm:w-full">
      <HorizontalList data={ALL_CRYPTO_TAGS} renderItem={renderItem} />
      <div className="table table-fixed border-collapse w-full">
        <div className="table-header-group text-gray-400">
          <div className="table-cell text-xs sm:text-sm pl-3 pt-3">Name</div>
          <div className="table-cell text-xs sm:text-sm sm:hidden">Price/24H Change</div>
          <div className="sm:table-cell text-xs sm:text-sm hidden sm:visible">Price</div>
          <div className="sm:table-cell text-xs sm:text-sm hidden sm:visible">24h Change</div>
          <div className="table-cell text-xs sm:text-sm">Volume</div>
        </div>
        <div className="table-row-group w-full">
          {filteredData.slice(startIndex, startIndex + ITEM_LIMIT).map(item => (
            <div key={item.assetCode} className="table-row sm:border-b border-solid border-gray-100 hover:bg-gray-50">
              <div className="table-cell w-2/5 sm:w-500px p-3 sm:p-4">
                <p className="text-base sm:inline-block sm:font-bold">{item.assetCode}</p>
                <p className="text-xs sm:text-sm text-gray-600 sm:inline-block sm:ml-2">{item.assetName}</p>
              </div>
              <div className="table-cell w-2/5 sm:hidden">
                <p className="text-sm">${(item.price * EXCHANGE_RATE_XBT_USD).toFixed(2)}</p>
                <p className="text-xs sm:text-sm">{item.priceChangePercentage.toFixed(2)}%</p>
              </div>
              <div
                className={`sm:table-cell text-sm hidden ${animatePriceDirection(
                  item.priceDirection
                )} sm:visible sm:text-base`}
              >
                ${(item.price * EXCHANGE_RATE_XBT_USD).toFixed(2)}
              </div>
              <div className="sm:table-cell text-sm w-1/5 hidden sm:visible sm:text-base">
                <PriceChangeText priceChange={item.priceChangePercentage} />
              </div>
              <div className="table-cell text-sm align-middle sm:text-base">{item.volume.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-1.5 border-t border-solid border-gray-100 sm:border-none">
        <PaginationList totalPages={Math.ceil(filteredData.length / ITEM_LIMIT)} onPageSelected={handleSetPage} />
      </div>
    </div>
  );
}
