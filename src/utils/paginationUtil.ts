
export function generatePaginationData(selectedPage: number, totalPages: number) {
  if (totalPages < 7) {
    return generateSequentialArray(totalPages);
  }

  // value 0 = ... in render
  const pages = [];
  // intentionally convert
  if (selectedPage === 1) {
    selectedPage = 2;
  }

  const leftBound = selectedPage - 1;
  const rightBound = selectedPage + 1;
  if (leftBound - 1 > 2) {
    pages.push(...[1, 0, leftBound]);
  } else {
    pages.push(...generateSequentialArray(leftBound));
  }

  pages.push(selectedPage);

  if (totalPages - rightBound > 2) {
    pages.push(...[rightBound, 0, totalPages]);
  } else {
    pages.push(...generateSequentialArray(totalPages - rightBound + 1, rightBound));
  }

  return pages;
}

function generateSequentialArray(length: number, start: number = 1) {
  return new Array(length).fill(0).map((_, i) => i + start);
}