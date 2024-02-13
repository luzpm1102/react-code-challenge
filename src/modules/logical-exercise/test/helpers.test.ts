import { generateRandomArray, getRandomInt } from "../helpers";

describe("getRandomInt()", () => {
  it("should return a number", () => {
    const result = getRandomInt();
    expect(typeof result).toBe("number");
  });

  it("should return a number within the specified range", () => {
    const min = 5;
    const max = 10;
    const result = getRandomInt(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it("should return an integer", () => {
    const result = getRandomInt();
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("generateRandomArray()", () => {
  it("should return an array of the correct length", () => {
    const length = 5;
    const result = generateRandomArray(length);
    expect(result.length).toEqual(length);
  });

  it("should return an array with unique numbers", () => {
    const length = 5;
    const result = generateRandomArray(length);
    const uniqueResult = Array.from(new Set(result));
    expect(result).toEqual(uniqueResult);
  });

  it("should return an array where at least one number is larger than all the numbers to its right", () => {
    const length = 5;
    const result = generateRandomArray(length);
    const maxNumber = Math.max(...result);
    const maxNumberIndex = result.indexOf(maxNumber);
    const numbersToRight = result.slice(maxNumberIndex + 1);
    expect(Math.max(...numbersToRight)).toBeLessThan(maxNumber);
  });
});
