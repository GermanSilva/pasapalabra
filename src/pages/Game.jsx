import { useState, useEffect, useRef} from 'react';
import { useGame } from '../context/GameContext';
import { Rosco, QuestionBox, Timer, Counter, RoscoResults, Title } from '../components';

const NameTag = ({ children }) => {
  return (
    <h3 className='text-[22px] uppercase font-bold'>{children}</h3>
  )
}

function Game({ setScreen }) {
  const { gameType, players, startingPlayer, roscos, timeLeft, setTimeLeft, correctAnswers, pendingAnswers } = useGame()
  const [ isReady, setIsReady ] = useState(false);
  const [ roscosState, setRoscosState ] = useState(roscos);
  const [ answer, setAnswer ] = useState('');
  const [ gameOver, setGameOver ] = useState(false);
  const letters = useRef([0, 0]);
  const player = useRef(startingPlayer);
  const finished = useRef([false, false]);
  const winnerIndex = useRef(null);

  // Check answer and update the rosco state
  const updateRosco = (answerResult) => {
    const playerIndex = player.current;
    const letterIndex = letters.current[playerIndex];
    controlGame(answerResult);

    const newState = [...roscosState];
    const updatedRosco = [...newState[playerIndex]];
    updatedRosco[letterIndex].status = answerResult;
    newState[playerIndex] = updatedRosco;

    let nextLetter = letterIndex + 1;
    if (nextLetter === 27) {
      
      const resetRosco = updatedRosco.map((entry) =>
        entry.status === 'passed' ? { ...entry, status: 'pending' } : entry
      );
      newState[playerIndex] = resetRosco;
      nextLetter = 0;
    }
    while (
      nextLetter < 27 &&
      newState[playerIndex][nextLetter].status !== 'pending'
    ) {
      nextLetter++;
    }
    if (nextLetter === 27) {
      finished.current[playerIndex] = true;
      nextLetter = 26;
      controlGame(`finished${playerIndex}`);
    }

    const newLetters = [...letters.current];
    newLetters[playerIndex] = nextLetter;
    letters.current = newLetters;

    setRoscosState(newState);
  }

  const controlGame = (result) => {
    if (gameType === 'singleplayer' && (result === 'finished0')) {
      endGame();
      return;
    }

    if (result === 'outOfTime') {
      setTimeLeft((prev) => {
        const newTime = [...prev];
        newTime[player.current] = 0;
        return newTime;
      })
      finished.current[player.current] = true;
      if (gameType === 'singleplayer' || (finished.current[0] && finished.current[1])) {
        endGame();
        return;
      }
    }

    if ((result === 'finished0' && finished.current[1]) || (result === 'finished1' && finished.current[0])) {
      endGame();
      return;
    }

    if (
      result === 'correct' || 
      gameType === 'singleplayer' ||
      finished.current[1 - player.current]
    ) return;

    player.current = 1 - player.current;
    setIsReady(false);
  }

  const endGame = () => {
    setTimeout(() => {
    if (gameType === 'singleplayer') {
      setGameOver(true);
      return;
    }  

    if (correctAnswers[0] !== correctAnswers[1]) {
      winnerIndex.current = correctAnswers[0] > correctAnswers[1] ? 0 : 1;
    } else if (timeLeft[0] !== timeLeft[1]) {
      winnerIndex.current = timeLeft[0] > timeLeft[1] ? 0 : 1;
    }

    setGameOver(true);
    return;
    }, 100);
  }

  if (gameOver) {
    return (
      <div className="p-8 text-center h-[100vh] flex flex-col items-center">
      { gameType === 'singleplayer' ? (
        <div>
          <Title size={"scale-75"}></Title>
          <h1 className="text-3xl font-bold mb-4">Partida terminada</h1>
          { correctAnswers[0] === 27 ? (
            <h2 className="text-2xl font-bold mb-8">🎉 ¡Has ganado! 🎉</h2>
          ) : (
            <h2 className="text-2xl font-bold mb-8">❌ No has podido completar el rosco ❌</h2>
          )}
          <button className="btn mb-8" onClick={() => setScreen('home')}>Volver al inicio</button>
          <div className='flex flex-col gap-3 items-center align-center text-lg'>
            <span className='text-3xl font-bold'>{players[0]}</span>
            <span className='text-2xl font-bold'>Tiempo restante: {timeLeft[0]} seg</span>
            <Counter dir={'flex-row-reverse'} rosco={roscosState[0]} player={0}></Counter>
            <RoscoResults rosco={roscosState[0]}></RoscoResults>
          </div>
        </div>
      ) : (
        <div>
          <Title size={"scale-75"}></Title>
          <h1 className="text-3xl font-bold mb-4">Partida terminada</h1>
          { winnerIndex.current !== null ? (
            <h2 className="text-2xl font-bold mb-8">🎉 El ganador es {players[winnerIndex.current]} 🎉</h2>
          ) : (
            <h2 className="text-2xl font-bold mb-8">🤝 ¡Empate! 🤝</h2>
          )}
          <button className="btn mb-8" onClick={() => setScreen('home')}>Volver al inicio</button>
          <div className='flex gap-3'>
            { players.map((p, i) => (
              <div key={i} className='flex flex-1 flex-col gap-3 items-center align-center text-lg'>
                <span className='text-3xl font-bold'>{players[i]}</span>
                <span className='text-2xl font-bold'>Tiempo restante: {timeLeft[i]} seg</span>
                <Counter dir={'flex-row'} rosco={roscosState[i]} player={i}></Counter>
                <RoscoResults rosco={roscosState[i]}></RoscoResults>
              </div>
            )) }
          </div>          
        </div>
      )}
      </div>
    )
  }

  return (
    <div className="p-8 text-center h-[100vh] flex flex-col items-center">
      <Title size={"scale-75"}></Title>
      <button className="btn -mt-10 mb-8 transform scale-85 uppercase w-[200px]" onClick={() => setScreen('home')}>Volver al inicio</button>

      <div className='grow relative main-content h-full'>
        <Rosco rosco={roscosState[player.current]} currentLetter={letters.current[player.current]}></Rosco>
        { isReady ? (
          <div className='absolute-middle'>
            <QuestionBox rosco={roscosState[player.current]} currentLetter={letters.current[player.current]} setAnswer={setAnswer} update={updateRosco}></QuestionBox>
          </div>
        ) : (
          <div className='absolute-middle w-[450px] text-center'>
            <p className='text-3xl font-bold uppercase'>{players[player.current]}</p>
            <p className='text-2xl font-bold'>¡Te toca responder!</p>
            <button className="btn grad-pri mt-4" onClick={() => setIsReady(true)}>
              OK
            </button>
          </div>
        )}
      </div>

      <div className='flex gap-8 justify-center mt-8'>
        { gameType === 'singleplayer' 
          ? (
            <div className={`flex gap-2 items-center transition-all duration-300`}>
              <Timer isRunning={player.current === 0 && isReady} onEnd={() => controlGame('outOfTime')} player={0}></Timer>
              <div className='flex flex-col gap-0.5 items-start'>
                <NameTag>{players[0]}</NameTag>
                <Counter dir={'flex-row'} rosco={roscosState[0]} player={0}></Counter>
              </div>
            </div>
          )
          : (
            <div className='flex gap-2.5 items-center relative'>
              <div className={`${player.current === 1 && isReady ? 'disabled transform scale-90 translate-x-6':''} flex gap-2 items-center transition-all duration-300`}>
                <div className='flex flex-col gap-0.5 items-end'>
                  <NameTag>{players[0]}</NameTag>
                  <Counter dir={'flex-row-reverse'} rosco={roscosState[0]} player={0}></Counter>
                </div>
                <Timer isRunning={player.current === 0 && isReady} onEnd={() => controlGame('outOfTime')} player={0}></Timer>
              </div>
              <span className='text-2xl font-black versus'>VS</span>
              <div className={`${player.current === 0 && isReady ? 'disabled transform scale-90 -translate-x-6':''} flex gap-2 items-center transition-all duration-300`}>
                <Timer isRunning={player.current === 1 && isReady} onEnd={() => controlGame('outOfTime')} player={1}></Timer>
                <div className='flex flex-col gap-0.5 items-start'>
                  <NameTag>{players[1]}</NameTag>
                  <Counter dir={'flex-row'} rosco={roscosState[1]} player={1}></Counter>
                </div>
              </div>
            </div>
          )}
      </div>      
    </div>
  )
}

export default Game