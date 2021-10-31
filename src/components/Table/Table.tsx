import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../../types';

export function Table(props: PropsWithChildren<PropsWithClassName>) {
  const { children, className } = props;

  return <div className={classNames('table table-fixed border-collapse', className)}>{children}</div>;
}
