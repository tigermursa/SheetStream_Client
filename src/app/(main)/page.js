import Quotes from "@/Components/Quotes/Quotes";
import Recommended from "@/Components/Recommended/Recommended";

import BlogMainPage from "./blogs/page";
import Search from "@/Components/Search/Search";

const MainHome = () => {
  return (
    <div className="grid grid-cols-12 ">
      {/* Left side (Other Content) */}
      <div className="col-span-2  p-4 sticky top-4 border-r border-gray-700 hidden lg:block">
        <div className="sticky top-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Quotes..</h2>
            <Quotes />
          </div>
          <div>
            <h2 className="text-sm font-medium mb-2 mt-14">
              Recommended blogs
            </h2>
            <Recommended />
          </div>
        </div>
      </div>

      {/* Middle (Blogs Section) */}
      <div className="col-span-12 lg:col-span-8 p-5 xl:p-20 pt-5">
        <BlogMainPage />
      </div>

      {/* Right side (Sidebar/Search Bar) */}
      <div className="col-span-2  md:p-4 border-l border-gray-700 hidden lg:block">
        <div className="sticky top-4">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default MainHome;
