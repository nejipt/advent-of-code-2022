const fs = require('fs');
const path = require('path');
const { getElfThatCarriesMostCalories, getTopThreeElvesThatCarryMostCalories } = require('../days/day-one');

const dayOneInput = fs.readFileSync(path.join(__dirname, '../inputs/day-one.input.txt')).toString();

const elfCarryingMostCalories = getElfThatCarriesMostCalories(dayOneInput);
const topThreeElvesCarryingMostCalories = getTopThreeElvesThatCarryMostCalories(dayOneInput);

console.log(elfCarryingMostCalories.calories);

const sumOfCalloriesCarriedByTopThreeElves = topThreeElvesCarryingMostCalories
  .reduce(
    (sumOfCalories, currentElf) => sumOfCalories + currentElf.calories,
    0,
  );

console.log(sumOfCalloriesCarriedByTopThreeElves);
