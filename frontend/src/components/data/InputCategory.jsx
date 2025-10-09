import { useEffect, useId, useState } from "react";

const InputCategory = ({
  label,
  value,
  onChange = () => {},
  options = [],
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value?.name ?? "");
  const listId = useId();

  useEffect(() => {
    setInputValue(value?.name ?? "");
  }, [value?.name]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (!inputValue.trim()) return;

    const matched = options.find((o) => o.stem_name === inputValue);

    if (!matched) {
      alert("해당 카테고리가 없습니다.");
      setInputValue("");
      onChange({ id: null, name: "" });
    } else {
      onChange({ id: matched.stem_id, name: matched.stem_name });
    }
  };

  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        list="category-list"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border border-gray-300 rounded-lg p-2 text-sm focus:border-sky-400 
        focus:ring-2 focus:ring-sky-100 outline-none ${className}`}
        placeholder="카테고리 선택"
      />
      <datalist id="category-list">
        {options.map((cat) => (
          <option key={cat.stem_id} value={cat.stem_name} />
        ))}
      </datalist>
    </div>
  );
};

export default InputCategory;
