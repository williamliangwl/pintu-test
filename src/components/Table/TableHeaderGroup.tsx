import { PropsWithChildren } from 'react';

export function TableHeaderGroup(props: PropsWithChildren<{}>) {
  return <div className="table-header-group text-gray-400">{props.children}</div>;
}
