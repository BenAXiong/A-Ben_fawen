import { useState, useEffect, useRef } from "react";
import { VerbCard, TextContainer } from "../../../components/PracticeSession";
import { SelectionPopup, ResultsPopup } from "../../../components/Popups";
import { speakText } from "../../../utils/tts";
import Stats from "../../../components/Stats/Stats";
import Gradient from "./Gradient";

const Conj200 = () => {
  const [selectionPopup, setSelectionPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [resultsPopup, setResultsPopup] = useState(false);
  
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedbackState, setFeedbackState] = useState<"default" | "correct" | "incorrect">("default");
  const [sessionLength, setSessionLength] = useState(10);
  const [practiceSession, setPracticeSession] = useState<{
    tense: string;
    verbs: string[];
    answer: string[][];
    pronounIndex: number;
    selectedPronoun: string;
  } | null>(null);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<string[]>([]);

  // @ts-ignore
  const [pronounIndex, setPronounIndex] = useState(42);
  const pronouns = [["je"], ["tu"], ["il","elle","on"], ["nous"], ["vous"], ["ils","elles"]];
  // setPronounIndex(getRandomIndex(group.length)); // Randomly pick a pronoun from the group
  const getRandomIndex = (max: number): number => Math.floor(Math.random() * max);
  const getRandomPronoun = (groups: string[][], index: number): string => {
    const group = groups[index]; // Get the group based on the index
    const tempIndex = getRandomIndex(group.length); // Randomly pick a pronoun from the group
    return group[tempIndex];
  };

  const getCorrectAnswer = (): string[] => {
    if (!practiceSession) return [];
    const { answer, pronounIndex } = practiceSession;
    return answer?.[currentVerbIndex]?.[pronounIndex]
      ? answer[currentVerbIndex][pronounIndex].split(",").map((a) => a.trim().toLowerCase())
      : [];
  };

  const handleStart = (tense: string, verbs: string[], answer: string[][], sessionLength: number) => {
    if (currentVerbIndex > 0) return;
    
    // console.log('Starting practice with session length:', sessionLength)
    const selectedVerbs = verbs.slice(0, sessionLength); // Limit the verbs to the session length.
    // setPronounIndex (getRandomIndex(pronouns.length)); //asynchronous = won't work on first click...
    const firstPronounIndex = getRandomIndex(pronouns.length);
    const firstSelectedPronoun = getRandomPronoun(pronouns, firstPronounIndex);
    
    setPracticeSession({ 
      tense, 
      verbs: selectedVerbs, 
      answer, 
      pronounIndex: firstPronounIndex,
      selectedPronoun: firstSelectedPronoun,
    });
    setSelectionPopup(false); setUserInput("");
    setCorrectCount(0); setIncorrectCount(0); setStreak(0); setMaxStreak(0); setAnswerHistory([]); 
    setCurrentVerbIndex(0);
    speakText(selectedVerbs[0]);
  };

  const handleSubmit = () => {
    if (!practiceSession) return;
  
    const { verbs, pronounIndex} = practiceSession;
    // const { verbs} = practiceSession;
    const correctAnswer = getCorrectAnswer();
    
    //also deals with variants in essayer, payer, etc
    const isCorrect = practiceSession.tense === "Passé Composé"
    ? correctAnswer.some((validAnswer) => 
        userInput.trim().toLowerCase() === (validAnswer.split(' ').pop()?.toLowerCase() ?? '')
      )
    : correctAnswer.some((validAnswer) => 
        userInput.trim().toLowerCase() === validAnswer.toLowerCase()
      );
    if (isCorrect) {
      setFeedbackState("correct");
      setTimeout(() => {
        if (currentVerbIndex < sessionLength - 1) {
          const nextPronounIndex = getRandomIndex(pronouns.length);
          setPracticeSession((prevSession) => {
            if (!prevSession) return null; // Handle null session
            return {
              ...prevSession, // Retain previous session values
              pronounIndex: nextPronounIndex,
              selectedPronoun: getRandomPronoun(pronouns, nextPronounIndex),
            };
          });
          setUserInput("");
          setFeedbackState("default");
          setCurrentVerbIndex((prev) => prev + 1);
          setPronounIndex(nextPronounIndex);
          speakText(`${pronouns[pronounIndex]} ${userInput}`);
          speakText(verbs[(currentVerbIndex + 1) % verbs.length]);
          // console.log("index:", pronounIndex);

        } else {
          onEndSession();
        }
      }, 500);
    } else {
      setFeedbackState("incorrect");
      setTimeout(() => setFeedbackState("default"), 500);
    }
  
    handleStats(isCorrect, isCorrect
      ? `(${currentVerbIndex + 1}) ✓ ${pronouns[pronounIndex]} ${userInput}`
      : `(${currentVerbIndex + 1}) ✕ ${userInput} | ${pronouns[pronounIndex]} + ${verbs[currentVerbIndex]} = ${correctAnswer.join("/")}`
    );
  };

  const onEndSession = () => {
    // console.log("Session ending, showing ResultsPopup...");
    setUserInput("");
    setResultsPopup(true);
    setFeedbackState("default");
    setPracticeSession(null);
  };

  const handleStats = (isCorrect: boolean, answerDetails: string) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((prevMax) => Math.max(prevMax, newStreak));
        return newStreak;
      });
      setAnswerHistory(prev => [...prev, `${answerDetails}`]);
    } else {
      setIncorrectCount(prev => prev + 1);
      setStreak(0);
      setAnswerHistory(prev => [...prev, `${answerDetails}`]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click is outside the popup
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setSelectionPopup(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent accidental form submission
        handleSubmit();
      } else if (e.key === "Tab") {
        e.preventDefault(); // Prevent default Tab behavior
        if (!practiceSession) return;
        setUserInput(getCorrectAnswer()[0]?.split(' ').pop() ?? ''); // Paste correctAnswer into input field
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Cleanup the listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, [handleSubmit, setUserInput]);

  return (
    <div>
      <div className="relative isolate">
        <Gradient />
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-64 pt-36 sm:pt-60 lg:px-8 lg:pt-0">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex flex-col lg:max-w-none lg:items-center justify-center">

            {!practiceSession && (
              <TextContainer onSetupClick={() => setSelectionPopup(true)} />
            )}

            {/* Conditionally Render Popup */}
            {selectionPopup && (
              <div
                ref={popupRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-gray-800 bg-opacity-95 text-white rounded-xl shadow-lg w-auto min-w-[300px]"
                >
                <SelectionPopup
                  setSelectionPopup={setSelectionPopup}
                  onStartPractice={handleStart}
                  sessionLength={sessionLength}
                  setSessionLength={setSessionLength}
                />
              </div>
            )}

              {/* Render Practice Session if Set */}
              {practiceSession && (
                <VerbCard
                  tense={practiceSession.tense}
                  infinitives={practiceSession.verbs}
                  sessionLength={sessionLength}
                  currentVerbIndex={currentVerbIndex}
                  pronoun={practiceSession.selectedPronoun}
                  userInput={userInput}
                  feedbackState={feedbackState}
                  onUserInputChange={setUserInput}
                  onSubmit={handleSubmit}
                />
              )}
              {practiceSession && (
              // {/* <div className="fixed left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-800 bg-opacity-80 text-white rounded-xl shadow-lg"> */}
                <Stats
                // sessionLength={sessionLength}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
                streak={streak}
                maxStreak={maxStreak}
                answerHistory={answerHistory}
                />
              // {/* </div> */}
              )}

              {resultsPopup && (
                <ResultsPopup
                  results={answerHistory}
                  onClose={() => {
                    setResultsPopup(false); 
                    setCurrentVerbIndex(0)}}
                  onNext={() => {
                    setResultsPopup(false); 
                    setSelectionPopup(true);
                    setCurrentVerbIndex(0);}}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conj200;
