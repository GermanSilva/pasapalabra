export function RoscoResults({ rosco }) {

  return (
    <div className="flex flex-col w-full border-2 border-b-0 mb-8">
      {rosco.map((entry, i) => (
        <div className="flex flex-col items-start justify-center w-full p-2 border-b-2"
          key={i} 
          style={{
            backgroundImage:
              entry.status === "correct"
                ? "var(--gradient-cor)"
                : entry.status === "incorrect"
                ? "var(--gradient-inc)"
                : "var(--gradient-pri)",
        }}>
          <span className="text-shadow-lg text-white font-bold">{entry.letter}: {entry.word}</span>
          <span className="text-shadow-lg text-white text-left">{entry.definition}</span>
        </div>
      ))}
    </div>
  );
}