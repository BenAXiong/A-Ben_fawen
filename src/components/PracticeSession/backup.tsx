// import { useEffect, useState, useRef } from "react";
// import Button from "../Button";
// import { selectAlternative, selectPronoun } from "../../utils/CardContainer/pronounUtils";
// import { speakText } from "../../utils/tts";
// import { SpeakerWaveIcon } from '@heroicons/react/24/outline'

// interface CardContainerProps {
//   tense: string;
//   infinitives: string[];
//   answer: string[][];
//   pronoun: string;
//   sessionLength: number;
//   onAnswer: (isCorrect: boolean, answerDetails: string) => void;
//   onEndSession: () => void; // Notify when session ends
// }

// const CardContainer: React.FC<CardContainerProps> = ({ 
//   // tense, 
//   // infinitives, 
//   // sessionLength, 
//   // answer, 
//   // onAnswer, 
//   // onEndSession
//   infinitives,
//   answer,
//   sessionLength,
//   currentVerbIndex,
//   userInput,
//   feedbackState,
//   pronounIndex,
//   onUserInputChange,
//   onSubmit, }) => {
//   const pronouns = selectPronoun(pronounIndex);
//   const randomPronoun = selectAlternative(pronouns);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // const correctAnswer = answer[currentVerbIndex][pronounIndex]
//   // .split(",")
//   // .map((answer) => answer.trim().toLowerCase());
//   // const randomPronoun = pronouns[pronounIndex][Math.floor(Math.random() * pronouns[pronounIndex].length)];

//   // const pronouns = selectPronoun(pronounIndex);
//   // console.log(pronounIndex);
//   // const correctAnswer = answer[currentVerbIndex][pronounIndex]
//   //   .split(",")
//   //   .map((answer) => answer.trim().toLowerCase());
//   // const randomPronoun = selectAlternative(pronouns);

//   // console.log("currentVerbIndex:", currentVerbIndex)
//   // console.log("correctAnswer*:", correctAnswer[0])

//   // const handleNextPronoun = () => {
//   //   const randomPronounIndex = Math.floor(Math.random() * pronouns.length);
//   //   setPronounIndex(randomPronounIndex);
//   // };

//   // const handleSubmit = () => {
//   //   const isCorrect = correctAnswer.some(
//   //     (validAnswer) => userInput.trim().toLowerCase() === validAnswer
//   //   );

//   //   if (isCorrect) {
//   //     setFeedbackState("correct");
//   //     setTimeout(() => {
//   //       if (currentVerbIndex < sessionLength - 1) {
//   //         setUserInput(""); // Clear user input
//   //         setFeedbackState("default"); // Reset feedback state
//   //         setCurrentVerbIndex((prev) => prev + 1);
//   //         handleNextPronoun(); // Update the verb & pronoun when the answer is correct
//   //         speakText(`${randomPronoun} ${userInput}`);
//   //         speakText(infinitives[(currentVerbIndex + 1) % infinitives.length]);
//   //       } else {
//   //         onEndSession();
//   //         console.log("(CC)Session completed.");
//   //       };
//   //     }, 500);
//   //   } else {
//   //     setFeedbackState("incorrect");
//   //     setTimeout(() => setFeedbackState("default"), 500); // Reset feedback state after 0.5 seconds
//   //   }
//   //   inputRef.current?.focus(); // Refocus the input field after an incorrect answer

//   //   // Update the stats with answer details
//   //   onAnswer(
//   //     isCorrect, 
//   //     isCorrect 
//   //       ? `(${currentVerbIndex+1}) ✓ ${randomPronoun} ${userInput}` // If the answer is correct, just display the user input.
//   //       : `(${currentVerbIndex+1}) ✕ ${userInput} | ${randomPronoun} + ${infinitives[currentVerbIndex]} = ${correctAnswer}`
//   //   );
//   // };

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, [currentVerbIndex]);
  
//   // useEffect(() => {
//   //   inputRef.current?.focus(); // Focus the input when the component mounts

//   //   const handleKeyDown = (e: KeyboardEvent) => {
//   //     if (e.key === "Enter") {
//   //       e.preventDefault(); // Prevent accidental form submission
//   //       handleSubmit();
//   //     } else if (e.key === "Tab") {
//   //       e.preventDefault(); // Prevent default Tab behavior
//   //       setUserInput(correctAnswer[0]); // Paste placeholder into input
//   //     }
//   //   };  
  
//   //   document.addEventListener("keydown", handleKeyDown);
  
//   //   // Cleanup the listener when the component unmounts
//   //   return () => {
//   //     document.removeEventListener("keydown", handleKeyDown);
//   //   };

//   // }, [handleSubmit, infinitives, currentVerbIndex, currentVerbIndex, sessionLength, onEndSession]);

//   let cardBackgroundColor;
//   switch (feedbackState) {
//     case "correct":
//       cardBackgroundColor = "bg-green-500";
//       break;
//     case "incorrect":
//       cardBackgroundColor = "bg-red-500";
//       break;
//     default:
//       cardBackgroundColor = "bg-gray-800";
//       break;
//   }

//   return (
//     // <div className="mt-8 p-6 w-full max-w-md bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
//     <div
//       className={`mt-8 p-6 w-full max-w-md rounded-lg shadow-lg flex flex-col items-center transition-colors duration-500 ${cardBackgroundColor}`}
//     >
//       <h1 className="text-2xl font-semibold text-blue-600 mb-4">{tense}</h1>

//       <div className="text-lg font-medium text-gray-500 mb-4">
//       {currentVerbIndex + 1} / {sessionLength}
//       </div>

//       <form
//         className="w-full flex flex-col gap-4 text-black"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder={infinitives[currentVerbIndex]}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button 
//           className="w-full p-3 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-500 transition-colors flex items-center justify-center relative" 
//           onClick={() => {
//             speakText(`${infinitives[currentVerbIndex]}.`);
//           }}
//           onKeyDown={(e) => {
//             if (e.key === 'r') {
//               speakText(`${infinitives[currentVerbIndex]}.`);
//             }
//           }}
//           aria-label={`${infinitives[currentVerbIndex]}`}
//         >
//           <span className="absolute text-lg font-semibold text-white">{randomPronoun} | {infinitives[currentVerbIndex]}</span>
//           <SpeakerWaveIcon className="h-5 w-5 text-blue-300 hover:text-blue-100 ml-auto" />
//         </button>
//         <div className="flex gap-4 mt-4">
//           <Button
//             text="Submit"
//             type="button"
//             handleClick={handleSubmit} // Submit to compare user input with the correct answer
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CardContainer;