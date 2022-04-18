// performs quick sort on a given array and then
// determines all the different bar moves to animate

export function getQuickSortAnimations(array) {
  const animations = [];

  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);

  return animations;
}

function quickSortHelper(array, left, right, animations) {
  if (left < right) {
    let partitionIndex = partiton(array, left, right, animations);
    quickSortHelper(array, left, partitionIndex - 1, animations);
    quickSortHelper(array, partitionIndex + 1, right, animations);
  }
}

function partiton(array, left, right, animations) {
  let pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    animations.push([j, right]);
    animations.push([j, right]);
    if (array[j] <= pivot) {
      i++;

      let swappedVal = array[i];
      animations.push([i, array[j]]);
      array[i] = array[j];
      animations.push([j, swappedVal]);
      array[j] = swappedVal;
    } else {
      animations.push([j, array[j]]);
      animations.push([j, array[j]]);
    }
    // exit for loop check for pivot animation
    if (j !== right - 1) {
      animations.push([j, array[j]]);
      animations.push([j, array[j]]);
    }
  }

  // swap the pivot
  let swappedVal = array[i + 1];
  animations.push([i + 1, array[right]]);
  array[i + 1] = array[right];
  animations.push([right, swappedVal]);
  array[right] = swappedVal;

  return i + 1;
}
