const InputToday = () => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="w-20">구매 날짜</label>
      <input
        type="date"
        className="border border-gray-400 p-1 rounded w-30 text-sm 
                   focus:border-sky-400 focus:outline-none"
        defaultValue={today}
        required
      />
    </div>
  );
};

export default InputToday;
