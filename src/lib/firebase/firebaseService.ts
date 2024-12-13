import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./index";

interface UserData {
  sessions: number;
  correctPercentage: number;
  verbsNeedingWork: string[];
  sessionData?: any[]; // Optional since it might not exist initially
  sessionCount?: number; // Optional to match Firestore field
  verbCount?: number;    // Optional to match Firestore field
}

export const createUser = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      sessions: 0,
      correctPercentage: 0,
      verbsNeedingWork: [],
    });
    console.log("User document created!");
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserData; // Cast to the UserData interface
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};

// Add session data and update totals in Firestore
export const addSessionData = async (
  userId: string,
  updatedSessionData: any[],
  totalSessions: number,
  totalVerbs: number
): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        sessionData: updatedSessionData,
        sessionCount: totalSessions,
        verbCount: totalVerbs,
      },
      { merge: true } // Use merge to avoid overwriting the entire document
    );
    console.log("Session data added successfully!");
  } catch (error) {
    console.error("Error adding session data to Firestore:", error);
  }
};
