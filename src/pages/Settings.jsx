import { useState } from 'react'
import { useGame } from '../context/GameContext'
import { generateRosco } from '../utils/GenerateRosco'
import { Title, Button } from '../components'

const Label = ({children}) => <span className='text-2xl font-medium'>{children}</span>;

function Settings({ setScreen, gameType }) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [time, setTime] = useState(200)
  const [whoStarts, setWhoStarts] = useState('random')
  const [isLoading, setIsLoading] = useState(false);
  const { setGameType, setPlayers, setInitialTime, setStartingPlayer, setRoscos, setTimeLeft } = useGame()  

  const handleStart = async () => {
    setIsLoading(true);

    const timeSet = parseInt(time) || 200;
    setGameType(gameType);
    setInitialTime(timeSet);
    setTimeLeft([timeSet, timeSet])

    if (gameType === 'singleplayer') {
      setPlayers([name1.trim() || 'Jugador 1']);
      setStartingPlayer(0);
      const roscoGenerado = await generateRosco();
      setRoscos([roscoGenerado]);
      setScreen('game');
      setIsLoading(false);
      return;
    }

    setPlayers([name1.trim() || 'Jugador 1', name2.trim() || 'Jugador 2'])
    const startIndex =
      whoStarts === 'random' ? Math.floor(Math.random() * 2) :
      whoStarts === 'player1' ? 0 : 1
    setStartingPlayer(startIndex)
    const rosco1generado = await generateRosco();
    const rosco2generado = await generateRosco();
    setRoscos([rosco1generado, rosco2generado]);
    setScreen('game');
    setIsLoading(false);
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      { isLoading ? (
        <div className='text-center mb-4'>
          <p className='text-lg'>Cargando partida</p>
          <p className='text-sm'>Esto puede tardar unos segundos...</p>
          <div className='loader'></div>
        </div>
      ) : (     
        gameType === "singleplayer" ? (
          <div>
            <Title size="scale-75" />
            <h2 className="text-4xl font-bold mb-12 text-center">Configuración - Individual</h2>

            <Label>Nombre del jugador</Label>
            <input className="input mb-4 mt-2 w-full"
              type="text"
              placeholder="Jugador 1"
              value={name1.toUpperCase()}
              onChange={(e) => setName1(e.target.value)}
            />
            <Label>Tiempo de juego (segundos)</Label>
            <input className="input mb-6 mt-2 w-full"
              type="number"
              placeholder="Ingresa un numero mayor a 0"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className='flex gap-4 justify-center'>
              <Button hVariant={'grad-inc'} onClick={() => setScreen('home')}>Volver atras</Button>
              <Button hVariant={'grad-cor'} onClick={handleStart}>Jugar</Button>
            </div>
          </div>
        ) : (
          <div>
            <Title size="scale-75" />
            <h2 className="text-4xl font-bold mb-12 text-center">Configuración - Versus</h2>

            <Label>Nombre del jugador 1</Label>
            <input className="input mb-4 mt-2 w-full"
              type="text"
              placeholder="JUGADOR 1"
              value={name1.toUpperCase()}
              onChange={(e) => setName1(e.target.value)}
            />
            <Label>Nombre del jugador 2</Label>
            <input className="input mb-4 mt-2 w-full"
              type="text"
              placeholder="JUGADOR 2"
              value={name2.toUpperCase()}
              onChange={(e) => setName2(e.target.value)}
            />
            <div className="mb-4">
              <Label>¿Quién comienza?</Label>
              <select className="input mt-2 w-full"
                value={whoStarts}
                onChange={(e) => setWhoStarts(e.target.value)}
              >
                <option value="random">ALEATORIO</option>
                <option value="player1">{name1.length < 1 ? 'JUGADOR 1' : name1}</option>
                <option value="player2">{name2.length < 1 ? 'JUGADOR 2' : name2}</option>
              </select>
            </div>
            <Label>Tiempo de juego (segundos)</Label>
            <input className="input mb-6 mt-2 w-full"
              type="number"
              placeholder="Ingresa un numero mayor a 0"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className='flex gap-4 justify-center'>
              <Button hVariant={'grad-inc'} onClick={() => setScreen('home')}>Volver atras</Button>
              <Button hVariant={'grad-cor'} onClick={handleStart}>Jugar</Button>
            </div>
          </div>
        )        
      )}
    </div>
  );
}

export default Settings