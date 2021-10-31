import { useEffect } from "react";
import { TableData } from "../components/TableRenderer/TableRenderer";
import { useBinanceActions, useBinanceState } from "../states/BinanceState";
import { isInclude } from "../utils/stringUtil";
import { useFetchAllAssets } from "./useFetchAllAssets";
import { useBinanceTickerSocket } from "./useBinanceTickerSocket";

export type TableDataWithButtonLabel = TableData & {
  buttonLabel: string;
};

export function useTableData(filter: string) {
  const { assets, isLoading: isAssetLoading, isReady: isAssetReady } = useFetchAllAssets();
  const { data: tickers, isLoading: isTickersLoading, isReady: isTickersReady } = useBinanceTickerSocket();
  const { allCrypto, spotMarket } = useBinanceState();
  const { setAllAssets, setTickers } = useBinanceActions();

  useEffect(() => {
    if (!assets || !assets.data) {
      return;
    }

    setAllAssets(assets.data);
  }, [assets, setAllAssets]);

  useEffect(() => {
    setTickers(tickers);
  }, [tickers, setTickers]);

  return {
    isLoading: isAssetLoading || isTickersLoading,
    isReady: isAssetReady && isTickersReady,
    tableData: [
      {
        type: 'SPOT_MARKET',
        data: filter ? spotMarket.filter(market => isInclude(market.assetCode, filter)) : spotMarket,
        filter,
        buttonLabel: 'Spot Market'
      },
      {
        type: 'ALL_CRYPTOS',
        data: filter ? allCrypto.filter(crypto => (isInclude(crypto.assetCode, filter) || isInclude(crypto.assetName, filter))) : allCrypto,
        filter,
        buttonLabel: 'All Cryptos'
      },
    ] as TableDataWithButtonLabel[]
  };
}
