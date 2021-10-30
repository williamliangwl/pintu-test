import React, { useState } from 'react';
import { CRYPTO_CODES, EXCHANGE_RATE_XBT_USD } from '../constants';
import { SpotMarketItem } from '../types';
import { HorizontalList } from './HorizontalList';

type Props = {
  data: SpotMarketItem[];
};

export function SpotMarketTable(props: Props) {
  const { data } = props;
  const [selectedTag, setSelectedTag] = useState(CRYPTO_CODES[0]);

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

  return (
    <div className="flex-col">
      <HorizontalList data={CRYPTO_CODES} renderItem={renderItem} />
      <div className="table table-fixed border-collapse">
        <div className="table-header-group text-gray-400">
          <div className="table-cell text-xs md:text-sm pl-3 pt-3">Name</div>
          <div className="table-cell text-xs md:text-sm md:hidden">Price/24H Change</div>
          <div className="md:table-cell text-xs md:text-sm hidden md:visible">Price</div>
          <div className="md:table-cell text-xs md:text-sm hidden md:visible">24h Change</div>
          <div className="table-cell text-xs md:text-sm">Volume</div>
        </div>
        <div className="table-row-group">
          {filteredData.slice(0, 10).map(item => (
            <div key={item.fullCode} className="table-row">
              <div className="table-cell w-2/5 md:w-500px p-3 align-middle">
                <label className="text-base font-semibold">{item.assetCode}</label>
                <label className="text-xs md:text-sm text-gray-600">/{item.cryptoType}</label>
              </div>
              <div className="table-cell w-2/5 md:hidden py-3">
                <p className="text-sm">${item.lastPrice.toFixed(6)}</p>
                <p className="text-xs md:text-sm">{item.priceChangePercent.toFixed(2)}%</p>
              </div>
              <div className="md:table-cell text-sm hidden md:visible">
                ${(item.lastPrice * EXCHANGE_RATE_XBT_USD).toFixed(2)}
              </div>
              <div className="md:table-cell text-sm w-1/5 hidden md:visible">{item.priceChangePercent.toFixed(2)}%</div>
              <div className="table-cell text-sm align-middle">{item.volume.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
