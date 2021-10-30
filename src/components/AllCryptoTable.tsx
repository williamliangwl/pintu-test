import React, { useState } from 'react';
import { ALL_CRYPTO_TAGS, EXCHANGE_RATE_XBT_USD } from '../constants';
import { AllCryptoItem } from '../types';
import { HorizontalList } from './HorizontalList';

type Props = {
  data: AllCryptoItem[];
};

export function AllCryptoTable(props: Props) {
  const { data } = props;
  const [selectedTag, setSelectedTag] = useState(ALL_CRYPTO_TAGS[0].value);

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

  return (
    <div className="flex-col">
      <HorizontalList data={ALL_CRYPTO_TAGS} renderItem={renderItem} />
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
            <div key={item.assetCode} className="table-row">
              <div className="table-cell w-2/5 md:w-500px p-3">
                <p className="text-base">{item.assetCode}</p>
                <p className="text-xs md:text-sm text-gray-600">{item.assetName}</p>
              </div>
              <div className="table-cell w-2/5 md:hidden">
                <p className="text-sm">${(item.price * EXCHANGE_RATE_XBT_USD).toFixed(2)}</p>
                <p className="text-xs md:text-sm">{item.priceChangePercentage.toFixed(2)}%</p>
              </div>
              <div className="md:table-cell text-sm hidden md:visible">
                ${(item.price * EXCHANGE_RATE_XBT_USD).toFixed(2)}
              </div>
              <div className="md:table-cell text-sm w-1/5 hidden md:visible">
                {item.priceChangePercentage.toFixed(2)}%
              </div>
              <div className="table-cell text-sm align-middle">{item.volume.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
