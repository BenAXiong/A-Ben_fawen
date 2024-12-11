export interface VerbCardProps {
    tense: string;                           // Tense for the verbs (e.g., "present", "past")
    infinitives: string[];                   // List of infinitive verbs to practice
    sessionLength: number;                   // Total length of the session (e.g., number of verbs to practice)
    currentVerbIndex: number;                // Index of the current verb in the session
    pronoun: string;
    feedbackState: "default" | "correct" | "incorrect";  // State for giving feedback
    // pronounIndex: number;                    // Index of the pronoun for the current verb
    userInput: string;                       // User's input for the current verb
    onUserInputChange: (input: string) => void; // Function to handle user input changes
    onSubmit: () => void;                    // Function to handle form submission
  }
  