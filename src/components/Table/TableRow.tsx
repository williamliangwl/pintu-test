import { PropsWithChildren } from 'react';

export function TableRow(props: PropsWithChildren<{}>) {
  const { children } = props;
  return <div className="table-row border-solid border-gray-100 sm:border-b hover:bg-gray-50">{children}</div>;
}
