import { PriceDirection } from "../../types";
import { animatePriceDirection } from "../../utils/animationUtil";

describe('test animationUtil', () => {
  const testCases: [PriceDirection, string][] = [
    ['up', 'animate-flash-green'],
    ['down', 'animate-flash-red'],
    ['neutral', ''],
  ];

  test.each(testCases)('when price direction is %s, should return %s', (priceDirection, animation) => {
    expect(animatePriceDirection(priceDirection)).toEqual(animation);
  });
});

export {};