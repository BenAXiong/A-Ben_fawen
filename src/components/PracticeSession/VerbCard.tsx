import { useEffect, useRef } from "react";
import Button from "../Button";
import { speakText } from "../../utils/tts";
import { SpeakerWaveIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { VerbCardProps } from '../../types/VerbCardProps';

const VerbCard: React.FC<VerbCardProps> = ({ 
  tense,
  infinitives,
  sessionLength,
  currentVerbIndex,
  pronoun,
  userInput,
  feedbackState,
  onUserInputChange,
  onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  },);

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

  const getConjugatedAuxiliary = () => {
    if (tense !== "Passé Composé") return "";

    const auxiliaryConjugations: {[key: string]: string} = {
      "je": "ai",
      "tu": " as",
      "il": " a",
      "elle": " a",
      "on": " a",
      "nous": " avons",
      "vous": " avez",
      "ils": " ont",
      "elles": " ont"
    };

    return pronoun === "je" ? "ai" : " " + auxiliaryConjugations[pronoun] || "";
  };

  return (
    // <div className="mt-8 p-6 w-full max-w-md bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
    <div
      className={`mt-8 py-6 px-12 w-full max-w-md rounded-lg shadow-lg flex flex-col items-center transition-colors duration-500 ${cardBackgroundColor}`}
    >

      <div className="w-full p-3 rounded-md cursor-pointer transition-colors flex items-center justify-center relative mb-4" >
          <h1  className="absolute text-2xl font-semibold text-blue-600 mb-4">{tense}</h1>
          <XCircleIcon className="h-5 w-5 text-red-500 hover:text-red-800 ml-auto translate-x-12 -translate-y-6" />
      </div>

      <div className="w-full p-3 rounded-md cursor-pointer transition-colors flex items-center justify-center relative mb-4" >
          <span className="absolute text-lg font-semibold text-gray-500 ">{currentVerbIndex + 1} / {sessionLength}</span>
      </div>

      <form
        className="w-full flex flex-col gap-y-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <button 
          className="w-9/12 p-3 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-500 transition-colors flex items-center relative ml-auto"
          onClick={() => {
            speakText(`${infinitives[currentVerbIndex]}.`);
          }}
          onKeyDown={(e) => {
            if (e.key === 'r') {
              speakText(`${infinitives[currentVerbIndex]}.`);
            }
          }}
          aria-label={`${infinitives[currentVerbIndex]}`}
          >
          <span className="absolute text-lg font-semibold text-white">{infinitives[currentVerbIndex]}</span>
          <SpeakerWaveIcon className="h-5 w-5 text-blue-300 hover:text-blue-100 ml-auto" />
        </button>

        <div className="flex flex-row gap-x-0">
          <div className="w-3/12 p-3 rounded-md transition-colors flex items-center justify-end">
            <p className="text-lg font-semibold text-white">
              {tense === "Passé Composé" 
                ? `${pronoun === "je" ? "j'" : pronoun}${getConjugatedAuxiliary()}` 
                : pronoun}         
            </p>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => onUserInputChange(e.target.value)}
            placeholder={infinitives[currentVerbIndex]}
            className="w-9/12 p-3 rounded-md text-lg font-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
          />
        </div>

        {/* <button 
          className="w-full p-3 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-500 transition-colors flex items-center justify-center relative"
          onClick={() => {
            speakText(`${infinitives[currentVerbIndex]}.`);
          }}
          onKeyDown={(e) => {
            if (e.key === 'r') {
              speakText(`${infinitives[currentVerbIndex]}.`);
            }
          }}
          aria-label={`${infinitives[currentVerbIndex]}`}
        >
          <span className="absolute text-lg font-semibold text-white">{pronoun} | {infinitives[currentVerbIndex]}</span>
          <SpeakerWaveIcon className="h-5 w-5 text-blue-300 hover:text-blue-100 ml-auto" />
        </button> */}

        <div className="flex gap-4 mt-12">
          <Button
            text="Check"
            type="button"
            handleClick={onSubmit} // Submit to compare user input with the correct answer
          />
        </div>
      </form>

      {/* <form
        className="w-full flex flex-col gap-4 text-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => onUserInputChange(e.target.value)}
          placeholder={infinitives[currentVerbIndex]}
          className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          className="w-full p-3 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-500 transition-colors flex items-center justify-center relative"
          onClick={() => {
            speakText(`${infinitives[currentVerbIndex]}.`);
          }}
          onKeyDown={(e) => {
            if (e.key === 'r') {
              speakText(`${infinitives[currentVerbIndex]}.`);
            }
          }}
          aria-label={`${infinitives[currentVerbIndex]}`}
        >
          <span className="absolute text-lg font-semibold text-white">{pronoun} | {infinitives[currentVerbIndex]}</span>
          <SpeakerWaveIcon className="h-5 w-5 text-blue-300 hover:text-blue-100 ml-auto" />
        </button>
        <div className="flex gap-4 mt-4">
          <Button
            text="Check"
            type="button"
            handleClick={onSubmit} // Submit to compare user input with the correct answer
          />
        </div>
      </form> */}
    </div>
  );
};

export default VerbCard;