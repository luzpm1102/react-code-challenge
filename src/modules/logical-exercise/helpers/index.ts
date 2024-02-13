/**
 * Generates a random integer between two values.
 *
 * @param {number} [min=3] - The lower bound of the range (inclusive). Defaults to 3.
 * @param {number} [max=10] - The upper bound of the range (inclusive). Defaults to 10.
 * @returns {number} A random integer between min and max (inclusive).
 */
export function getRandomInt(min = 3, max = 10): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an array of unique random integers from 1 up to the specified length.
 * Ensures that there's at least one number in the array that is larger than all the numbers to its right.
 *
 * @param {number} length - The number of elements in the array and the maximum possible value of an integer.
 *
 * @returns {number[]} An array of unique random integers.
 *
 * @example
 * // Returns an array of 5 unique random integers between 1 and 5 (inclusive)
 * generateRandomArray(5);
 */
export function generateRandomArray(length: number = getRandomInt()): number[] {
  const numbers = Array.from({ length: length - 1 }, (_, i) => i + 1);
  const result = [];

  const maxNumberIndex = Math.floor(Math.random() * length);
  for (let i = 0; i < length; i++) {
    if (i === maxNumberIndex) {
      result.push(length);
    } else {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
  }

  return result;
}
