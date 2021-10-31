import { PropsWithChildren } from 'react';

export function TableRowGroup(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div className="table-row-group w-full">{children}</div>;
}
