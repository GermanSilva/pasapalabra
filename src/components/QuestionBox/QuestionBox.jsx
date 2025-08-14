import { useEffect, useState } from 'react'

export function QuestionBox({ rosco, currentLetter, setAnswer, update }) {
  const [ answerInput, setAnswerInput ] = useState('');

  useEffect(() => {
    document.querySelector('.input').focus();
    return () => {}
  }, []);

  const sendAnswer = (value) => {
    setAnswer({ status: value, answered: true});
    update(value);
  }

  const pasapalabra = () => {
    document.querySelector('.input').focus();
    setAnswerInput('');
    sendAnswer('passed');
  }

  const checkForEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.focus();
      checkAnswer();
    }
  }

  const checkAnswer = () => {
    const answer = answerInput.trim();
    if (answer === '') return;
    setAnswerInput('');
    document.querySelector('.input').focus();


    if (answer.trim() === rosco[currentLetter].word.toUpperCase())
      return sendAnswer('correct');

    return sendAnswer('incorrect');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className='flex flex-col gap-2 items-center justify-center'>
        <span className='grad-pri uppercase font-bold px-4 py-1 rounded-full border-2 '>{rosco[currentLetter].word.startsWith(rosco[currentLetter].letter) ? `Comienza con ${rosco[currentLetter].letter}`: `Contiene ${rosco[currentLetter].letter}`}</span>        
        <span className='text-2xl w-[430px] font-bold'>{rosco[currentLetter].definition}</span>        
      </div>
      <input className="input w-64 text-center"
        type="text"
        placeholder="Escribe tu respuesta aquí"
        value={answerInput.toUpperCase()}
        onKeyDown={(e) => checkForEnter(e)}
        onChange={(e) => setAnswerInput(e.target.value.toUpperCase())}
      />
      <div className='flex gap-4 justify-center'>
        <button className={`btn grad-pri ${answerInput.trim() === '' ? 'disabled' : ''}`} onClick={() => checkAnswer()}>
          Confirmar
        </button>
        <button className="btn grad-pas" onClick={() => pasapalabra()}>
          Pasapalabra
        </button>
      </div>
    </div>
  );
}