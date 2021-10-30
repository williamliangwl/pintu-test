import { Dispatch, useCallback, useMemo } from "react";
import { Actions, CryptoCurrencyAsset, DispatchAction, State, Ticker } from "../types";

export function useGenerateActions(
  _: State,
  dispatch: Dispatch<DispatchAction>
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

  return useMemo<Actions>(
    () => ({
      setAllAssets: setAllAssets,
      setTickers: setTickers
    }),
    [setAllAssets, setTickers]
  );
}