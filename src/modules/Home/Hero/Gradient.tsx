const Gradient = () => {
  return (
    <div
      className="absolute left-0 right-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div className="aspect-[16/9] w-[48rem] mx-auto bg-gradient-to-t from-[#000000] via-[gray] to-[#000000] opacity-30" />
    </div>
  );
};

export default Gradient;
