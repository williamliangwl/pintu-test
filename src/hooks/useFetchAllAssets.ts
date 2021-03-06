import { useQuery } from 'react-query';
import { AllAssetsResponse } from '../types';

export function useFetchAllAssets() {
  const { data, isSuccess, status } = useQuery<AllAssetsResponse>('assets', () =>
    fetch('https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset').then(res => res.json())
  );

  return { assets: data, isLoading: status === 'loading', isReady: isSuccess };
}
