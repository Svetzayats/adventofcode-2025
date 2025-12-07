import { input } from "./inputs/day03.js";
/**
 * https://adventofcode.com/2025/day/3
 * Batteries and a joltage
 */

const example = `987654321111111
811111111111119
234234234234278
818181911112111`;

const data = prepareData(example);
const maxJoltagesForBatteries = data.map(battery => findMaxJoltagesForBattery(battery)); 
const sum1 = maxJoltagesForBatteries.reduce((acc, cur) => {
  const joltage = Number(cur.join(''));
  return acc + joltage;
}, 0); 
console.log('sum1', sum1)

/** PART 1 */
function findMaxJoltagesForBattery(battery) {
  let first = '';
  let last = '';
  let pointer = 0; 
  while (pointer < battery.length) {
    const current = battery[pointer];
    if (pointer === battery.length -1) {
      // implicit coercion works for us here and further
      if (last < current) {
        last = current;
      }
      pointer++;
      continue;
    }
    if (current > first) {
      first = current;
      last = battery[pointer+1];
      pointer++;
      continue;
    } 

    if (current > last) {
      last = current;
    }
    pointer++;

  }
  return [first, last]
}

/** PART 2 */
const LENGTH = 12; 
function getMonotonicStackOfMinimalLength(bank, minLength) {
  const arr = bank.split('');
  const stack = [];
  for (let i=0; i<arr.length; i++) {
    const current = arr[i];
    if (current < stack.at(-1)) {
      stack.push(current); 
    } else {

      while (arr.length - i > minLength - stack.length && stack.at(-1) < current) {
        stack.pop();
      }
      stack.push(current);
    }
  }

  return stack;
}

function get12LargestDigits(bank) {
  return getMonotonicStackOfMinimalLength(bank, LENGTH).slice(0, 12);
}

function getBiggestNumber(bank) {
  return Number(get12LargestDigits(bank).join(''));
}

const results = data.map(bank => getBiggestNumber(bank));
const sum2 = results.reduce((acc, cur) => acc + cur, 0);
console.log('sum2', sum2);

/** PREPARING DATA */
function prepareData(data) {
  const arr = data.split('\n').map(bankStr => bankStr.trim());
  return arr;
}