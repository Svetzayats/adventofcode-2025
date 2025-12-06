import { input } from "./inputs/day2.js";
/**
 * https://adventofcode.com/2025/day/2 
 * Invalid ids  
 */

/** PART 1 */
const example = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

const data = formatData(input);

const invalidIds = data.reduce((acc, cur) => {
  return [...acc, ...getInvalidIdsForRange(cur, isValidId)]
}, []);

const res = invalidIds.reduce((acc, cur) => acc + cur, 0);
console.log('res1', res);
function getInvalidIdsForRange(range, isValidId) {
  const invalidIds = [];
  let current = range[0];
  while (current <= range[1]) {
    if (!isValidId(current)) {
      invalidIds.push(current);
    }
    current++;
  }
  console.log(`range from ${range[0]} to ${range[1]}`, invalidIds)
  return invalidIds;
}

function isValidId(id) {
  const strId = String(id);
  if (strId.length % 2 === 1) return true;
  const half = strId.length / 2;
  return strId.slice(0, half) !== strId.slice(half);
}

/** PART 2 */
console.log('PART 2')
const invalidIds2 = data.reduce((acc, cur) => {
  return [...acc, ...getInvalidIdsForRange(cur, isValidId2)]
}, []);

const res2 = invalidIds2.reduce((acc, cur) => acc + cur, 0);
console.log('res 2', res2)

function isValidId2(id) {
  const strId = String(id);
  if (strId.length === 1) return true;
  if (new Set(strId.split('')).size === 1) return false;
  if (!isValidId(id)) return false;

  let suggestedLengthOfSequence = parseInt(strId.length / 2);
  while (suggestedLengthOfSequence > 1) {
    const sequence = strId.slice(0, suggestedLengthOfSequence);
    if (!strId.replaceAll(sequence, '')) return false;
    suggestedLengthOfSequence--;
  }
  return true;
}

/** PREPARING DATA */
function formatData(data) {
  return data.split(',').map(range => {
    return range.split('-').map(Number);
  })
}