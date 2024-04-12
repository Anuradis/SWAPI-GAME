import { describe, it, expect } from 'vitest'
import { generateRandomNumber, getWinningCardIndex, sortByScoreDifference } from '@/utils/common'

describe('generateRandomNumber', () => {
  it('generates a number within the specified range', () => {
    const min = 1
    const max = 10
    const iterations = 10
    for (let i = 0; i < iterations; i++) {
      const randomNum = generateRandomNumber(min, max)
      expect(randomNum).toBeGreaterThanOrEqual(min)
      expect(randomNum).toBeLessThanOrEqual(max)
    }
  })

  it('handles negative ranges', () => {
    const min = -10
    const max = -1
    const iterations = 10
    for (let i = 0; i < iterations; i++) {
      const randomNum = generateRandomNumber(min, max)
      expect(randomNum).toBeGreaterThanOrEqual(min)
      expect(randomNum).toBeLessThanOrEqual(max)
    }
  })

  it('returns the same number when min equals max', () => {
    const min = 5
    const max = 5
    const randomNum = generateRandomNumber(min, max)
    expect(randomNum).toBe(min)
  })

  it('throws an error if min is greater than max', () => {
    const min = 10
    const max = 5
    expect(() => {
      generateRandomNumber(min, max)
    }).toThrow('min should not be greater than max')
  })
})

describe('getWinningCardIndex', () => {
  const cards = [
    { id: 1, mass: 10 },
    { id: 2, mass: 8 },
    { id: 3, mass: 12 },
    { id: 4, mass: 12 },
    { id: 5, mass: 'unknown' }
  ]

  it('returns -1 if no winning card is found', () => {
    expect(getWinningCardIndex([], 'mass')).toBe(-1)
  })

  it('returns -1 if there are multiple cards with the same highest value in the specified attribute', () => {
    expect(getWinningCardIndex(cards, 'mass')).toBe(-1)
  })

  it('handles string attribute values', () => {
    const stringCards = [
      { id: 1, crew: '1' },
      { id: 2, crew: '6' },
      { id: 3, crew: '10' }
    ]
    expect(getWinningCardIndex(stringCards, 'crew')).toBe(2)
  })

  it('handles unknown values', () => {
    const unknownCards = [
      { id: 1, crew: 5 },
      { id: 2, crew: 'unknown' },
      { id: 3, crew: 10 }
    ]
    expect(getWinningCardIndex(unknownCards, 'crew')).toBe(2)
  })
})

describe('sortByScoreDifference', () => {
  const mockedResults = [
    {
      player1: { name: 'player1', score: 16 },
      player2: { name: 'CPU', score: 11 }
    },
    {
      player1: { name: 'JOHN', score: 27 },
      player2: { name: 'CPU', score: 19 }
    },
    {
      player1: { name: 'Player 123223', score: 25 },
      player2: { name: 'CPU12442', score: 32 }
    },
    {
      player1: { name: 'player1', score: 11 },
      player2: { name: 'CPU', score: 18 }
    },
    {
      player1: { name: 'player1', score: 5 },
      player2: { name: 'CPU', score: 3 }
    },
    {
      player1: { name: 'Player 12322', score: 7 },
      player2: { name: 'CPU124', score: 3 }
    },
    {
      player1: { name: 'player1', score: 0 },
      player2: { name: 'CPU', score: 1 }
    }
  ]

  it('sorts results in descending order by default', () => {
    const sortedResults = sortByScoreDifference(mockedResults)
    expect(sortedResults[0].player1.score).toBe(27) // check highest difference
    expect(sortedResults[sortedResults.length - 1].player1.score).toBe(0) // check lowest difference
  })

  it('sorts results in ascending order when sortDirection is "asc"', () => {
    const sortedResults = sortByScoreDifference(mockedResults, 'asc')
    expect(sortedResults[0].player1.score).toBe(0) // check lowest difference
    expect(sortedResults[sortedResults.length - 1].player1.score).toBe(27) // check highest difference
  })

  it('does not mutate the original array', () => {
    const originalResults = [...mockedResults]
    sortByScoreDifference(mockedResults)
    expect(mockedResults).toEqual(originalResults)
  })
})
