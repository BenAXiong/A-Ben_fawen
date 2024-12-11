import React, { useState } from 'react';
import { speakText } from "../../utils/tts";
// import { ClipboardIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import { ClipboardIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

interface StatsProps {
  // sessionLength: number;
  correctCount: number;
  incorrectCount: number;
  streak: number;
  maxStreak: number;
  answerHistory: string[];
}

const Stats: React.FC<StatsProps> = ({ 
  // sessionLength,
  correctCount, 
  incorrectCount, 
  streak, 
  maxStreak, 
  answerHistory 
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000); // Resets after 1 second
    });
  };
  
  return (
    <div className="flex flex-row items-center  -translate-y-80">
      {/* <div className="fixed w-28 top-48 left-80 flex flex-col gap-2"> */}
      <div className="flex flex-row items-center -translate-x-40 gap-2">
        <div className="p-1 text-green-400">
          {/* <p className="text-center font-bold">Correct</p> */}
          <p className="text-center text-xl">{correctCount}</p>
        </div>

        <div className="p-1 text-red-400">
          {/* <p className="text-center font-bold">Incorrect</p> */}
          <p className="text-center text-xl">{incorrectCount}</p>
        </div>
      </div>

      <div className="flex flex-row items-center translate-x-40 gap-2">
        <div className="p-1 text-yellow-400">
            {/* <p className="text-center font-bold">Streak</p> */}
            <p className="text-center text-xl">{streak}</p>
        </div>
          
        <div className="p-1 text-yellow-400">
            {/* <p className="text-center font-bold">Max Streak</p> */}
            <p className="text-center text-xl">{maxStreak}</p>
           </div>
        </div>

        <div className="fixed w-96 top-0 left-72 flex flex-col gap-1 -translate-y-2">
        {answerHistory.slice(-10).map((entry, index) => {
          const isCorrect = !entry.includes("✕");
          return (
            <div
              key={index}
              className={`relative flex items-center gap-2 p-3 bg-gray-800 bg-opacity-80 font-bold rounded-b-lg shadow-lg ${isCorrect ? "text-green-500" : "text-red-500"}`}
            >
              <p className="text-sm flex-grow">{entry}</p>
              
              <div className="flex items-center gap-2">
                {/* Speak button */}
                <button 
                  onClick={() => speakText(entry)}
                  className="hover:text-blue-300 transition-colors"
                  aria-label="Listen to answer"
                >
                  <SpeakerWaveIcon className="h-5 w-5" />
                </button>

                {/* Copy to clipboard button */}
                <button 
                  onClick={() => handleCopyToClipboard(entry, index)}
                  className="hover:text-blue-300 transition-colors"
                  aria-label="Copy answer to clipboard"
                >
                  {copiedIndex === index ? (
                    <span className="text-xs text-green-500">Copied!</span>
                  ) : (
                    <ClipboardIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Stats;

// return (
//   <div>
//     <div className="fixed w-28 top-48 left-80 flex flex-col gap-2">
//       <div className="p-3 bg-gray-800 bg-opacity-80 text-green-400 rounded-t-lg shadow-lg">
//         {/* <p className="text-center font-bold">Correct</p> */}
//         <p className="text-center text-xl">{correctCount}</p>
//       </div>

//       <div className="p-3 bg-gray-800 bg-opacity-80 text-red-400 rounded shadow-lg">
//         {/* <p className="text-center font-bold">Incorrect</p> */}
//         <p className="text-center text-xl">{incorrectCount}</p>
//       </div>
//     </div>

//     <div className="fixed w-28 top-88 left-80 flex flex-col gap-2">
//       <div>
//         <div className="p-3 bg-gray-800 bg-opacity-80 text-yellow-400 rounded shadow-lg">
//           {/* <p className="text-center font-bold">Streak</p> */}
//           <p className="text-center text-xl">{streak}</p>
//         </div>
        
//         <div className="p-3 bg-gray-800 bg-opacity-80 text-yellow-400 rounded shadow-lg">
//           {/* <p className="text-center font-bold">Max Streak</p> */}
//           <p className="text-center text-xl">{maxStreak}</p>
//           </div>
//         </div>
//       </div>

//       <div className="fixed w-80 top-36 right-28 flex flex-col gap-1">
//       {answerHistory.slice(-10).map((entry, index) => {
//         const isCorrect = !entry.includes("✕");
//         return (
//           <div
//             key={index}
//             className={`relative flex items-center gap-2 p-3 bg-gray-800 bg-opacity-80 font-bold rounded-b-lg shadow-lg ${isCorrect ? "text-green-500" : "text-red-500"}`}
//           >
//             <p className="text-sm flex-grow">{entry}</p>
            
//             <div className="flex items-center gap-2">
//               {/* Speak button */}
//               <button 
//                 onClick={() => speakText(entry)}
//                 className="hover:text-blue-300 transition-colors"
//                 aria-label="Listen to answer"
//               >
//                 <SpeakerWaveIcon className="h-5 w-5" />
//               </button>

//               {/* Copy to clipboard button */}
//               <button 
//                 onClick={() => handleCopyToClipboard(entry, index)}
//                 className="hover:text-blue-300 transition-colors"
//                 aria-label="Copy answer to clipboard"
//               >
//                 {copiedIndex === index ? (
//                   <span className="text-xs text-green-500">Copied!</span>
//                 ) : (
//                   <ClipboardIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );
// };


// export default Stats;
