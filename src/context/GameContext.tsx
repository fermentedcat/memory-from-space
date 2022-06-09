import React, { createContext, useReducer } from 'react'
import { GameState, GameContextInterface, GameStateAction, GameStateActions } from '../models/game-state'

const defaultGameState: GameState = {
  isFinished: false,
  attempts: 0,
}

const gameReducer = (state: GameState, action: GameStateAction) => {
  const { type, payload } = action
  switch (type) {
    case GameStateActions.ADD_ATTEMPT: {
      return { 
        ...state, 
        attempts: state.attempts + 1
      }
    }
    case GameStateActions.SET_STATUS: {
      if (payload) {
        return {
          ...state,
          isFinished: payload
        }
      } else {
        return state
      }
    }
    case GameStateActions.RESET: {
      return defaultGameState
    }
    default: return state
  }
  
}

export const GameContext = createContext<GameContextInterface | null>(null);

interface GameProviderProps {
  children?: React.ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGameState)

  function reset() {
    dispatch({ type: GameStateActions.RESET })
  }
  
  function addAttempt() {
    dispatch({ type: GameStateActions.ADD_ATTEMPT })
  }
  
  function setStatus(status: boolean) {
    dispatch({ type: GameStateActions.SET_STATUS, payload: status })
  }

  const value = { 
    isFinished: state.isFinished, 
    attempts: state.attempts,
    reset,
    addAttempt,
    setStatus
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
