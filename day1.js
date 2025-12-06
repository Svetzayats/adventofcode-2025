import {input} from './inputs/day1.js';

/**
 * https://adventofcode.com/2025/day/1 
 * A secret entrance - a dial from 0 to 99 
 */

/** PART 1 */
const START = 0;
const END = 99; 
const FULL_CIRCLE = END - START + 1;  

const inputexample = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const rotations = parse(input);
let position = 50;
let zeroHit = 0;

rotations.forEach((rotation) => {
  position = rotate(position, rotation.direction, rotation.distance)
  if (position === 0) {
    zeroHit++;
  }
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

/** PART 1 - all 0s */
function rotateAndCount0(current, direction, distance) {
  let hits = parseInt(distance / FULL_CIRCLE);
  let rotationRes;
  if (direction === 'L') {
    rotationRes = rotateLeftAndCount0(current, distance);
  } else {
    rotationRes = rotateRightAndCount0(current, distance);
  }
  return {
    position: rotationRes.position,
    hit: hits + rotationRes.hit,
  }
}

function rotateRightAndCount0(current, distance) {
  const resDistance = distance % FULL_CIRCLE;
  const distanceToEnd = FULL_CIRCLE - current;
  if (distanceToEnd === resDistance) {
    return {
      position: 0,
      hit: 1,
    };
  } else if (distanceToEnd > resDistance) {
    return {
      position: current + resDistance,
      hit: 0,
    };
  } else {
    const diff = resDistance - distanceToEnd; 
    return {
      position: START + diff,
      hit: distanceToEnd === 0 ? 0 : 1,
    };
  }

}
function rotateLeftAndCount0(current, distance) {
  const resDistance = distance % FULL_CIRCLE;
  const distanceToStart = current - START; 
  if (distanceToStart === resDistance) {
    return {
      position: 0,
      hit: 1,
    };
  } else if (distanceToStart > resDistance) {
    return {
      position: current - resDistance,
      hit: 0
    }; 
  } else {
    const diff = resDistance - distanceToStart; 
    return {
      position: FULL_CIRCLE - diff,
      hit: distanceToStart === 0 ? 0 : 1,
    };
  }
}

let positionForSecondPart = 50;
let allZeroHit = 0; 
rotations.forEach((rotation, index) => {
  const res = rotateAndCount0(positionForSecondPart, rotation.direction, rotation.distance); 
  allZeroHit += res.hit;
  positionForSecondPart = res.position;
})

console.log('result 2', allZeroHit)

