interface TextContainerProps {
  onSetupClick: () => void; // Prop to trigger the popup
}

const TextContainer: React.FC<TextContainerProps> = ({ onSetupClick }) => {
  return (
    <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl flex flex-col items-center">
      {/* <h1 className="text-4xl text-red-500 font-bold tracking-tight sm:text-6xl">Conjugator 200</h1> */}
      <p className="mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
        Allez allez allez !
      </p>
      <div className="mt-4">
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onSetupClick}
        >
          Set up your practice session
        </button>
      </div>

        {/* {open && <Popup onClose={() => setOpen(false)} />} */}

    </div>
  );
};

export default TextContainer