const isNumber = (x) => typeof x === 'number'

export const mapIndexToTop = (index, max) => {
  if (!isNumber(index) || !isNumber(max)) {
    throw new TypeError('index and max must be number')
  }

  // index === 2n * max or index === 0
  if ((index % (2 * max)) === 0) {
    return 0
  }
  // index === n * max
  if ((index % max) === 0) {
    return max
  }
  // index (0, max)  y = x
  const mod = Math.abs(index) % (2 * max)
  if (mod < max) {
    return mod
  }
  // index (max, 2 * max)  y = -x + 2max
  if (mod > max) {
    return -mod + (2 * max)
  }
}

export const mapIndexToBottom = (index, max) => {
  return max - mapIndexToTop(index, max)
}
