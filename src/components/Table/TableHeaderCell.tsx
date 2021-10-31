import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../types';

export function TableHeaderCell(props: PropsWithChildren<PropsWithClassName>) {
  const { children, className } = props;
  return <div className={classNames('table-cell pl-3 pt-3', className)}>{children}</div>;
}
