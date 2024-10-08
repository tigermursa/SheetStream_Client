import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import getAllBlogs from "@/lib/getAllBlogs";

const EditFileMainPage = async () => {
  const blogs = await getAllBlogs();

  if (blogs?.data?.length === 0 || blogs.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p className="font-semibold">No files found to edit 🧐</p>
      </div>
    );
  }

  // console.log(blogs);

  return (
    <div className="p-6 space-y-6 h-screen flex flex-col items-center ">
      <h1 className="text-2xl font-bold mb-8  dark:text-white">All Files</h1>
      <div className="w-full max-w-6xl">
        <table className="w-full table-auto border-collapse border border-gray-200 dark:border-gray-700 cursor-pointer">
          <thead>
            <tr className="bg-primary text-white text-sm">
              <th className="border border-gray-300 dark:border-gray-700 py-2 px-4 text-left">
                File Name
              </th>
              <th className="border border-gray-300 dark:border-gray-700 py-2 px-4 text-left">
                Status
              </th>
              <th className="border border-gray-300 dark:border-gray-700 py-2 px-4 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs?.data?.map((blog) => (
              <tr key={blog?._id}>
                <td className="border border-gray-300 dark:border-gray-700 py-2 px-4 font-semibold truncate w-[10px]">
                  {blog?.fileName}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 py-2 px-4">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      blog?.isOnline ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></span>
                  {blog?.isOnline ? "Online" : "Offline"}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 py-2 px-4 ">
                  <Link href={`/edit/${blog?._id}`}>
                    <button className="flex items-center gap-2 hover:text-primary">
                      <AiOutlineEdit className="text-lg" /> Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditFileMainPage;
