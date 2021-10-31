import { useEffect, useRef, useState } from 'react';
import { AssetTickerResponse } from '../types';

type SocketItem = {
  "e": '24hrMiniTicker';  // Event type
  "E": number;            // Event time
  "s": string;            // Symbol
  "c": string;            // Last price
  "o": string;            // Open price
  "h": string;            // High price
  "l": string;            // Low price
  "v": string;            // Total traded base asset volume
  "q": string;            // Total traded quote asset volume
  "P": string;            // Price change percentage
  "p": string;            // Price change
};

export function useBinanceTickerSocket() {
  const isInit = useRef(false);
  const isReady = useRef(false);
  const isLoading = useRef(false);
  const [data, setData] = useState<AssetTickerResponse>([]);

  useEffect(() => {
    isLoading.current = true;
    const conn = new WebSocket('wss://stream.binance.com:9443/ws');
    conn.onopen = function (evt) {
      conn.send(JSON.stringify({ method: 'SUBSCRIBE', params: ['!ticker@arr@3000ms'], id: 239230 }));
      isInit.current = true;
    };
    conn.onmessage = function (evt) {
      if (isInit.current) {
        // check is connected well
        isInit.current = false;
        return;
      }

      setData((JSON.parse(evt.data) as SocketItem[]).map<AssetTickerResponse[number]>((item: SocketItem) => ({
        symbol: item.s,
        priceChange: +item.p,
        priceChangePercent: +item.P,
        prevClosePrice: +item.c,
        lastPrice: +item.c,
        volume: +item.q,
      })));
      isLoading.current = false;
      isReady.current = true;
    };
  }, []);

  return { data, isReady: isReady.current, isLoading: isLoading.current };
}
