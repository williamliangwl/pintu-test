import React from 'react';
import { EXCHANGE_RATE_XBT_USD } from '../constants';
import { SpotMarketItem } from '../types';

type Props = {
  data: SpotMarketItem[];
};

export function SpotMarketTable(props: Props) {
  const { data } = props;
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>24h Change</th>
          <th>24h Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.fullCode}>
            <td>
              {item.assetCode}/{item.cryptoType}
            </td>
            <td>{(+item.lastPrice * EXCHANGE_RATE_XBT_USD).toFixed(2)}</td>
            <td>{item.priceChangePercent}</td>
            <td>{item.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
