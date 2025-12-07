import {input} from './inputs/day05.js'
/**
 * https://adventofcode.com/2025/day/5
 * Ids for fresh ingredients
 */

const example = `3-5
10-14
16-20
12-18
9-21

1
5
8
11
17
32`;

const [ranges, ingredients] = prepareData(input); 

/** PART 1 */
const rangesArr = getRanges(ranges); 
const freshIngredients = findFreshIngredients(ingredients, rangesArr); 
console.log(freshIngredients.length)

function getRanges(ranges) {
  return ranges.map(range => range.split('-').map(Number)); 
}

function findFreshIngredients(ingredients, ranges) {
  const freshIngredients = ingredients.filter(ingredient => {
    let i = 0;
    while (i < ranges.length) {
      const [from, to] = ranges[i];
      const isFresh = from <= Number(ingredient) && to >= Number(ingredient); 
      if (isFresh) return true; 
      i++;
    }
    return false;
  })
  return freshIngredients;
}

/** PART 2 */
function getPreparedRanges(ranges) {
  const res = [];
  ranges.forEach(range => {
    const [from, to] = range;
    const rangeWithFromId = res.findIndex(r => {
      const [rFrom, rTo] = r;
      return from >= rFrom && from <= rTo;
    });
    const rangeWithToId = res.findIndex(r => {
      const [rFrom, rTo] = r;
      return to >= rFrom && to <= rTo;
    });
    if (rangeWithFromId !== -1 && rangeWithToId !== -1) {
      if (rangeWithFromId !== rangeWithToId) {
        const rangeWithFrom = res[rangeWithFromId];
        const rangeWithTo = res[rangeWithToId];
        const newRange = [rangeWithFrom[0], rangeWithTo[1]];
        const indexesToRemove = [rangeWithFromId, rangeWithToId].sort((a, b) => b - a);
        indexesToRemove.forEach(index => res.splice(index, 1));
        res.push(newRange);
      }
    } else if (rangeWithFromId !== -1) {
      res[rangeWithFromId][1] = to;
    } else if (rangeWithToId !== -1) {
      res[rangeWithToId][0] = from;
    } else {
      res.push([from, to]);
    }
  });

  let i = 0;

  while (i < res.length) {
    const isThisRangeNested = res.find((r, index) => {
      if (index === i) return false;
      const [from, to] = res[i];
      return r[0] < from && r[1] > to;
    }); 
    if (isThisRangeNested) {
      res.splice(i, 1);
    } else {
      i++;
    }
  }
  return res;
}

const preparedRanges = getPreparedRanges(rangesArr);

function getNumberOfIds(ranges) {
  const res = ranges.reduce((acc, cur) => {
    const [from, to] = cur; 
    return acc + (to - from) + 1;
  }, 0);
  return res;
}

const numberOfIds = getNumberOfIds(preparedRanges);
console.log(numberOfIds)
/** PREPARING DATA */
function prepareData(data) {
  const res = data.split('\n\n').map(el => el.trim()).map(el => el.split('\n').map(el => el.trim()));
  return res;
}
