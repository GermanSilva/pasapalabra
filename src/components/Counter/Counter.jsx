import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";

export function Counter({ dir, rosco, player }) {
  const { setCorrectAnswers, setPendingAnswers } = useGame();
  const [counters, setCounters] = useState([0, 0, 0]);
  const tags = ['Pendientes', 'Correctas', 'Incorrectas'];
  const tagBG = ['grad-pri', 'grad-cor', 'grad-inc'];
  const tagBorder = ['border-pri', 'border-cor', 'border-inc'];
  const pending = ['pending', 'passed'];
  
  useEffect(() => {
    const acc = [0, 0, 0];
    for (const entry of rosco) {
      if (pending.includes(entry.status)) acc[0]++;
      if (entry.status === 'correct') acc[1]++;
      if (entry.status === 'incorrect') acc[2]++;
    }
    setCounters(acc);
    setCorrectAnswers((answers) => {
      const newAnswers = [...answers];
      newAnswers[player] = acc[1];
      return newAnswers;
    });
    setPendingAnswers((answers) => {
      const newAnswers = [...answers];
      newAnswers[player] = acc[0];
      return newAnswers;
    });
  }, [rosco]);  

  return (
    <div className={`flex ${dir} gap-1 font-bold uppercase text-shadow-lg`}>
      {counters.map((counter, index) => (
        <div className={`${tagBorder[index]} flex flex-col items-center gap-0.5 border-2 w-28 rounded-xl overflow-clip bg-pri`} key={index}>
          <p className={`text-[14px] w-32 ${tagBG[index]}`}>{tags[index]}</p>
          <p className='text-3xl mb-1'>{counter}</p>
        </div>
      ))}
    </div>
  );
}
