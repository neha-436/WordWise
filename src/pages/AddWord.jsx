import { useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import {
  addCustomWord,
} from "../services/customWordService";

function AddWord() {
  const { user } = useAuth();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] =
    useState("");
  const [example, setExample] =
    useState("");

  const handleSubmit = async (e) => {
     if ( !word.trim() || !meaning.trim())
    {
        alert(
            "Word and Meaning are required"
        );
        return;
    }
    e.preventDefault();

    try {
      await addCustomWord({
        userId: user.uid,
        word,
        meaning,
        example,
      });

      alert("Word saved!");

      setWord("");
      setMeaning("");
      setExample("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1>Add Custom Word</h1>
        <br />
      <form onSubmit={handleSubmit} className="addword-form">
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) =>
            setWord(e.target.value)
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Meaning"
          value={meaning}
          onChange={(e) =>
            setMeaning(e.target.value)
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Example Sentence"
          value={example}
          onChange={(e) =>
            setExample(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Save Word
        </button>
      </form>
    </Layout>
  );
}

export default AddWord;