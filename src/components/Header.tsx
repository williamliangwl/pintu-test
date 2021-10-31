import { ChangeEvent } from 'react';
import GithubLogo from '../assets/github.png';

type Props = {
  onFilterChange: (text: string) => void;
};

export function Header(props: Props) {
  const { onFilterChange } = props;

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    onFilterChange(e.target.value);
  }

  return (
    <div className="flex justify-center items-center ml-3">
      <a href="https://github.com/williamliangwl/pintu-test" target="_blank">
        <img className="w-10 h-10" src={GithubLogo} />
      </a>
      <input
        className="shadow appearance-none border rounded flex-1 m-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="filter"
        type="text"
        placeholder="Search coin name"
        onChange={handleFilterChange}
      />
    </div>
  );
}
