import Loader from "@/Components/Ui/Loader/Loader";

const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default loading;
