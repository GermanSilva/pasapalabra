import { useEffect } from "react";

export function Rosco({ rosco, currentLetter }) {
  return (
    <div className="grid place-items-center rosco-middle main-content h-full">
      {rosco.map((entry, i) => {
        const degrees = i * (360 / rosco.length);
        return (
        <div 
          key={i} 
          className="rosco-middle h-full"
          style={{ transform: `rotate(${degrees}deg)` }}
        >
          <span          
            className="size-13 text-3xl font-bold text-white border-2 rounded-full shadow-lg text-shadow-lg grid place-items-center pb-0.5"
            style={{
              transform: `rotate(-${degrees}deg)`,
              backgroundImage:
                entry.status === "correct"
                  ? "var(--gradient-cor)"
                  : entry.status === "incorrect"
                  ? "var(--gradient-inc)"
                  : entry.status === "passed"
                  ? "var(--gradient-pas)"
                  : i === currentLetter
                    ? "var(--gradient-act)"
                    : "var(--gradient-pri)",
            }}
          >
            {entry.letter}
          </span>
        </div>
      )})}
    </div>
  );
}