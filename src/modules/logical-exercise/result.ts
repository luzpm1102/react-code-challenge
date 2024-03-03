export function fewerChangeSheets(array: number[]): number {
  let min = Infinity;
  let prevIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (i - prevIndex <= 2) {
      const difference = array[prevIndex] - array[i];
      if (difference >= 0 && difference < min) {
        min = difference;
      }
    } else {
      prevIndex = i - 1;
    }
  }

  return min;
}
