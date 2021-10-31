import { isInclude } from "../../utils/stringUtil";

describe('test stringUtil', () => {
  const testCases = [
    ['string', 'str', true],
    ['string', 'ing', true],
    ['string', 'rin', true],
    ['string', 'STR', true],
    ['string', 'TRi', true],
    ['string', 'false', false],
    ['string', 'rig', false],
  ];

  test.each(testCases)('does %s includes %s', (str, token, expectation) => {
    expect(isInclude(str as string, token as string)).toEqual(expectation);
  });
});

export {};