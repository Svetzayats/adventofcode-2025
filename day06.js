import {input} from './inputs/day06.js'
/**
 * https://adventofcode.com/2025/day/6
 * Cephalopod math
 */

const example = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const data = prepareData(input);

/** PART 1 */
function getNumbersFromLine(line) {
  const separatorRegex = /\s*([^\s]+)\s*/;
  const numbers = line.split(separatorRegex).filter(Boolean).map(Number);
  return numbers;
}

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function getOperation(sign) {
  switch (sign) {
    case '+':
    return sum;
    case '*': 
    return multiply;
  }
}

function getDefaultForEmpty(operation) {
  switch (operation) {
    case '+':
    return 0;
    case '*': 
    return 1;
  }
}

function operateLine(res, line, operations) {
  const numbers = getNumbersFromLine(line);
  res.forEach((n, index) => {
    const number = numbers[index]; 
    const operation = getOperation(operations[index]);
    res[index] = operation(n, number);
  }); 
}

function handleLines(lines, operations) {
  const res = new Array(operations.length).fill(null).map((el, index) => getDefaultForEmpty(operations[index]));
  lines.forEach((line, index) => {
    operateLine(res, line, operations);
  }); 
  return res;
}


const resultingLine = handleLines(data.numbers, data.operations);

const res = resultingLine.reduce((acc, curr) => acc + curr, 0)
console.log('res', res);



/** PREPARE DATA */
function prepareData(data) {
  const lines = data.split('\n'); 
  const operations = lines.at(-1).replaceAll(' ', '').split('');
  return {
    numbers: lines.slice(0, lines.length - 1),
    operations,
  }
}

