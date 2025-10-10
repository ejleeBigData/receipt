// src/components/ui/Input.jsx
const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false,
  variant = "signup",
  className = "",
  ...rest // min, max, step, checked, disabled, onBlur 등
}) => {
  const styles = {
    signup:
      "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all",
    category:
      "w-full border border-gray-400 p-1 rounded text-sm focus:border-sky-400 focus:outline-none",
    data: "w-full border border-gray-400 p-1 rounded text-sm focus:border-sky-400 focus:outline-none",
  };

  // 체크박스/라디오면 텍스트 인풋 스타일 대신 기본만 두는 게 자연스러움
  const isCheck = type === "checkbox" || type === "radio";
  const baseClass = isCheck ? "" : styles[variant] ?? styles.category;

  return (
    <input
      id={id}
      type={type || "text"}
      name={name || id}
      placeholder={placeholder}
      value={isCheck ? undefined : value}
      checked={isCheck ? value : undefined}
      onChange={onChange}
      required={required}
      className={`${baseClass} ${className}`}
      {...rest}
    />
  );
};

export default Input;
