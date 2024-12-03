import { isEmpty } from 'lodash-es';
import { reportsInput } from './source/2024-2-input';

const startTime = performance.now();

// preprocess reports
const reports = reportsInput
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => !isEmpty(line))
  .map((line) => line.split(' ').map(Number));

/**
 * Get the differences between levels in a report
 */
const getDifferences = (report: number[]): number[] =>
  report.flatMap((level, i, array) => (i === array.length - 1 ? [] : array[i + 1] - level));

const differences = reports.map(getDifferences);

/**
 * a report is considered safe when all differences are between -3 and -1 or 1 and 3
 */
const getSafety = (differences: number[]): boolean => {
  return (
    differences.every((diff) => diff <= -1 && diff >= -3) ||
    differences.every((diff) => diff >= 1 && diff <= 3)
  );
};

// part 1: calculate safety of the differences directly
const safety = differences.map(getSafety).filter(Boolean).length;
console.log('safety', safety);

// part 2: calculate safety with dampener
const safetyWithDampener = reports
  .map((report) =>
    // whole array and the permutations when skipping  one level
    [report, ...report.map((_, i, array) => [...array.slice(0, i), ...array.slice(i + 1)])]
      .map(getDifferences)
      .some(getSafety),
  )
  .filter(Boolean).length;

console.log('safetyWithDampener', safetyWithDampener);

const endTime = performance.now();

console.log('execution time: ', endTime - startTime, 'ms');
