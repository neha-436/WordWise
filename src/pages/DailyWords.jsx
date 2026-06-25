import Layout from "../components/Layout";
import Flashcard from "../components/Flashcard";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { saveWordProgress } from "../services/wordService";

function DailyWords() {
  const words = [
    {
      word: "Resilient",
      meaning: "Able to recover quickly",
      example: "She remained resilient."
    },
    {
      word: "Meticulous",
      meaning: "Showing great attention to detail",
      example: "She is meticulous in her work."
    },
    {
      word: "Eloquent",
      meaning: "Fluent and persuasive",
      example: "He gave an eloquent speech."
    },
    {
      word: "Ambiguous",
      meaning: "Having more than one meaning",
      example: "The sentence was ambiguous."
    },
    {
      word: "Benevolent",
      meaning: "Kind and generous",
      example: "She was a benevolent leader."
    }
  ];

  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentWord = words[currentIndex];

  const progress =
  ((currentIndex + 1) / words.length) * 100;

  const nextWord = () => {
    setFlipped(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleKnown = async () => {
    try {

      await saveWordProgress({
        userId: user.uid,
        word: currentWord.word,
        meaning: currentWord.meaning,
        status: "known",
      });

      setKnownCount(prev => prev + 1);

      nextWord();

    } catch (error) {
      console.error(error);
    }
  };

  const handleUnknown = async () => {
    try {

      await saveWordProgress({
        userId: user.uid,
        word: currentWord.word,
        meaning: currentWord.meaning,
        status: "unknown",
      });

      setUnknownCount(prev => prev + 1);

      nextWord();

    } catch (error) {
      console.error(error);
    }
  };

  if (currentIndex >= words.length) {
    return (
      <Layout>
        <h1>Session Complete 🎉</h1>

        <p>Known: {knownCount}</p>
        <p>Unknown: {unknownCount}</p>
      </Layout>
    );
  }

  return (
    <Layout>

      <h1>Today's Words</h1>

      <p>
        Word {currentIndex + 1} of {words.length}
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Flashcard
        // key={currentIndex}
        word={currentWord}
        flipped={flipped}
        setFlipped={setFlipped}
      />

      <br />

      <button disabled={!flipped} onClick={handleKnown}>
        ✓ Knew It
      </button>

      <button disabled={!flipped} onClick={handleUnknown}>
        ✗ Forgot It
      </button>

    </Layout>
  );
}

export default DailyWords;