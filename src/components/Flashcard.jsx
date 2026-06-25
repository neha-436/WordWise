import { useState } from "react";

function Flashcard({ word, flipped, setFlipped }) {
//   const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div
        className="flashcard"
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? (
            <>
                <h2>{word.word}</h2>

                <p>
                    Tap card to reveal meaning
                </p>
            </>
        ) : (
            <>
                <h3>{word.meaning}</h3>
                <p>{word.example}</p>
            </>
        )}
      </div>
    </div>
  );
}

export default Flashcard;