import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import { getWordsDueToday } from "../services/wordService";

function Review() {
  const { user } = useAuth();

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      if (!user) return;

      try {
        const data = await getWordsDueToday(user.uid);
        setWords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>📖 Review</h1>

      {words.length === 0 ? (
        <h3>🎉 No reviews due today!</h3>
      ) : (
        words.map((word) => (
          <div
            key={word.id}
            className="word-card"
          >
            <h3>{word.word}</h3>

            <p>{word.meaning}</p>

            <p>
              Reviews: {word.reviewCount}
            </p>

            <p>
              Next Review:
              {" "}
              {word.nextReviewDate
                ?.toDate()
                .toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Review;