import { useEffect, useState } from "react";

export const Title = ({ size }) => {
  const [updater, setUpdater] = useState(false);
  const titleClass = `text-5xl font-bold mb-12 flex justify-center transform ${size}`;
  const bgs = ['grad-pri', 'grad-pri', 'grad-cor', 'grad-inc', 'grad-pas'];
  const titleLetters = 'PASAPALABRA'.split('');
  const getRandomBG = () => {
    const randomIndex = Math.floor(Math.random() * bgs.length);
    return bgs[randomIndex];
  }

  // Re-render the title every second to change the background colors
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdater(prev => !prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={titleClass}>
      {updater !== null && titleLetters.map((letter, index) => (
        <span key={index} className={`${getRandomBG()} border-2 rounded-full min-w-16 size-16 grid place-items-center pb-1.5`}>{letter}</span>
      ))}
    </div>
  );
}