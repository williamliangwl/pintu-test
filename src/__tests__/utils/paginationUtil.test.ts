import { generatePaginationData } from "../../utils/paginationUtil";

describe('test paginationUtil', () => {
  // [selectedPage, totalPages, expectation]
  const testCases = [
    [1, 1, [1]],
    [1, 6, [1,2,3,4,5,6]],
    [6, 6, [1,2,3,4,5,6]],
    [4, 6, [1,2,3,4,5,6]],
    [1, 7, [1,2,3,0,7]],
    [2, 7, [1,2,3,0,7]],
    [3, 7, [1,2,3,4,0,7]],
    [4, 7, [1,2,3,4,5,6,7]],
    [5, 7, [1,0,4,5,6,7]],
    [7, 7, [1,0,6,7]],
  ];

  test.each(testCases)('when selectedPage is %d and totalPages %d, should return %o', (selectedPage, totalPages, expectation) => {
    expect(generatePaginationData(selectedPage as number, totalPages as number)).toEqual(expectation);
  });
});

export {};