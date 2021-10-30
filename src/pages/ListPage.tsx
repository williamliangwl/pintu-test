import { useEffect } from 'react';
import { SpotMarketTable } from '../components/SpotMarketTable';
import { useFetchAllAssets } from '../hooks/useFetchAllAssets';
import { useSocket } from '../hooks/useSocket';
import { useMyActions, useMyState } from '../states/MyState';

export function ListPage() {
  const { assets } = useFetchAllAssets();
  const { data } = useSocket();
  const { allCrypto, spotMarket } = useMyState();
  const { setAllAssets: initAssets, setTickers: updateAssets } = useMyActions();

  useEffect(() => {
    if (!assets || !assets.data) {
      return;
    }

    initAssets(assets.data);
  }, [assets, initAssets]);

  useEffect(() => {
    updateAssets(data);
  }, [data, updateAssets]);

  if (!assets) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <SpotMarketTable data={spotMarket} />
    </div>
  );
}
