import { AllCryptoItem, SpotMarketItem } from '../types';
import { AllCryptoTable } from './AllCryptoTable';
import { SpotMarketTable } from './SpotMarketTable';

export type TableData =
  | {
      type: 'SPOT_MARKET';
      data: SpotMarketItem[];
      filter: string;
    }
  | {
      type: 'ALL_CRYPTOS';
      data: AllCryptoItem[];
      filter: string;
    };

type Props = {
  data: TableData;
};

export function TableRenderer(props: Props) {
  const { data: tableData } = props;

  switch (tableData.type) {
    case 'ALL_CRYPTOS':
      return <AllCryptoTable data={tableData.data} />;
    case 'SPOT_MARKET':
      return <SpotMarketTable data={tableData.data} />;
    default:
      return null;
  }
}
