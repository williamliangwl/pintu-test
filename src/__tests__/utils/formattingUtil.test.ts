import { formatCurrencyUSD, formatVolume } from "../../utils/formattingUtil";

describe('test formattingUtil', () => {
  describe('test formatCurrencyUSD', () => {
      const testCases = [
        [100, '$100.00'],
        [1000, '$1,000.00'],
        [100000, '$100,000.00'],
        [100000.50, '$100,000.50'],
        [1000000.50, '$1,000,000.50'],
      ];

      test.each(testCases)('when value is %d, USD %s', (value, expectation) => {
        expect(formatCurrencyUSD(value as number)).toEqual(expectation)
    });
  });
  describe('test formatVolume', () => {
      const testCases = [
        [10, '0.01K'],
        [1000, '1.00K'],
        [100000, '100.00K'],
        [1000000, '1.00M'],
        [100920000, '100.92M'],
      ];

      test.each(testCases)('when value is %d, volume is %s', (value, expectation) => {
        expect(formatVolume(value as number)).toEqual(expectation)
    });
  });
});

export {};