const InputItem = ({ label, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-2 text-sm focus:border-sky-400 
        focus:ring-2 focus:ring-sky-100 outline-none w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputItem;
