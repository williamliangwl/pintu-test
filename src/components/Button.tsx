import classNames from 'classnames';
import { PropsWithClassName } from '../types';

type Props = PropsWithClassName & {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Button(props: Props) {
  const { text, onPress, className, disabled } = props;
  return (
    <button
      className={classNames('text-sm font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline', className)}
      type="button"
      onClick={onPress}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
