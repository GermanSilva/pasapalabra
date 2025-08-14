import { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [gameType, setGameType] = useState('singleplayer')
  const [players, setPlayers] = useState([])
  const [initialTime, setInitialTime] = useState(200)
  const [startingPlayer, setStartingPlayer] = useState(0)
  const [roscos, setRoscos] = useState([])
  const [timeLeft, setTimeLeft] = useState([0, 0])
  const [correctAnswers, setCorrectAnswers] = useState([0, 0])
  const [pendingAnswers, setPendingAnswers] = useState([27, 27])

  return (
    <GameContext.Provider value={{
      gameType,
      setGameType,
      players,
      setPlayers,
      initialTime,
      setInitialTime,
      startingPlayer,
      setStartingPlayer,
      roscos,
      setRoscos,
      timeLeft,
      setTimeLeft,
      correctAnswers,
      setCorrectAnswers,
      pendingAnswers,
      setPendingAnswers
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)