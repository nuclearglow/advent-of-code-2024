import { isEmpty } from 'lodash-es';
import { wordSearch } from './source/2024-4-input';

const startTime = performance.now();

// read the input into a 2d array
const horizontalLines = wordSearch.split('\n').filter((line) => !isEmpty(line));
const array2d = [...horizontalLines.map((line) => line.split(''))];

// part 1: check occurrences of the word XMAS

/**
 * for each X in each line, check if there is a valid word in all directions:
 * NORTH y..y-4
 * SOUTH y..y+4
 * EAST x..x+4
 * WEST x..x-4
 * NORTHEAST x..x+4, y..y-4
 * NORTHWEST x..x-4, y..y-4
 * SOUTHEAST x..x+4, y..y+4
 * SOUTHWEST x..x-4, y..y+4
 */
const getXMASOccurrences = (x: number, y: number, array2d: string[][]): number => {
  const slot = Array.from({ length: 4 });
  const slices = [];

  if (!(array2d[y][x] === 'X')) {
    return 0;
  }

  // NORTH
  if (y >= 3) {
    slices.push(slot.map((_, i) => array2d[y - i][x]).join(''));
  }

  // SOUTH
  if (y <= array2d[0].length - 4) {
    slices.push(slot.map((_, i) => array2d[y + i][x]).join(''));
  }

  // EAST
  if (x <= array2d.length - 4) {
    slices.push(slot.map((_, i) => array2d[y][x + i]).join(''));
  }

  // WEST
  if (x >= 3) {
    slices.push(slot.map((_, i) => array2d[y][x - i]).join(''));
  }

  // NORTHEAST
  if (y >= 3 && x <= array2d.length - 4) {
    slices.push(slot.map((_, i) => array2d[y - i][x + i]).join(''));
  }

  // NORTHWEST
  if (y >= 3 && x >= 3) {
    slices.push(slot.map((_, i) => array2d[y - i][x - i]).join(''));
  }

  // SOUTHEAST
  if (y <= array2d[0].length - 4 && x <= array2d.length - 4) {
    slices.push(slot.map((_, i) => array2d[y + i][x + i]).join(''));
  }

  // SOUTHWEST
  if (y <= array2d[0].length - 4 && x >= 3) {
    slices.push(slot.map((_, i) => array2d[y + i][x - i]).join(''));
  }

  return slices.filter((slice) => slice === 'XMAS').length;
};

let occurrences = 0;
array2d.forEach((line, y) => {
  line.forEach((_, x) => {
    if (!(array2d[y][x] === 'X')) {
      return;
    }
    occurrences += getXMASOccurrences(x, y, array2d);
  });
});

console.log('XMAS occurrences: ', occurrences);

// part 2: check occurrences of X-MAS

/**
 * checks if the word MAS or SAM is present in the diagonal slices surrounding the coordinates.
 */
const isXMAS = (x: number, y: number, array2d: string[][]): boolean => {
  const slot = Array.from({ length: 3 });
  const slices = [];

  // avoid out of bounds
  if (
    !(array2d[y][x] === 'A') ||
    y === 0 ||
    x === array2d.length - 1 ||
    y === 0 ||
    y === array2d[0].length - 1
  ) {
    return false;
  }

  // NORTHWEST -> SOUTHEAST (diagonal)
  slices.push(slot.map((_, i) => array2d[y - 1 + i][x - 1 + i]).join(''));

  // SOUTHWEST -> NORTHEAST (diagonal)
  slices.push(slot.map((_, i) => array2d[y + 1 - i][x - 1 + i]).join(''));

  return slices.every((slice) => slice === 'MAS' || slice === 'SAM');
};

occurrences = 0;

array2d.forEach((line, y) => {
  line.forEach((_, x) => {
    if (!(array2d[y][x] === 'A')) {
      return;
    }
    if (isXMAS(x, y, array2d)) {
      occurrences++;
    }
  });
});

console.log('X-MAS occurrences: ', occurrences);

const endTime = performance.now();
console.log('execution time: ', endTime - startTime, 'ms');
