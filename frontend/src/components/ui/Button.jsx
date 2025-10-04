const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "lg", // ← baseStyle 대신 size 사용
  disabled = false,
  icon = null,
  className = "",
  block = true, //기본은 block(가록 꽉)
  ...rest
}) => {
  const sizes = {
    lg: "w-full py-3 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center",
    sm: "w-full py-1 rounded-md font-semibold text-sm transition-all duration-200 flex items-center justify-center",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-300 via-amber-700 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
    secondary:
      "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
    dark: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
    base: "border border-stone-500 bg-gradient-to-b from-stone-500 to-stone-800 text-white rounded transition-all duration-200 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} ${
        variants[variant] ?? variants.primary
      } ${className}`}
      {...rest}
    >
      {icon && <span className="mr-2 inline-flex">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
