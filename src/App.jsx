import Home from './pages/Home'
import Settings from './pages/Settings'
import Game from './pages/Game'
import { GameProvider, useGame } from './context/GameContext'
import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState('home')
  const [gameType, setGameType] = useState('');

  return (
    <GameProvider>
        {screen === 'home' && <Home setScreen={setScreen} setGameType={setGameType}/>}
        {screen === 'settings' && <Settings setScreen={setScreen} gameType={gameType}/>}
        {screen === 'game' && <Game setScreen={setScreen} />}
    </GameProvider>
  )
}

export default App