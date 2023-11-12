// Fibonacci sequence - returns an array
// iterative

function fibs(n) {
  let arr = [0, 1];
  for (let i = 1; i < n - 1; i++) {
    arr.push(arr[i - 1] + arr[i]);
  }
  return arr;
}

// recursive

function fibsRec(n, a = 0, b = 1, arr = []) {
  if (n === 0) {
    return arr;
  }
  arr.push(a);
  return fibsRec(n - 1, b, a + b, arr);
}
