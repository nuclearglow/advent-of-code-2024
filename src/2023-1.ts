import { isEmpty, isNil } from 'lodash-es';
import { trebuchetCalibration } from './source/2023-1-input';

const result = trebuchetCalibration
  .split('\n')
  .flatMap((line) => {
    if (isEmpty(line)) {
      return [];
    }

    const matches = line.match(new RegExp('\\d', 'g'))?.map(Number);

    if (isNil(matches) || isEmpty(matches)) {
      return [];
    }

    if (matches.length === 1) {
      matches.push(matches[0]);
    }

    const calibration = parseInt(`${matches[0]}${matches[matches.length - 1]}`);

    console.log(line, 'matches: ', matches, 'calibration: ', calibration);

    return calibration;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log('result:', result);
