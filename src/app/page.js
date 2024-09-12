import BlogMainPage from "./blogs/page";

const Page = () => {
  return (
    <div className="grid grid-cols-12 ">
      {/* Left side (Other Content) */}
      <div className="col-span-2 bg-gray-900 text-white p-4 sticky">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold mb-4">Left Sidebar</h2>
          <p>Some content goes here...</p>
        </div>
      </div>

      {/* Middle (Blogs Section) */}
      <div className="col-span-8  p-20 pt-5 bg-gray-950">
        <BlogMainPage />
      </div>

      {/* Right side (Sidebar/Search Bar) */}
      <div className="col-span-2 bg-gray-900 text-white p-4">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold mb-4">Search Bar</h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
