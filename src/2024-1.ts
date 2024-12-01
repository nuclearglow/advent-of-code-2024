import { isEmpty, unzip, zip } from 'lodash-es';
import { coordinates } from './source/2024-1-input';

// prepare left and right coordinates
const [left, right] = unzip(
  coordinates
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !isEmpty(line))
    .map((line) => {
      const [left, right] = line.split(/\s+/);

      return [Number.parseInt(left), Number.parseInt(right)];
    })
    .filter((line) => !isEmpty(line)),
);

// sort left and right coordinates
[left, right].forEach((coords) => {
  coords.sort();
});

// task 1: calculate distance
const distance = zip(left, right)
  .map(([left, right]) => Math.abs((right ?? 0) - (left ?? 0)))
  .reduce((acc, curr) => acc + curr, 0);

console.log('distance', distance);

// task 2: calculate similarity score
const similarityScore = left
  .map((leftCoord) => {
    const appearanceRight = right.filter((rightCoord) => rightCoord === leftCoord)?.length ?? 0;
    return leftCoord * appearanceRight;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log('similarityScore', similarityScore);