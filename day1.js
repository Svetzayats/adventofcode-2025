import {input} from './inputs/day1.js';

/**
 * https://adventofcode.com/2025/day/1 
 * A secret entrance - a dial from 0 to 99 
 */

/** PART 1 */
const START = 0;
const END = 99; 
const FULL_CIRCLE = END - START + 1;  

const rotations = parse(input);
let position = 50;
let zeroHit = 0;

rotations.forEach((rotation, index) => {
  position = rotate(position, rotation.direction, rotation.distance)
  if (position === 0) {
    zeroHit++;
  }
  console.log(`after ${index} rotation`, position);
})

console.log('result', zeroHit)

function rotate(current, direction, distance) {
  if (direction === 'L') {
    return rotateLeft(current, distance);
  } else {
    return rotateRight(current, distance);
  }
}

function rotateRight(current, distance) {
  const resDistance = distance % FULL_CIRCLE;
  const distanceToEnd = FULL_CIRCLE - current;
  if (distanceToEnd === resDistance) {
    return 0;
  } else if (distanceToEnd > resDistance) {
    return current + resDistance;
  } else {
    const diff = resDistance - distanceToEnd; 
    return START + diff;
  }

}
function rotateLeft(current, distance) {
  const resDistance = distance % FULL_CIRCLE;
  const distanceToStart = current - START; 
  if (distanceToStart === resDistance) {
    return 0;
  } else if (distanceToStart > resDistance) {
    return current - resDistance; 
  } else {
    const diff = resDistance - distanceToStart; 
    return FULL_CIRCLE - diff;
  }
}

function parse(data) {
  const rotations = data.split(`\n`).map(el => {
    const str = el.trim(); 
    const regex = /([LR])(\d+)/;
    const [, direction, strDistance] = str.match(regex);
    return {
      direction,
      distance: Number(strDistance)
    }
  });
  return rotations;
}

