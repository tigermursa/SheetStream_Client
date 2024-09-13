import Search from "@/Components/Search/Search";
import BlogMainPage from "./blogs/page";
import Quotes from "@/Components/Quotes/Quotes";

const Page = () => {
  return (
    <div className="grid grid-cols-12 ">
      {/* Left side (Other Content) */}
      <div className="col-span-2 bg-gray-900 text-white p-4 sticky border-r border-gray-700">
        <div className="sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Quotes..</h2>
          <Quotes />
        </div>
      </div>

      {/* Middle (Blogs Section) */}
      <div className="col-span-8  p-20 pt-5 bg-gray-900">
        <BlogMainPage />
      </div>

      {/* Right side (Sidebar/Search Bar) */}
      <div className="col-span-2 bg-gray-900 text-gray-950 p-4 border-l border-gray-700 ">
        <div className="sticky top-4">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Page;
