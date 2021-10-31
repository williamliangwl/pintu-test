import { Dispatch, useCallback, useMemo } from "react";
import { BinanceActions, CryptoCurrencyAsset, DispatchBinanceAction, BinanceState, Ticker } from "../types";

export function useGenerateBinanceActions(
  _: BinanceState,
  dispatch: Dispatch<DispatchBinanceAction>
) {

  const setAllAssets = useCallback((assets: CryptoCurrencyAsset[]) => {
    dispatch({
      type: 'setAllAssets',
      assets,
    })
  }, []);

  const setTickers = useCallback((assets: Ticker[]) => {
    dispatch({
      type: 'setTickers',
      assets,
    })
  }, []);

  return useMemo<BinanceActions>(
    () => ({
      setAllAssets: setAllAssets,
      setTickers: setTickers
    }),
    [setAllAssets, setTickers]
  );
}