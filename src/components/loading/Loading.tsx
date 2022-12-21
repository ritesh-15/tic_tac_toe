const Loading: React.FC = () => {
  return (
    <div className="min-h-screen z-25 bg-white flex flex-col items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="w-[35px] h-[35px] rounded-full animate-pulse bg-primary"></div>
        <div className="w-[35px] h-[35px] rounded-full animate-pulse bg-primary"></div>
        <div className="w-[35px] h-[35px] rounded-full animate-pulse bg-primary"></div>
      </div>
      <p className="mt-8 text-xl">Loading...</p>
    </div>
  );
};

export default Loading;
