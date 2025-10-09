const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "lg",
  disabled = false,
  icon = null,
  className = "",
  block = true,
  ...rest
}) => {
  // ✅ 오타 prop이 DOM으로 퍼지지 않도록 제거
  const { blcok: _ignoreBlcok, ...domProps } = rest;

  const width = block ? "w-full" : "w-auto";
  const base =
    "transition-all duration-200 inline-flex items-center justify-center";

  const sizes = {
    lg: "py-3 rounded-xl font-semibold text-base",
    sm: "py-1 rounded-md font-semibold text-sm",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-300 via-amber-700 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
    secondary:
      "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
    dark: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",

    base: "border border-stone-500 bg-gradient-to-b from-stone-500 to-stone-800 text-white rounded hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
    basecancel:
      "border border-yellow-700 bg-gradient-to-b from-yellow-700 to-yellow-800 text-white rounded hover:shadow-md hover:scale-[1.02] disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${width} ${base} ${sizes[size]} ${
        variants[variant] ?? variants.primary
      } ${className}`}
      {...domProps}
    >
      {icon && <span className="mr-2 inline-flex">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
