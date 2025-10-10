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
  // 오타 prop이 DOM으로 퍼지지 않도록 제거
  const { blcok: _ignoreBlcok, ...domProps } = rest;

  const width = block ? "w-full" : "w-auto";
  const base =
    "transition-all duration-200 inline-flex items-center justify-center";

  const sizes = {
    lg: "py-3 rounded-xl font-semibold text-base",
    sm: "py-1 rounded-md font-semibold text-sm",
  };

  const variants = {
    primary: [
      "text-white border border-amber-400",
      "bg-gradient-to-b from-amber-400 via-amber-600 to-amber-700",
      "hover:from-amber-500 hover:via-amber-700 hover:to-amber-800",
      "hover:scale-[1.005]",
      "disabled:hover:scale-100",
      "shadow-inner/amber",
    ].join(" "),
    secondary: [
      "bg-white border border-gray-300 text-gray-800",
      "hover:bg-gray-50 hover:border-gray-400",
      "hover: scale-[1.005]",
      "disabled:hover:scale-100",
    ].join(" "),
    dark: [
      "bg-gradient-to-b from-gray-800 to-gray-900 text-white border border-gray-900",
      "hover:from-gray-800 hover:to-black",
      "hover: scale-[1.005]",
      "disabled:hover:scale-100",
    ].join(" "),
    base: [
      "border border-stone-600 text-white rounded",
      "bg-gradient-to-b from-stone-500 to-stone-800",
      "hover:from-stone-600 hover:to-stone-900",
      "hover:scale-[1.005]",
      "disabled:hover:scale-100",
    ].join(" "),
    basecancel: [
      "border border-yellow-800 text-white rounded",
      "bg-gradient-to-b from-yellow-700 to-yellow-900",
      "hover:from-yellow-800 hover:to-yellow-950",
      "hover:scale-[1.005]",
      "disabled:hover:scale-100",
    ].join(" "),
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
