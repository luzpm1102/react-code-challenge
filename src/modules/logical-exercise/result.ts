export function fewerChangeSheets(array: number[]): number {
  let min = Infinity;

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const difference = array[i] - array[j];

      if (difference > 0 && difference < min) {
        min = difference;
      }
    }
  }

  return min;
}
