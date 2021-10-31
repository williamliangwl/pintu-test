import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '../types';

type TextVariant = 'sm' | 'xs' | 'custom';

type Props = PropsWithClassName & {
  variant?: TextVariant;
  inline?: boolean;
  bold?: boolean;
};

export function Text(props: PropsWithChildren<Props>) {
  const { children, variant = 'xs', className, inline } = props;

  const textClass = classNames(getVariantClassName(variant), { 'inline-block': inline }, className);

  return <p className={textClass}>{children}</p>;
}

function getVariantClassName(variant: TextVariant) {
  switch (variant) {
    case 'sm':
      return 'text-sm sm:text-base';
    case 'xs':
      return 'text-xs sm:text-sm';
    default:
      return '';
  }
}
