import { describe, it, expect, beforeAll } from 'vitest'
import useGame from '@/composables/useGame'

describe('useGame', () => {
  let game

  beforeAll(() => {
    game = useGame()
  })

  describe('clearCurrentGameResult', () => {
    let initialState

    beforeAll(() => {
      initialState = JSON.parse(JSON.stringify(game.state))
      game.clearCurrentGameResult(game.state)
    })

    it('resets player scores to initial values', () => {
      // Check if player scores are reset to their initial values
      expect(game.state.controlPanel.currentGame.player1.score).toBe(
        initialState.controlPanel.currentGame.player1.score
      )
      expect(game.state.controlPanel.currentGame.player2.score).toBe(
        initialState.controlPanel.currentGame.player2.score
      )
    })

    it('clears the cards array', () => {
      // Check if the cards array is empty
      expect(game.state.cards).toHaveLength(0)
    })

    it('sets the winningCardIndex to -1', () => {
      // Check if the winningCardIndex is set to -1
      expect(game.state.winningCardIndex).toBe(-1)
    })
  })

  describe('updateGameResult', () => {
    it('does not update scores when winningIndex indicates a draw', () => {
      // Call the function with winningIndex indicating a draw i.g. -1
      game.updateGameResult(-1)

      // Assert that the scores remain unchanged
      expect(game.state.controlPanel.currentGame.player1.score).toBe(0)
      expect(game.state.controlPanel.currentGame.player2.score).toBe(0)
    })

    it('updates player 1 score when winningIndex is 0', () => {
      game.updateGameResult(0)
      expect(game.state.controlPanel.currentGame.player1.score).toBe(1)
    })

    it('updates player 2 score when winningIndex is 1', () => {
      game.updateGameResult(1)
      expect(game.state.controlPanel.currentGame.player2.score).toBe(1)
    })
  })
})