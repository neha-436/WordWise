import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import { getUserWords } from "../services/wordService";
import { getCustomWords, deleteCustomWord } from "../services/customWordService";

function MyCards() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const [words, setWords] = useState([]);
  const [customWords, setCustomWords] = useState([]);

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Delete this flashcard?"
  );

  if (!confirmed) return;

  try {
    await deleteCustomWord(id);

    setCustomWords((prev) =>
      prev.filter((word) => word.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const userWordsData = await getUserWords(
          user.uid
        );

        const customWordsData =
          await getCustomWords(user.uid);

        setWords(userWordsData);
        setCustomWords(customWordsData);
      } catch (error) {
        console.error(
          "Error fetching cards:",
          error
        );
      }
    };

    fetchData();
  }, [user]);

//   const filteredWords = words.filter((word) =>
//   word.word
//     .toLowerCase()
//     .includes(searchTerm.toLowerCase())
// );

  const filteredWords = words.filter(
    (word) => {
      const matchesSearch =
        word.word
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =
        filter === "all"
          ? true
          : word.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  const filteredCustomWords = customWords.filter(
    (word) =>
      word.word
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
);

  return (
    <Layout>
      <h1>My Cards</h1>

      <input
        type="text"
        placeholder="🔍 Search cards..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="search-input"
      />
      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        className="search-select"
      >
        <option value="all">All</option>
        <option value="known">Known</option>
        <option value="unknown">
          Unknown
        </option>
      </select>

      {/* Learning History Section */}

      <h2>📚 Learning History</h2>

      {words.length === 0 ? (
        <p>No learning history found.</p>
      ) : (
        filteredWords.map((word) => (
          <div
            key={word.id}
            className="word-card"
          >
            <h3>{word.word}</h3>

            <p>{word.meaning}</p>

            <p>
              <strong>Status:</strong>{" "}
              {word.status}
            </p>
          </div>
        ))
      )}

      <br />

      {/* Custom Flashcards Section */}

      <h2>✨ Custom Flashcards</h2>

      {customWords.length === 0 ? (
        <p>No custom words yet.</p>
      ) : (
        filteredCustomWords.map((word) => (
          <div
            key={word.id}
            className="word-card"
          >
            <h3>{word.word}</h3>

            <p>
              <strong>Meaning:</strong>{" "}
              {word.meaning}
            </p>

            <p>
              <strong>Example:</strong>{" "}
              {word.example}
            </p>
            <br />
            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(word.id)
              }
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </Layout>
  );
}

export default MyCards;