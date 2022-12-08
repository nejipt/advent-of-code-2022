const { getElfThatCarriesMostCalories, getTopThreeElvesThatCarryMostCalories } = require('../days/day-one');

describe('part one', () => {
  test('empty input', () => {
    const input = '';

    const result = getElfThatCarriesMostCalories(input);

    expect(result).toStrictEqual(null);
  });

  test('input with one elf', () => {
    const input = `2000
    3000`;

    const result = getElfThatCarriesMostCalories(input);

    expect(result.index).toStrictEqual(0);
    expect(result.carriedCalories).toStrictEqual(5000);
  });

  test('gets correct elf with highest calories', () => {
    const input = `2000
    3000
    
    3000
    3000
    
    5000
    6000
    
    1000
    1000
    
    10000`;

    const result = getElfThatCarriesMostCalories(input);

    expect(result.carriedCalories).toStrictEqual(11000);
    expect(result.index).toStrictEqual(2);
  });
});

describe('part two', () => {
  test('empty input', () => {
    const input = '';

    const result = getTopThreeElvesThatCarryMostCalories(input);

    expect(result).toStrictEqual(null);
  });

  test('input with less than 3 elves', () => {
    const inputWithOneElf = '1000';

    const inputWithTwoElves = `1000
    
    2000`;

    const resultForInputWithOneElf = getTopThreeElvesThatCarryMostCalories(inputWithOneElf);
    const resultForInputWithTwoElves = getTopThreeElvesThatCarryMostCalories(inputWithTwoElves);

    expect(resultForInputWithOneElf).toStrictEqual(null);
    expect(resultForInputWithTwoElves).toStrictEqual(null);
  });

  test('gets correct elves with highest calories', () => {
    const input = `1000
    
    2000
    
    3000
    
    5010
    
    4210
    
    1000
    
    2000
    
    60200
    
    1
    
    2`;

    const result = getTopThreeElvesThatCarryMostCalories(input)
      .sort((elfA, elfB) => elfA.index - elfB.index);

    expect(result.length).toStrictEqual(3);

    expect(result[0].index).toStrictEqual(3);
    expect(result[0].carriedCalories).toStrictEqual(5010);

    expect(result[1].index).toStrictEqual(4);
    expect(result[1].carriedCalories).toStrictEqual(4210);

    expect(result[2].index).toStrictEqual(7);
    expect(result[2].carriedCalories).toStrictEqual(60200);

    expect(result[0].carriedCalories + result[1].carriedCalories + result[2].carriedCalories)
      .toStrictEqual(69420);
  });
});
