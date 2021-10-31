import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { CRYPTO_CODES } from '../constants';
import { useGenerateBinanceActions } from '../hooks/useGenerateBinanceActions';
import {
  BinanceActions,
  AllCryptoItem,
  DispatchBinanceAction,
  PriceDirection,
  SpotMarketItem,
  BinanceState,
  Ticker,
} from '../types';

const initialState: BinanceState = {
  allCrypto: [],
  spotMarket: [],
};

const BinanceStateContext = createContext<BinanceState>(initialState);
const BinanceStateActionContext = createContext<BinanceActions>(null!);

function reducer(state: BinanceState, action: DispatchBinanceAction): BinanceState {
  switch (action.type) {
    case 'setAllAssets':
      return {
        ...state,
        allCrypto: action.assets.map<AllCryptoItem>(item => ({
          ...item,
          volume: 0,
          priceChangePercentage: 0,
          price: 0,
          priceDirection: 'neutral',
        })),
      };
    case 'setTickers': {
      return updateAssets(state, action.assets);
    }
    default:
      return state;
  }
}

function updateAssets(state: BinanceState, data: Ticker[]): BinanceState {
  // Update spotMarkets
  const spotMarket: BinanceState['spotMarket'] = data
    .map(item => {
      const [assetCode, cryptoType] = item.symbol.split(new RegExp(`(${CRYPTO_CODES.join('|')})$`));
      const existingItem = state.spotMarket.find(i => i.fullCode === item.symbol);
      let priceDirection: PriceDirection = 'neutral';
      if (existingItem) {
        priceDirection =
          existingItem.lastPrice < item.lastPrice ? 'up' : existingItem.lastPrice > item.lastPrice ? 'down' : 'neutral';
      }

      return {
        ...item,
        assetCode,
        cryptoType,
        fullCode: item.symbol,
        priceDirection,
      } as SpotMarketItem;
    })
    .sort((a, b) => (a.volume > b.volume ? -1 : 1));

  // Update allAssets
  const allCrypto = state.allCrypto
    .map(c => {
      const relatedMarkets = spotMarket.filter(m => m.assetCode === c.assetCode);
      const count = relatedMarkets.length;

      if (count === 0) {
        return c;
      }

      const newPrice = relatedMarkets.reduce((total, curr) => total + curr.lastPrice, 0) / count;

      return {
        ...c,
        price: newPrice,
        priceChangePercentage: relatedMarkets.reduce((total, curr) => total + curr.priceChangePercent, 0) / count,
        volume: relatedMarkets.reduce((total, curr) => total + curr.volume, 0) / count,
        priceDirection: newPrice > c.price ? 'up' : newPrice < c.price ? 'down' : 'neutral',
      } as AllCryptoItem;
    })
    .sort((a, b) => (a.volume > b.volume ? -1 : 1));

  return { ...state, spotMarket, allCrypto };
}

export function BinanceStateProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useGenerateBinanceActions(state, dispatch);

  return (
    <BinanceStateContext.Provider value={state}>
      <BinanceStateActionContext.Provider value={actions}>{children}</BinanceStateActionContext.Provider>
    </BinanceStateContext.Provider>
  );
}

export function useBinanceState() {
  return useContext(BinanceStateContext);
}

export function useBinanceActions() {
  return useContext(BinanceStateActionContext);
}
