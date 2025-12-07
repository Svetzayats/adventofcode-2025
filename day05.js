import {input} from './inputs/day05.js'
/**
 * https://adventofcode.com/2025/day/5
 */

const example = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

/** PART 1 */
const [ranges, ingredients] = prepareData(input); 
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

/** PREPARING DATA */
function prepareData(data) {
  const res = data.split('\n\n').map(el => el.trim()).map(el => el.split('\n').map(el => el.trim()));
  return res;
}
