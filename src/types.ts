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

export type SpotMarketItem = Ticker & {
  fullCode: string;
  assetCode: string;
  cryptoType: string;
};

export type AllCryptoItem = CryptoCurrencyAsset & {
  price: number;
  volume: number;
  priceChangePercentage: number;
};

export type Asset = CryptoCurrencyAsset & Ticker;

// REDUCERS
export type State = {
  spotMarket: SpotMarketItem[];
  allCrypto: AllCryptoItem[];
};

export type Actions = {
  setAllAssets(assets: CryptoCurrencyAsset[]): void;
  setTickers(assets: Ticker[]): void;
};

export type DispatchAction =
  | {
      type: 'setAllAssets';
      assets: CryptoCurrencyAsset[];
    }
  | {
      type: 'setTickers';
      assets: Ticker[];
    };