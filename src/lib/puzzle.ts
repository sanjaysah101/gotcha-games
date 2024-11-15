export const isSolvable = (tiles: number[]): boolean => {
  let inversions = 0;
  const numbers = tiles.filter((n) => n !== null);

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] > numbers[j]) inversions++;
    }
  }

  return inversions % 2 === 0;
};

export const isAdjacent = (pos1: number, pos2: number, size: number): boolean => {
  const row1 = Math.floor(pos1 / size);
  const col1 = pos1 % size;
  const row2 = Math.floor(pos2 / size);
  const col2 = pos2 % size;

  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
};

export const isSolved = (tiles: number[]): boolean => {
  return tiles.every((tile, index) => (tile === null ? index === tiles.length - 1 : tile === index + 1));
};
