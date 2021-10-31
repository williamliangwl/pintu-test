export type PropsWithClassName = {
  className?: string;
};

export type CryptoCurrencyAsset = {
  id: string,
  assetCode: string,
  assetName: string,
  logoUrl: string,
  fullLogoUrl: string,
  tags: string[]
};

export type AllAssetsResponse = {
  code: string,
  message: string | null,
  messageDetail: string | null,
  data: CryptoCurrencyAsset[]
}

export type Ticker = {
  symbol: string,
  priceChange: number,
  priceChangePercent: number,
  prevClosePrice: number,
  lastPrice: number,
  volume: number,
};

export type AssetTickerResponse = Ticker[];

export type PriceDirection = 'up' | 'down' | 'neutral';

export type SpotMarketItem = Ticker & {
  fullCode: string;
  assetCode: string;
  cryptoType: string;
  priceDirection: PriceDirection;
};

export type AllCryptoItem = CryptoCurrencyAsset & {
  price: number;
  volume: number;
  priceChangePercentage: number;
  priceDirection: PriceDirection;
};

// REDUCERS
export type BinanceState = {
  spotMarket: SpotMarketItem[];
  allCrypto: AllCryptoItem[];
};

export type BinanceActions = {
  setAllAssets(assets: CryptoCurrencyAsset[]): void;
  setTickers(assets: Ticker[]): void;
};

export type DispatchBinanceAction =
  | {
      type: 'setAllAssets';
      assets: CryptoCurrencyAsset[];
    }
  | {
      type: 'setTickers';
      assets: Ticker[];
    };