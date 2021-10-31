import React, { useState } from 'react';
import { CRYPTO_CODES, EXCHANGE_RATE_XBT_USD, ITEM_LIMIT } from '../../constants';
import { SpotMarketItem } from '../../types';
import { animatePriceDirection } from '../../utils/animationUtil';
import { HorizontalList } from '../HorizontalList';
import { PaginationList } from '../PaginationList';
import { PriceChangeText } from '../PriceChangeText';

type Props = {
  data: SpotMarketItem[];
};

export function SpotMarketTable(props: Props) {
  const { data } = props;
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(CRYPTO_CODES[0]);

  function handleSetPage(page: number) {
    setPage(page);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  function renderItem(tag: string) {
    const isSelected = tag === selectedTag;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';
    return (
      <button
        key={tag}
        className={`${style} font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-3 my-2 text-sm`}
        type="button"
        onClick={() => setSelectedTag(tag)}
      >
        {tag}
      </button>
    );
  }

  const filteredData = selectedTag ? data.filter(item => item.cryptoType === selectedTag) : data;
  const startIndex = (page - 1) * ITEM_LIMIT;

  return (
    <div className="flex-col sm:w-full">
      <HorizontalList data={CRYPTO_CODES} renderItem={renderItem} />
      <div className="table table-fixed border-collapse w-full">
        <div className="table-header-group text-gray-400">
          <div className="table-cell text-xs sm:text-sm pl-3 pt-3">Name</div>
          <div className="table-cell text-xs sm:text-sm">Price</div>
          <div className="table-cell text-xs sm:text-sm">24h Change</div>
          <div className="sm:table-cell text-xs sm:text-sm hidden sm:visible">Volume</div>
        </div>
        <div className="table-row-group w-full">
          {filteredData.slice(startIndex, startIndex + ITEM_LIMIT).map(item => (
            <div key={item.fullCode} className="table-row sm:border-b border-solid border-gray-100 hover:bg-gray-50">
              <div className="table-cell w-2/5 sm:w-500px p-3 sm:p-4 align-middle">
                <label className="text-base font-semibold">{item.assetCode}</label>
                <label className="text-xs sm:text-sm text-gray-600">/{item.cryptoType}</label>
                <p className="text-xs text-gray-600 sm:hidden">Vol {item.volume.toFixed(2)}</p>
              </div>
              <div className="table-cell w-2/5 py-3 sm:align-middle">
                <p
                  className={`text-sm sm:inline-block sm:text-base sm:font-semibold ${animatePriceDirection(
                    item.priceDirection
                  )}`}
                >
                  {item.lastPrice.toFixed(6)}
                </p>
                <p className="text-sm text-gray-600 hidden sm:visible sm:inline-block sm:mx-1">/</p>
                <p className="text-xs sm:inline-block sm:text-base sm:text-gray-600">
                  ${(item.lastPrice * EXCHANGE_RATE_XBT_USD).toFixed(2)}
                </p>
              </div>
              <div className="sm:table-cell text-sm w-1/5 sm:text-base align-middle">
                <PriceChangeText priceChange={item.priceChangePercent} />
              </div>
              <div className="sm:table-cell text-sm align-middle sm:text-base hidden sm:visible">
                {item.volume.toFixed(2)}
              </div>
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
