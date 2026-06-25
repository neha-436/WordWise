import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export const saveWordProgress = async ({
  userId,
  word,
  meaning,
  status,
}) => {
  await addDoc(
    collection(db, "userWords"),
    {
      userId,
      word,
      meaning,
      status,
      reviewCount:
        status === "known" ? 1 : 0,
      createdAt: serverTimestamp(),
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