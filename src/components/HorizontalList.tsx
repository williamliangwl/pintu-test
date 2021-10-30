import { ReactElement } from 'react';

type Props<T> = {
  data: T[];
  renderItem: (item: T) => ReactElement | null;
};

export function HorizontalList<T>(props: Props<T>) {
  const { data, renderItem } = props;

  return <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar">{data.map(renderItem)}</div>;
}
