type Props = {
  priceChange: number;
};

export function PriceChangeText(props: Props) {
  const { priceChange } = props;
  const isPositive = priceChange > 0;
  const symbol = isPositive ? '+' : '';
  const style = isPositive ? 'text-green-600' : priceChange === 0 ? '' : 'text-red-600';

  return <label className={style}>{`${symbol}${priceChange.toFixed(2)}%`}</label>;
}
