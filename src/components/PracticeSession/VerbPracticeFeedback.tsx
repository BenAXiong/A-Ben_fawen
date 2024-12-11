import React from 'react';

interface VerbPracticeFeedbackProps {
  feedbackState: "default" | "correct" | "incorrect";
  currentVerbIndex: number;
  sessionLength: number;
}

export const VerbPracticeFeedback: React.FC<VerbPracticeFeedbackProps> = ({
  feedbackState,
  currentVerbIndex,
  sessionLength
}) => {
  let cardBackgroundColor;
  switch (feedbackState) {
    case "correct":
      cardBackgroundColor = "bg-green-500";
      break;
    case "incorrect":
      cardBackgroundColor = "bg-red-500";
      break;
    default:
      cardBackgroundColor = "bg-gray-800";
      break;
  }

  return (
    <div className={`transition-colors duration-500 ${cardBackgroundColor}`}>
      <div className="text-lg font-medium text-gray-500 mb-4">
        {currentVerbIndex + 1} / {sessionLength}
      </div>
    </div>
  );
};