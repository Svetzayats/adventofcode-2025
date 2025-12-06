import { input } from "./inputs/day03.js";
/**
 * https://adventofcode.com/2025/day/3
 * Batteries and a joltage
 */

const example = `987654321111111
811111111111119
234234234234278
818181911112111`;

const data = prepareData(input);
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

/** PREPARING DATA */
function prepareData(data) {
  const arr = data.split('\n').map(bankStr => bankStr.trim());
  return arr;
}