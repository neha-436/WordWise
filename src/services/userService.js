import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);

  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
};