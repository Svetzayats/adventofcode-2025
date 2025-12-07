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

const data = prepareData(example);
/** PART 1 */
const res = countPaperRollsForForkLift(data);
console.log('res', res)
function countPaperRollsForForkLift(matrix) {
  let paperRolls = 0;
  matrix.forEach((row, rowIndex) => {
    row.forEach((column, colIndex) => {
      if (column === '@') {
        const neighbours = getNeighbours(rowIndex, colIndex, matrix);
      const neighbourPaperRolls = neighbours.filter(n => n === '@');
      if (neighbourPaperRolls.length < 4) {
        paperRolls++;
      }
      }
    });
  })

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

/** PREPARING DATA */
function prepareData(data) {
  return data.split('\n').map(str => str.trim()).map(row => row.split(''))
}

