import { useState, useRef } from 'react';

interface VerbInputHook {
  userInput: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  resetInput: () => void;
  pasteCorrectAnswer: (correctAnswer: string[]) => void;
}

export function useVerbInput(): VerbInputHook {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    setUserInput("");
  };

  const pasteCorrectAnswer = (correctAnswer: string[]) => {
    setUserInput(correctAnswer[0]);
  };

  return {
    userInput,
    inputRef,
    setUserInput,
    resetInput,
    pasteCorrectAnswer
  };
}