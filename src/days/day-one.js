function getListOfFoodItemsAsCalories(input) {
  return input.split('\n')
    .map((calories) => calories.trim())
    .map((calories) => (calories !== '' ? Number.parseInt(calories, 10) : calories));
}

function isLastItem(index, listLength) {
  return index === listLength - 1;
}

function tallyElves(listOfFoodItemsAsCalories) {
  const elves = [];

  listOfFoodItemsAsCalories.reduce(
    (caloriesElfBeingTalliedCarries, caloriesOfCurrentItem, index) => {
      if (caloriesOfCurrentItem === '') {
        elves.push(caloriesElfBeingTalliedCarries);
        return 0;
      }

      const currentTallyOfCaloriesCarried = caloriesOfCurrentItem + caloriesElfBeingTalliedCarries;

      if (isLastItem(index, listOfFoodItemsAsCalories.length)) {
        elves.push(currentTallyOfCaloriesCarried);
        return 0;
      }

      return currentTallyOfCaloriesCarried;
    },
    0,
  );

  return elves;
}

function findElfThatCarriesMostCalories(elves) {
  let elfCarryingMostCalories = null;

  for (let index = 0; index < elves.length; index += 1) {
    const caloriesCurrentElfCarries = elves[index];

    if (elfCarryingMostCalories === null) {
      elfCarryingMostCalories = { carriedCalories: caloriesCurrentElfCarries, index };
    }

    if (caloriesCurrentElfCarries > elfCarryingMostCalories.carriedCalories) {
      elfCarryingMostCalories = { carriedCalories: caloriesCurrentElfCarries, index };
    }
  }

  return elfCarryingMostCalories;
}

function isCurrentElfCarryingMoreCaloriesThanCurrentTopThree(
  elvesCarryingMostCalories,
  caloriesCurrentElfCarries,
) {
  return elvesCarryingMostCalories
    .findIndex((elf) => elf.carriedCalories < caloriesCurrentElfCarries) !== -1;
}

function removeElfCarryingLeastCalories(elves) {
  const elfCarryingLeastCalories = elves.reduce(
    (elfCurrentlyCarryingLeastCalories, currentElf) => {
      if (elfCurrentlyCarryingLeastCalories === null) {
        return currentElf;
      }

      if (currentElf.carriedCalories < elfCurrentlyCarryingLeastCalories.carriedCalories) {
        return currentElf;
      }

      return elfCurrentlyCarryingLeastCalories;
    },
    null,
  );

  const indexOfElfToBeRemoved = elves.findIndex((elf) => elf === elfCarryingLeastCalories);

  return elves.splice(indexOfElfToBeRemoved, 1);
}

function findThreeElfThatCarryMostCalories(elves) {
  return elves.reduce(
    (elvesCarryingMostCalories, caloriesCurrentElfCarries, index) => {
      if (elvesCarryingMostCalories.length < 3) {
        elvesCarryingMostCalories.push({ carriedCalories: caloriesCurrentElfCarries, index });
        return elvesCarryingMostCalories;
      }

      if (isCurrentElfCarryingMoreCaloriesThanCurrentTopThree(
        elvesCarryingMostCalories,
        caloriesCurrentElfCarries,
      )) {
        elvesCarryingMostCalories.push({ carriedCalories: caloriesCurrentElfCarries, index });
        removeElfCarryingLeastCalories(elvesCarryingMostCalories);
      }

      return elvesCarryingMostCalories;
    },
    [],
  );
}

function getElfThatCarriesMostCalories(input) {
  if (input === '') return null;

  const listOfFoodItemsAsCalories = getListOfFoodItemsAsCalories(input);

  const elves = tallyElves(listOfFoodItemsAsCalories);

  return findElfThatCarriesMostCalories(elves);
}

function getTopThreeElvesThatCarryMostCalories(input) {
  if (input === '') return null;

  const listOfFoodItemsAsCalories = getListOfFoodItemsAsCalories(input);

  const elves = tallyElves(listOfFoodItemsAsCalories);

  if (elves.length < 3) return null;

  return findThreeElfThatCarryMostCalories(elves);
}

module.exports = {
  getElfThatCarriesMostCalories,
  getTopThreeElvesThatCarryMostCalories,
};
