import { useState } from 'react';
import { CRYPTO_CODES, EXCHANGE_RATE_XBT_USD, ITEM_LIMIT } from '../../constants';
import { SpotMarketItem } from '../../types';
import { animatePriceDirection } from '../../utils/animationUtil';
import { Button } from '../Button';
import { HorizontalList } from '../HorizontalList';
import { PaginationList } from '../PaginationList';
import { PriceChangeText } from '../PriceChangeText';
import { Table, TableColumn, TableHeaderCell, TableHeaderGroup, TableRow, TableRowGroup } from '../Table';
import { Text } from '../Text';

type Props = {
  data: SpotMarketItem[];
};

export function SpotMarketTable(props: Props) {
  const { data } = props;
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(CRYPTO_CODES[0]);

  function handleSetPage(page: number) {
    setPage(page);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  function renderItem(tag: string) {
    const isSelected = tag === selectedTag;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';
    return <Button key={tag} text={tag} onPress={() => setSelectedTag(tag)} className={`${style} ml-3`} />;
  }

  const filteredData = selectedTag ? data.filter(item => item.cryptoType === selectedTag) : data;
  const startIndex = (page - 1) * ITEM_LIMIT;

  return (
    <div className="flex-col sm:w-full">
      <HorizontalList data={CRYPTO_CODES} renderItem={renderItem} className="my-2" />
      <Table className="w-full">
        <TableHeaderGroup>
          <TableHeaderCell>
            <Text>Name</Text>
          </TableHeaderCell>
          <TableHeaderCell>
            <Text>Price</Text>
          </TableHeaderCell>
          <TableHeaderCell>
            <Text>24h Change</Text>
          </TableHeaderCell>
          <TableHeaderCell className="hidden sm:table-cell sm:visible">
            <Text>Volume</Text>
          </TableHeaderCell>
        </TableHeaderGroup>
        <TableRowGroup>
          {filteredData.slice(startIndex, startIndex + ITEM_LIMIT).map(item => (
            <TableRow key={item.fullCode}>
              <TableColumn className="w-2/5 sm:w-500px">
                <Text className="text-base font-semibold" inline variant="custom">
                  {item.assetCode}
                </Text>
                <Text className="text-gray-600" inline>
                  /{item.cryptoType}
                </Text>
                <Text className="text-xs text-gray-600 sm:hidden" variant="custom">
                  Vol {item.volume.toFixed(2)}
                </Text>
              </TableColumn>
              <TableColumn className="w-2/5">
                <Text
                  variant="sm"
                  className={`sm:inline-block sm:font-semibold ${animatePriceDirection(item.priceDirection)}`}
                >
                  {item.lastPrice.toFixed(6)}
                </Text>
                <Text variant="custom" className="text-sm text-gray-600 hidden sm:visible sm:inline-block sm:mx-1">
                  /
                </Text>
                <Text variant="custom" className="text-xs sm:inline-block sm:text-base sm:text-gray-600">
                  ${(item.lastPrice * EXCHANGE_RATE_XBT_USD).toFixed(2)}
                </Text>
              </TableColumn>
              <TableColumn className="sm:table-cell w-1/5 sm:text-base">
                <PriceChangeText priceChange={item.priceChangePercent} />
              </TableColumn>
              <TableColumn className="sm:table-cell hidden sm:visible">
                <Text variant="sm">{item.volume.toFixed(2)}</Text>
              </TableColumn>
            </TableRow>
          ))}
        </TableRowGroup>
      </Table>
      <div className="flex justify-end mt-1.5 border-t border-solid border-gray-100 sm:border-none">
        <PaginationList totalPages={Math.ceil(filteredData.length / ITEM_LIMIT)} onPageSelected={handleSetPage} />
      </div>
    </div>
  );
}
