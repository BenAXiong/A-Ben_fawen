import React, { useEffect } from "react";
import { addSessionData, getUserData } from "../../lib/firebase/firebaseService"; // Replace with actual paths
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const ResultsPopup = ({ 
  results, 
  onClose, 
  onNext 
}: { 
  results: string[], 
  onClose: () => void, 
  onNext: () => void 
}) => {

  useEffect(() => {
    const updateFirestoreWithResults = async () => {
      try {
        const auth = getAuth(); // Get Firebase auth instance
        const user = auth.currentUser; // Get the current user

        if (!user) {
          console.error("User not authenticated");
          return;
        }

        const userId = user.uid; // Get the user ID from the authenticated user

        // Get current session data (e.g., from Firestore)
        const userDoc = await getUserData(userId);
        const existingSessions = userDoc?.sessionData || [];
        const existingVerbCount = userDoc?.verbCount || 0;

        // Add the current session data
        const newSessionData = {
          sessionDate: new Date().toISOString(),
          results: results,
          verbsPracticed: results, // You can modify this to extract verbs if needed
        };

        const updatedSessionData = [...existingSessions, newSessionData];

        // Calculate updated totals
        const totalSessions = updatedSessionData.length;
        const totalVerbs = updatedSessionData.reduce((acc, session) => acc + session.verbsPracticed.length, existingVerbCount);

        // Save updated session data and totals back to Firestore
        await addSessionData(userId, updatedSessionData, totalSessions, totalVerbs);

        console.log("Session data added and totals updated successfully!");
      } catch (error) {
        console.error("Error adding session data to Firestore:", error);
      }
    };

    if (results.length > 0) {
      updateFirestoreWithResults(); // Only update if there are results
    }
  }, [results]);

  return (
      <div 
        className="fixed left-1/2 top-0 transform -translate-x-1/2 -translate-y-0 p-6 bg-gray-800 bg-opacity-100 border border-yellow-500 text-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Session Results</h2>
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="text-md">{result}</li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between">
        <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            onClick={onClose}
          >
            Home
          </button>          
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            onClick={onClose}
          >
            See stats ?
          </button>          
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            onClick={onClose}
          >
            Retry ?
          </button>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  export default ResultsPopup;