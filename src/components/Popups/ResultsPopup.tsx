const ResultsPopup = ({ 
  results, 
  onClose, 
  onNext 
}: { 
  results: string[], 
  onClose: () => void, 
  onNext: () => void 
}) => {
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