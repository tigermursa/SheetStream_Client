const ButtonPrimary = ({ name, color }) => {
  return (
    <div
      className={`border w-max font-semibold py-2 px-5 rounded-md cursor-pointer 
          border-${color}-500 text-${color}-500 
          hover:border-${color}-700  hover:text-${color}-800`}
    >
      {name}
    </div>
  );
};

export default ButtonPrimary;
