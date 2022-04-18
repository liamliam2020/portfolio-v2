// performs shell sort on a given array and then
// determines all the different bar moves to animate

export function getShellSortAnimations(array) {
  const animations = [];

  if (array.length <= 1) return array;
  ShellSortHelper(array, array.length, animations);

  return animations;
}

function ShellSortHelper(array, length, animations) {
  for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < length; i++) {
      let targetValue = array[i];
      let j;
      let animateFlag = 0;

      animations.push([i, gap]);
      animations.push([i, gap]);

      for (j = i; j >= gap && array[j - gap] > targetValue; j -= gap) {
        if (animateFlag > 0) {
          animations.push([i, gap]);
          animations.push([i, gap]);
        }

        animations.push([j, array[j - gap]]);
        array[j] = array[j - gap];
        animations.push([j - gap, targetValue]);
        array[j - gap] = targetValue;

        animateFlag++;
      }

      if (animateFlag === 0) {
        animations.push([j, array[j]]);
        animations.push([j, array[j]]);
      }
    }
  }
}
