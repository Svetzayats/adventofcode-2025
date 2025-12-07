import { input } from "./inputs/day04.js";
/**
 * https://adventofcode.com/2025/day/4
 * Rolls of paper and forklifts
 */
const example = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const data = prepareData(input);

/** PART 1 */
const res1 = getPaperRollsForForkLift(data).length;
console.log('res1', res1)
function getPaperRollsForForkLift(matrix) {
  let paperRolls = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((column, colIndex) => {
      if (column === '@') {
        const neighbours = getNeighbours(rowIndex, colIndex, matrix);
      const neighbourPaperRolls = neighbours.filter(n => n === '@');
      if (neighbourPaperRolls.length < 4) {
        paperRolls.push([rowIndex, colIndex]);
      }
      }
    });
  });

  return paperRolls;
}
function getNeighbours(row, col, matrix) {
  const res = [];
  const rowLength = matrix[0].length;
  /** Add elements from previous row if exists */
  if (row > 0) {
    const prevRow = row - 1; 
    if (col > 0) {
      res.push(matrix[prevRow][col - 1]);
    } 
    if (col < rowLength - 1) {
      res.push(matrix[prevRow][col + 1])
    }
    res.push(matrix[prevRow][col]);
  }
  /** Add elements from the same row */
  if (col > 0) {
    res.push(matrix[row][col - 1]);
  } 
  if (col < rowLength - 1) {
    res.push(matrix[row][col + 1]);
  }

  /** Add elements from the next row */
  if (row < matrix.length - 1) {
    const nextRow = row + 1;
    if (col > 0) {
      res.push(matrix[nextRow][col - 1]);
    } 
    if (col < rowLength - 1) {
      res.push(matrix[nextRow][col + 1])
    }
    res.push(matrix[nextRow][col]);
  }
  return res;
}

/** PART 2 */
const res2 = getAllRemovedPaperRolls(data).length;
console.log('res2', res2)
function getAllRemovedPaperRolls(matrix) {
  const paperRolls = [];
  const matrixWithHistory = structuredClone(matrix);
  let paperRollsForForkLift = getPaperRollsForForkLift(matrixWithHistory);

  while (paperRollsForForkLift.length) {
    paperRolls.push(...paperRollsForForkLift);
    paperRollsForForkLift.forEach(pos => {
      const [row, column] = pos;
      matrixWithHistory[row][column] = 'X';
    });
    paperRollsForForkLift = getPaperRollsForForkLift(matrixWithHistory);
  }

  return paperRolls;
}

/** PREPARING DATA */
function prepareData(data) {
  return data.split('\n').map(str => str.trim()).map(row => row.split(''))
}

