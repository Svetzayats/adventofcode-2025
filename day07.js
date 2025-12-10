import {input} from './inputs/day07.js'
/**
 * https://adventofcode.com/2025/day/7
 * tachyon manifold - beam and splitters 
 */

const example = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

const matrix = prepareData(input);

/** PART 1 */
const startPosition = matrix[0].findIndex(el => el === 'S');
const res = moveAndCount(matrix, startPosition);
console.log('res', res)
function move(positions, line) {
  const newPositions = [];
  let splitters = 0;
  positions.forEach(position => {
    const path = line[position];
    if (path === '^') {
      splitters++;
      if (position > 0) {
        if (!newPositions.includes(position - 1)) {
          newPositions.push(position - 1);
        }
      }
      if (position < line.length - 1) {
        if (!newPositions.includes(position + 1)) {
          newPositions.push(position + 1);
        }
      }
    } else {
      if (!newPositions.includes(position)) {
        newPositions.push(position);
      }
    }
  }); 
  return {
    newPositions, 
    splitters,
  };
}

function moveAndCount(matrix, startPosition) {
  let positions = [startPosition];
  let splitters = 0;

  for (let i = 1; i < matrix.length; i++) {
    const line = matrix[i]; 
    const {newPositions, splitters: addedSplitters} = move(positions, line);
    splitters += addedSplitters;
    positions = newPositions;
  }

  return splitters;
}

/** PREPARE DATA */
function prepareData(input) {
  const data = input.split('\n').map(row => row.split(''));
  return data;
}