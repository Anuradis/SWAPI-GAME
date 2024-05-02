// Todo finish supporting reproducible random if time leasts
/**
 * Function gets random reproducable number within number certain range
 *
 * @param {String} seed  - hash sequence to enable reproducable randomization
 * @param {Number} min - min number to search for within randomized calculation
 * @param {Number} max  - max number to search for within randomized calculation
 * @return {Number} - reproducible randomized number within passed ranged
 */
export function generateRandomReproducibleNumber(seed, min, max) {
  const m = 4294967296
  const a = 1664525
  const c = 1013904223
  const x = (a * seed + c) % m
  const scaledValue = min + (x / m) * (max - min)
  return Math.floor(scaledValue)
}

/**
 * Function gets random number within number certain range
 *
 * @param {Number} min - min number(intiger) to search for within randomized calculation
 * @param {Number} max - max number(intiger) to search for within randomized calculation
 * @return {Number} - reproducible randomized number within passed ranged
 */
export function generateRandomNumber(min, max) {
  if (min > max) throw 'min should not be greater than max'

  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Function defines winning card depending on  random number within number certain range
 *
 * @param {Number} min - min number to search for within randomized calculation
 * @param {Number} max - max number to search for within randomized calculation
 * @return {Number} Index - Note: if not found or two similar values found it returns -1
 */
export function getWinningCardIndex(cards, compareAttr) {
  const winningCardIndex = [...cards].findIndex((element, index, array) => {
    // Convert compareAttr property to a number, treating "unknown" as 0 kg
    const compareAttrValue =
      element[compareAttr] === 'unknown' ? 0 : parseFloat(element[compareAttr])
    // Calculate the maximum compareAttrValue among elements, treating "unknown" as 0 kg
    const maxCompareAttrValue = Math.max(
      ...array.map((item) => (item[compareAttr] === 'unknown' ? 0 : parseFloat(item[compareAttr])))
    )
    // Check if the compareAttr value is equal to the maximum compareAttr
    if (compareAttrValue === maxCompareAttrValue) {
      // Check if there are multiple elements with the same maximum compareAttr value
      const maxCompareAttrCount = array.filter(
        (item) =>
          item[compareAttr] !== 'unknown' && parseFloat(item[compareAttr]) === maxCompareAttrValue
      ).length
      return maxCompareAttrCount === 1 // Return true only if there's only one element with the maximum compareAttr value
    }
    return false
  })

  return winningCardIndex
}

/**
 * Function sorts game results fetched from DB base on
 * the difference between player 1's score and player 2's score
 *
 * @param {Array} results - Array of modeled GameResults
 * @param {String} sortDirection - Array of modeled GameResults
 * @return {Array} - Sorted array of modelled GameResults
 */
export function sortByScoreDifference(results, sortDirection = 'desc') {
  const sortedResults = [...results]
  sortedResults.sort((a, b) => {
    const scoreDifferenceA = Math.abs(a.player1.score - a.player2.score)
    const scoreDifferenceB = Math.abs(b.player1.score - b.player2.score)

    if (sortDirection === 'desc') {
      return scoreDifferenceB - scoreDifferenceA // desc order
    }
    return scoreDifferenceA - scoreDifferenceB // asc order
  })

  return sortedResults
}
