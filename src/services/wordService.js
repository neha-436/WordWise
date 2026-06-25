import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export const saveWordProgress = async ({
  userId,
  word,
  meaning,
  status,
}) => {

  const wordKey = word
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-");

  const docId = `${userId}_${wordKey}`;


  const docRef = doc(
    db,
    "userWords",
    docId
  );

  const existingDoc =
    await getDoc(docRef);

  let reviewCount = 1;
  let interval = 1;

  if (existingDoc.exists()) {

    const data = existingDoc.data();

    reviewCount =
      data.reviewCount + 1;

    interval =
      status === "known"
        ? Math.min(
            data.interval * 2,
            30
          )
        : 1;
  }

  const nextReview = new Date();

  nextReview.setDate(
    nextReview.getDate() + interval
  );

  await setDoc(
    docRef,
    {
      userId,
      word,
      meaning,

      status,

      reviewCount,

      interval,

      lastReviewed:
        serverTimestamp(),

      nextReviewDate:
        nextReview,
    }
  );
};

export const getUserWords = async (userId) => {
  const q = query(
    collection(db, "userWords"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const words = [];

  snapshot.forEach((doc) => {
    words.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return words;
};

export const getUserStats = async (userId) => {
  const words = await getUserWords(userId);

  const total = words.length;

  const known = words.filter(
    (word) => word.status === "known"
  ).length;

  const unknown = words.filter(
    (word) => word.status === "unknown"
  ).length;

  const accuracy =
    total > 0
      ? ((known / total) * 100).toFixed(1)
      : 0;

  return {
    total,
    known,
    unknown,
    accuracy,
  };
};