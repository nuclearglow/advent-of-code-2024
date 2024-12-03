import fs from 'node:fs';
import path from 'node:path';
import { instructionsControl } from './source/2024-3-input';

// extract valid instructions
const regex = /mul\((?<x>\d+),(?<y>\d+)\)/g;

const instructionsPath = path.resolve(path.join(__dirname, 'source', '2024-3-input.txt'));
const instructions = fs.readFileSync(instructionsPath, 'utf-8');

function getInstructions(instructions: string): number {
  const matches = [...instructions.matchAll(regex)];

  return matches
    .flatMap((match) => {
      const { x, y } = match.groups as { x: string; y: string };

      if (!x || !y) {
        return [];
      }

      const result = Number(x) * Number(y);

      if (isNaN(result)) {
        return [];
      }

      return result;
    })
    .reduce((acc, curr) => acc + curr, 0);
}

// part 1: calculate the result of the instructions
console.log('control result: ', getInstructions(instructionsControl));
console.log('result: ', getInstructions(instructions));

// part 2: extract enabled instructions, global regexp do not work so well due to nested markers, to be sure, loop and extract the disabled instructions one by one
let cleanedInstructions = instructions;
let loop = true;

while (loop) {
  const start = "don't()";
  const end = 'do()';

  // find the string indices of the next markers
  const dontIndex = cleanedInstructions.indexOf(start);
  let doIndex = cleanedInstructions.indexOf(end, dontIndex);

  // last marker found, retain the rest, break the loop
  if (doIndex === -1) {
    doIndex = cleanedInstructions.length;
    loop = false;
  }

  // cut away the disabled instructions
  cleanedInstructions =
    cleanedInstructions.slice(0, dontIndex) + cleanedInstructions.slice(doIndex + end.length);
}

console.log('branched result: ', getInstructions(cleanedInstructions));
