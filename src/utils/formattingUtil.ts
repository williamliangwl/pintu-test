export function formatCurrencyUSD(num: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

export function formatVolume(volume: number) {
  const dividerObj = volume >= 1000000 ? {
    divider: 1000000,
    unit: 'M'
   } : {
    divider: 1000,
    unit: 'K'
   };
  return `${(volume / dividerObj.divider).toFixed(2)}${dividerObj.unit}`;
}