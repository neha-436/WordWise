import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export const deleteCustomWord = async (id) => {
  await deleteDoc(
    doc(db, "customWords", id)
  );
};

export const addCustomWord = async ({
  userId,
  word,
  meaning,
  example,
}) => {
  await addDoc(
    collection(db, "customWords"),
    {
      userId,
      word,
      meaning,
      example,
      createdAt: serverTimestamp(),
    }
  );
};

export const getCustomWords = async (
  userId
) => {
  const q = query(
    collection(db, "customWords"),
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