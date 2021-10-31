import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../types';

export function TableColumn(props: PropsWithChildren<PropsWithClassName>) {
  const { children, className } = props;
  return <div className={classNames('table-cell p-3 sm:p-4 align-middle', className)}>{children}</div>;
}
