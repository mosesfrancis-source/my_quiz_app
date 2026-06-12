import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import type { QuizResult } from "@/types";

export async function saveQuizResult(result: Omit<QuizResult, "id">): Promise<string> {
  const docRef = await addDoc(collection(getFirebaseDb(), "quizResults"), {
    ...result,
    createdAt: Timestamp.fromDate(result.createdAt),
  });
  return docRef.id;
}

export async function getUserResults(userId: string, limitCount = 20): Promise<QuizResult[]> {
  const q = query(
    collection(getFirebaseDb(), "quizResults"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: (doc.data().createdAt as Timestamp).toDate(),
  })) as QuizResult[];
}
