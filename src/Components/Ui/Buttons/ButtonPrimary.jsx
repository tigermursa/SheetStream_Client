const ButtonPrimary = ({ name, color }) => {
  return (
    <div
      className={`border w-max font-semibold py-1 px-3 rounded-md cursor-pointer 
          border-${color}-500 text-${color}-500 
          hover:border-${color}-700 hover:text-${color}-700`}
    >
      {name}
    </div>
  );
};

export default ButtonPrimary;
