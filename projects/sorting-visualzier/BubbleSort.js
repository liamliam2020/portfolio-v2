// performs bubble sort on a given array and then
// determines all the different bar moves to animate

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  bubbleSortHelper(array, array.length - 1, animations);

  return animations;
}

function bubbleSortHelper(array, endIndex, animations) {
  for (let i = 0; i < endIndex; i++) {
    for (let j = 0; j < endIndex - i; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);

      if (array[j] > array[j + 1]) {
        let swappedVal = array[j];

        animations.push([j, array[j + 1]]);
        array[j] = array[j + 1];
        animations.push([j + 1, swappedVal]);
        array[j + 1] = swappedVal;
      } else {
        animations.push([j, array[j]]);
        animations.push([j + 1, array[j + 1]]);
      }
    }
  }
}
