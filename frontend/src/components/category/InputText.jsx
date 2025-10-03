const InputText = ({
  label,
  inputWidthClass,
  placeholder,
  id,
  type,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="w-15">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type || "text"}
        className={`border border-gray-400 p-1 rounded text-sm focus:border-sky-400 focus:outline-none ${inputWidthClass}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputText;
