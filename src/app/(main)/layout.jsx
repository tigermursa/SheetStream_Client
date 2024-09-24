import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Navbar/Navbar";

const MaindLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MaindLayout;
