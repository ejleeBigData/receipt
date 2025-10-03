const Subtotal = ({ label, value }) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <span className="text-gray-800 text-sm text-center w-full block ">
        {value}
      </span>
    </div>
  );
};

export default Subtotal;
