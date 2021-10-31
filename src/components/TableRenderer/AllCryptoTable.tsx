import React, { useState } from 'react';
import { ALL_CRYPTO_TAGS, EXCHANGE_RATE_XBT_USD, ITEM_LIMIT } from '../../constants';
import { AllCryptoItem } from '../../types';
import { animatePriceDirection } from '../../utils/animationUtil';
import { formatCurrencyUSD, formatVolume } from '../../utils/formattingUtil';
import { Button } from '../Button';
import { HorizontalList } from '../HorizontalList';
import { PaginationList } from '../PaginationList';
import { PriceChangeText } from '../PriceChangeText';
import { Table, TableColumn, TableHeaderCell, TableHeaderGroup, TableRow, TableRowGroup } from '../Table';
import { Text } from '../Text';

type Props = {
  data: AllCryptoItem[];
};

export function AllCryptoTable(props: Props) {
  const { data } = props;
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(ALL_CRYPTO_TAGS[0].value);

  function handleSetPage(page: number) {
    setPage(page);
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  function renderItem(item: { label: string; value: string }) {
    const isSelected = item.value === selectedTag;
    const style = isSelected ? 'bg-blue-500 text-white' : 'text-gray-500';
    return <Button text={item.label} onPress={() => setSelectedTag(item.value)} className={`${style} ml-3`} />;
  }

  const filteredData = selectedTag ? data.filter(item => item.tags.includes(selectedTag)) : data;
  const startIndex = (page - 1) * ITEM_LIMIT;

  return (
    <div className="flex-col sm:w-full">
      <HorizontalList data={ALL_CRYPTO_TAGS} renderItem={renderItem} className="my-2" />
      <Table className="w-full">
        <TableHeaderGroup>
          <TableHeaderCell>
            <Text variant="xs">Name</Text>
          </TableHeaderCell>
          <TableHeaderCell className="sm:hidden">
            <Text variant="xs">Price/24H Change</Text>
          </TableHeaderCell>
          <TableHeaderCell className="hidden sm:table-cell sm:visible">
            <Text variant="xs">Price</Text>
          </TableHeaderCell>
          <TableHeaderCell className="hidden sm:table-cell sm:visible">
            <Text variant="xs">24h Change</Text>
          </TableHeaderCell>
          <TableHeaderCell>
            <Text variant="xs">Volume</Text>
          </TableHeaderCell>
        </TableHeaderGroup>
        <TableRowGroup>
          {filteredData.slice(startIndex, startIndex + ITEM_LIMIT).map(item => (
            <TableRow key={item.assetCode}>
              <TableColumn className="w-2/5 sm:w-500px">
                <Text variant="custom" className="text-base sm:inline-block sm:font-bold">
                  {item.assetCode}
                </Text>
                <Text variant="xs" className="text-gray-600 sm:inline-block sm:ml-2">
                  {item.assetCode}
                </Text>
              </TableColumn>
              <TableColumn className="w-2/5 sm:hidden">
                <Text variant="sm" className={`${animatePriceDirection(item.priceDirection)}`}>
                  {formatCurrencyUSD(item.price * EXCHANGE_RATE_XBT_USD)}
                </Text>
                <Text variant="xs">{item.priceChangePercentage.toFixed(2)}%</Text>
              </TableColumn>
              <TableColumn className="hidden sm:table-cell sm:visible">
                <Text variant="sm" className={`${animatePriceDirection(item.priceDirection)}`}>
                  {formatCurrencyUSD(item.price * EXCHANGE_RATE_XBT_USD)}
                </Text>
              </TableColumn>
              <TableColumn className="sm:table-cell w-1/5 hidden sm:visible">
                <PriceChangeText priceChange={item.priceChangePercentage} />
              </TableColumn>
              <TableColumn>
                <Text variant="sm">{formatVolume(item.volume)}</Text>
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
