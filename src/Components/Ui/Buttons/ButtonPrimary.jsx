const ButtonPrimary = ({ name, color }) => {
  return (
    <div
      className={`border w-max font-semibold text-xs lg:text-lg py-2 px-5 rounded-md cursor-pointer 
          border-blue-500 text-${color}-500 
          hover:border-blue-700  hover:text-${color}-800`}
    >
      {name}
    </div>
  );
};

export default ButtonPrimary;
