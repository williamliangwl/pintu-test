import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { CRYPTO_CODES } from '../constants';
import { useGenerateActions } from '../hooks/useGenerateActions';
import { Actions, AllCryptoItem, Asset, DispatchAction, State, Ticker } from '../types';

const initialState: State = {
  allCrypto: [],
  spotMarket: [],
};

const initialTicker: Ticker = {
  lastPrice: '0',
  prevClosePrice: '0',
  priceChange: '0',
  priceChangePercent: '0',
  symbol: '',
  volume: '0',
};

const MyStateContext = createContext<State>(initialState);
const MyStateActionContext = createContext<Actions>(null!);

function reducer(state: State, action: DispatchAction): State {
  switch (action.type) {
    case 'setAllAssets':
      return {
        ...state,
        allCrypto: action.assets.map<AllCryptoItem>(item => ({
          ...item,
          volume: 0,
          priceChangePercentage: 0,
          price: 0,
        })),
      };
    case 'setTickers': {
      return updateAssets(state, action.assets);
    }
    default:
      return state;
  }
}

function updateAssets(state: State, data: Ticker[]): State {
  // Update spotMarkets
  const spotMarket: State['spotMarket'] = data.map(item => {
    const [assetCode, cryptoType] = item.symbol.split(new RegExp(`(${CRYPTO_CODES.join('|')})$`));
    return {
      ...item,
      assetCode,
      cryptoType,
      fullCode: item.symbol,
    };
  });

  return { ...state, spotMarket };
}

export function StateProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useGenerateActions(state, dispatch);

  return (
    <MyStateContext.Provider value={state}>
      <MyStateActionContext.Provider value={actions}>{children}</MyStateActionContext.Provider>
    </MyStateContext.Provider>
  );
}

export function useMyState() {
  return useContext(MyStateContext);
}

export function useMyActions() {
  return useContext(MyStateActionContext);
}
