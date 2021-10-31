import classNames from 'classnames';
import { Text } from './Text';

type Props = {
  priceChange: number;
};

export function PriceChangeText(props: Props) {
  const { priceChange } = props;
  const isPositive = priceChange > 0;
  const symbol = isPositive ? '+' : '';
  const style = classNames({ 'text-green-600': isPositive, 'text-red-600': priceChange < 0 });

  return <Text variant="sm" className={style}>{`${symbol}${priceChange.toFixed(2)}%`}</Text>;
}
