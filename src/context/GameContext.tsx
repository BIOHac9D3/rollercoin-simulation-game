'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Types
export interface Rig {
  id: string
  name: string
  level: number
  efficiency: number
  cost: number
  earnings: number
}

export interface GameState {
  virtualCurrency: number
  miningPower: number
  totalEarnings: number
  rigs: Rig[]
  isActive: boolean
}

interface GameContextType {
  state: GameState
  increaseMiningPower: (amount: number) => void
  addEarnings: (amount: number) => void
  buyRig: (rig: Omit<Rig, 'id'>) => void
  upgradeRig: (rigId: string) => void
  sellRig: (rigId: string) => void
  startMining: () => void
  stopMining: () => void
}

// Actions
type GameAction =
  | { type: 'INCREASE_MINING_POWER'; payload: number }
  | { type: 'ADD_EARNINGS'; payload: number }
  | { type: 'BUY_RIG'; payload: Omit<Rig, 'id'> }
  | { type: 'UPGRADE_RIG'; payload: string }
  | { type: 'SELL_RIG'; payload: string }
  | { type: 'START_MINING' }
  | { type: 'STOP_MINING' }
  | { type: 'LOAD_STATE'; payload: GameState }

// Initial state
const initialState: GameState = {
  virtualCurrency: 1000,
  miningPower: 10,
  totalEarnings: 0,
  rigs: [],
  isActive: false
}

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INCREASE_MINING_POWER':
      return {
        ...state,
        miningPower: state.miningPower + action.payload
      }
    
    case 'ADD_EARNINGS':
      return {
        ...state,
        virtualCurrency: state.virtualCurrency + action.payload,
        totalEarnings: state.totalEarnings + action.payload
      }
    
    case 'BUY_RIG':
      if (state.virtualCurrency >= action.payload.cost) {
        const newRig: Rig = {
          ...action.payload,
          id: Date.now().toString()
        }
        return {
          ...state,
          virtualCurrency: state.virtualCurrency - action.payload.cost,
          rigs: [...state.rigs, newRig],
          miningPower: state.miningPower + newRig.efficiency
        }
      }
      return state
    
    case 'UPGRADE_RIG':
      const rigToUpgrade = state.rigs.find(r => r.id === action.payload)
      if (rigToUpgrade && state.virtualCurrency >= rigToUpgrade.cost * 0.5) {
        const upgradeCost = rigToUpgrade.cost * 0.5
        return {
          ...state,
          rigs: state.rigs.map(rig => {
            if (rig.id === action.payload) {
              return {
                ...rig,
                level: rig.level + 1,
                efficiency: rig.efficiency * 1.2,
                cost: rig.cost * 1.5
              }
            }
            return rig
          }),
          virtualCurrency: state.virtualCurrency - upgradeCost
        }
      }
      return state
    
    case 'SELL_RIG':
      const rigToSell = state.rigs.find(r => r.id === action.payload)
      if (rigToSell) {
        return {
          ...state,
          virtualCurrency: state.virtualCurrency + (rigToSell.cost * 0.7),
          miningPower: state.miningPower - rigToSell.efficiency,
          rigs: state.rigs.filter(r => r.id !== action.payload)
        }
      }
      return state
    
    case 'START_MINING':
      return { ...state, isActive: true }
    
    case 'STOP_MINING':
      return { ...state, isActive: false }
    
    case 'LOAD_STATE':
      return action.payload
    
    default:
      return state
  }
}

// Context
const GameContext = createContext<GameContextType | undefined>(undefined)

// Provider
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('rollercoin-game-state')
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: 'LOAD_STATE', payload: parsedState })
      }
    } catch (error) {
      console.error('Failed to load game state:', error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('rollercoin-game-state', JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save game state:', error)
    }
  }, [state])

  // Actions
  const increaseMiningPower = (amount: number) => {
    dispatch({ type: 'INCREASE_MINING_POWER', payload: amount })
  }

  const addEarnings = (amount: number) => {
    dispatch({ type: 'ADD_EARNINGS', payload: amount })
  }

  const buyRig = (rig: Omit<Rig, 'id'>) => {
    dispatch({ type: 'BUY_RIG', payload: rig })
  }

  const upgradeRig = (rigId: string) => {
    dispatch({ type: 'UPGRADE_RIG', payload: rigId })
  }

  const sellRig = (rigId: string) => {
    dispatch({ type: 'SELL_RIG', payload: rigId })
  }

  const startMining = () => {
    dispatch({ type: 'START_MINING' })
  }

  const stopMining = () => {
    dispatch({ type: 'STOP_MINING' })
  }

  const contextValue: GameContextType = {
    state,
    increaseMiningPower,
    addEarnings,
    buyRig,
    upgradeRig,
    sellRig,
    startMining,
    stopMining
  }

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}

// Hook
export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
