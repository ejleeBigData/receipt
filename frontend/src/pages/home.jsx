const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-white text-2xl mb-6">playground</h1>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md h-32 flex items-center justify-center text-gray-800 font-bold"
          >
            Box {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
