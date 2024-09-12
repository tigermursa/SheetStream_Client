import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import getAllBlogs from "@/lib/getAllBlogs";

const EditFileMainPage = () => {
  const blogs = getAllBlogs();

  if (blogs.data.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p>No files found to edit 🧐</p>
      </div>
    );
  }

  console.log();

  return (
    <div className="p-6 space-y-6 bg-gray-900 h-screen flex flex-col items-center">
      <h1 className="text-white text-2xl font-bold mb-8">All Files</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.data?.map((blog) => (
          <div
            key={blog?._id}
            className="flex flex-col items-center justify-between bg-gray-800 text-white shadow-md hover:shadow-xl hover:bg-gray-700 transition-all duration-300 rounded-lg p-6 w-full max-w-xs"
          >
            <p className="truncate w-full text-lg font-medium mb-4">
              {blog?.fileName}
            </p>
            <Link href={`/edit/${blog?._id}`} className="w-full">
              <button className="w-full text-sm font-semibold text-blue-500 flex items-center justify-center gap-2 bg-gray-900 border border-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                <AiOutlineEdit className="text-lg" /> Edit File
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditFileMainPage;
