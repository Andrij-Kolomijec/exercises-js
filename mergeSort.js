function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let halfIndex = Math.floor(arr.length / 2);
  return merge(
    mergeSort(arr.slice(0, halfIndex)),
    mergeSort(arr.slice(halfIndex))
  );
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
