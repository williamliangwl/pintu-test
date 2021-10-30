import { useEffect, useRef, useState } from 'react';
import { AssetTickerResponse } from '../types';

type SocketItem = {
  "e": '24hrMiniTicker';  // Event type
  "E": number;            // Event time
  "s": string;            // Symbol
  "c": string;            // Close price
  "o": string;            // Open price
  "h": string;            // High price
  "l": string;            // Low price
  "v": string;            // Total traded base asset volume
  "q": string;            // Total traded quote asset volume
};

export function useSocket() {
  const isInit = useRef(false);
  const [data, setData] = useState<AssetTickerResponse>([]);

  useEffect(() => {
    const conn = new WebSocket('wss://stream.binance.com:9443/ws');
    conn.onopen = function (evt) {
      conn.send(JSON.stringify({ method: 'SUBSCRIBE', params: ['!miniTicker@arr@3000ms'], id: 239230 }));
      isInit.current = true;
    };
    conn.onmessage = function (evt) {
      if (isInit.current) {
        // check is connected well
        isInit.current = false;
        return;
      }

      setData(JSON.parse(evt.data).map((item: SocketItem) => ({
        symbol: item.s,
        priceChange: +item.c - +item.o,
        priceChangePercent: +item.c / +item.o,
        prevClosePrice: item.c,
        lastPrice: item.c,
        volume: item.q,
      })));
    };
  }, []);

  return { data };
}
