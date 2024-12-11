import React, { Dispatch, SetStateAction, useState } from "react";
import { TenseMapping } from "../../utils/VerbFilters/tenseMapping";
import { VerbTypes } from "../../utils/VerbFilters/verbTypes";
import { Verbs, filtersRules } from "../../utils/VerbFilters/filtersRules";
import { getFilteredVerbs } from "../../utils/VerbFilters/verbFilters";
import { normalizeTense } from "../../utils/VerbFilters/normalizeTense";

interface SelectionPopupProps {
  setSelectionPopup: Dispatch<SetStateAction<boolean>>;
  onStartPractice: (
    tense: string,
    infinitives: string[],
    answer: string[][],
    sessionLength: number
  ) => void;
  sessionLength: number; // Add sessionLength as a prop
  setSessionLength: Dispatch<SetStateAction<number>>; // Add setter for sessionLength if needed
}

const SelectionPopup: React.FC<SelectionPopupProps> = ({
  setSelectionPopup,
  onStartPractice,
  sessionLength,
  setSessionLength,
}) => {  
  const [selectedTense, setSelectedTense] = useState<string>("");
  const [selectedVerbType, setSelectedVerbType] = useState<string>("");
  const [reflexive, setReflexive] = useState(false);
  const [currentInf, setCurrentInf] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[][]>([]);
  const [customInput, setCustomInput] = useState("");

  const handleSelection = (tense: string, verbType: string) => {
    setSelectedTense(tense);
    setSelectedVerbType(verbType);
  
    const filteredVerbs = getFilteredVerbs(tense, verbType, reflexive);
  
    if (filteredVerbs.length > 0) {
      const infinitives = filteredVerbs.map((verb) => verb.infinitif);
      const conjugated = filteredVerbs.map((verb) => {
        const tenseKey = TenseMapping[tense] as keyof Verbs;
        return normalizeTense(verb[tenseKey] ?? []);
      });
  
      setCurrentInf(infinitives);
      setAnswer(conjugated);
    } else {
      setCurrentInf([]);
      setAnswer([]);
    }
  };

  const handleStart = () => {
    onStartPractice(selectedTense, currentInf, answer, sessionLength);
  };
   
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div  className="bg-gray-600 rounded-lg shadow-lg p-6 w-auto min-w-[1200px] max-w-[80%]">
        {/* Tense Selection */}
        <h2 className="text-lg font-semibold text-blue-600 mb-4 text-center">Select the Tense</h2>
        <div className="grid grid-cols-6 gap-2">
          {Object.keys(filtersRules).map((tense) => (
            <button
              key={tense}
              className={`py-2 px-4 rounded-md ${
                selectedTense === tense
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleSelection(tense, selectedVerbType)} // Update tense
            >
              {tense}
            </button>
          ))}
        </div>

        {/* Verb Type Selection */}
        <h2 className="text-lg font-semibold text-blue-600 mb-4 text-center mt-6">Select the Verb Type</h2>
        <div className={`grid gap-2 grid-cols-6`}>
          {VerbTypes.map((verbType) => (
            <button
              key={verbType}
              className={`py-2 px-4 rounded-md ${
                selectedVerbType === verbType
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleSelection(selectedTense, verbType)} // Update verb type
            >
              {verbType}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-blue-600 mb-4 text-center mt-6">
          Select Session Length
        </h2>
        <div className="flex items-center space-x-4 text-blue-600 justify-center mb-4">
          <select
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customInput ? "" : sessionLength} // Clear dropdown if custom input is active
            onChange={(e) => {
              setSessionLength(parseInt(e.target.value)); // Update sessionLength
              setCustomInput(""); // Clear custom input when dropdown is used
              }}
            >
            <option value="" disabled>Select an option</option>
            {[5, 10, 20, 30, 40, 50].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            placeholder="Custom number"
            className="w-28 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeof sessionLength === "number" ? sessionLength : ""}
            onChange={(e) => {
              const value = e.target.value;
              setCustomInput(value);
              if (value) {
                setSessionLength(parseInt(value));
              }
            }}
          />
        </div>


        {/* Checkbox for reflexive verbs*/}
        <div className="flex items-center space-x-2 justify-end">
          <label
            htmlFor="reflexives"
            className="relative flex items-center cursor-pointer text-lg text-gray-700 font-semibold"
          >
            {"Include Reflexive Verbs ?"}
            <span
              className={`block w-5 h-5 ml-2 border-2 border-gray-400 rounded-md transition-all duration-200 ease-in-out
                ${reflexive ? 'bg-green-500 border-green-500 ring-2 ring-green-300' : 'hover:border-gray-600 hover:ring-2 hover:ring-gray-500'}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ></span>
          </label>
          <input
            type="checkbox"
            id="reflexives"
            className="hidden"
            checked={reflexive}
            onChange={(e) => setReflexive(e.target.checked)}
          />
        </div>

        {/* Bottom buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={() => setSelectionPopup(false)} // Close the popup
          >
            Close
          </button>
          <div className="relative group">
            <button className={`py-2 px-4 rounded-md ${
              currentInf.length === 0 || !(sessionLength > 0 && sessionLength < currentInf.length)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              disabled={
                currentInf.length === 0 || !(sessionLength > 0 && sessionLength < currentInf.length)
              }
              onClick={handleStart}
            >
              Start Practice
            </button>

            {/* Tooltips appears when button is disabled */}
            {(currentInf.length === 0 || (sessionLength > 0 && sessionLength < currentInf.length)) && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max bg-black text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {currentInf.length === 0
                  ? "Please select a tense and at least one list of verbs."
                  : `Please choose a number between 1 and ${currentInf.length}.`}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SelectionPopup;