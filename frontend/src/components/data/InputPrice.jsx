const InputPrice = ({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  className = "",
}) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type="number"
        min={min}
        className={`border border-gray-300 rounded-lg p-2 text-sm focus:border-sky-400 focus:ring-2
             focus:ring-sky-100 outline-none ${className}`}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputPrice;
