import classNames from 'classnames';
import { ReactElement } from 'react';
import { PropsWithClassName } from '../types';

type Props<T> = PropsWithClassName & {
  data: T[];
  renderItem: (item: T, index: number) => ReactElement | null;
};

export function HorizontalList<T>(props: Props<T>) {
  const { data, renderItem, className } = props;

  return (
    <div className={classNames(className, 'flex overflow-x-auto whitespace-nowrap no-scrollbar')}>
      {data.map(renderItem)}
    </div>
  );
}
