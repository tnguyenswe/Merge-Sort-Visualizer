// Get merge sort animations function that takes an array argument.
export function getMergeSortAnimations(array) {
    // Animations variable used to store information regarding to which values need to be animated
    const animations = [];
    // Base case
    if (array.length <= 1) return array;
    // We use a helper array as you would be overwriting values in the original array with merge sort which would ruin the algorithm.
    const helperArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
    return animations;
  }
  
  // Merge sort helper method which executes merge sort.
  const mergeSortHelper = ( originalArray, startingIndex, endIndex, helperArray, animations) => 
  {
    if (startingIndex === endIndex) return;
    // Split array into halves, giving a start and end index for each sort
    const middleIdx = Math.floor((startingIndex + endIndex) / 2);
    // Recursive functions to perform split the array into halves
    mergeSortHelper(helperArray, startingIndex, middleIdx, originalArray, animations);
    mergeSortHelper(helperArray, middleIdx + 1, endIndex, originalArray, animations);
    doMerge(originalArray, startingIndex, middleIdx, endIndex, helperArray, animations);
  }
  
  // Merge function for merge step in merge sort.
  const doMerge = ( originalArray, startingIndex, middleIdx, endIndex, helperArray, animations) => 
  {
    // We set both i and k to startingIndex as we will be updating the starting index value occasionally.
    let i = startingIndex;
    let k = startingIndex;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIndex) {
      // These are the comparison values, we push them to animations to change their colors to show they're being compared.
      animations.push([i, j]);
      // We push them a second time to revert their colors.
      animations.push([i, j]);
      if (helperArray[i] <= helperArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the helper array.
        animations.push([k, helperArray[i]]);
        originalArray[k++] = helperArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the helper array.
        animations.push([k, helperArray[j]]);
        originalArray[k++] = helperArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the helper array.
      animations.push([k, helperArray[i]]);
      originalArray[k++] = helperArray[i++];
    }
    while (j <= endIndex) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the helper array.
      animations.push([k, helperArray[j]]);
      originalArray[k++] = helperArray[j++];
    }
  }