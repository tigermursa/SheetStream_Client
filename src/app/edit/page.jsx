"use client";
import useSWR from "swr";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { fetcher } from "@/lib/fetcher";

const EditFileMainPage = () => {
  const { data: blogs, error } = useSWR(
    "http://localhost:5000/api/v1/files/files",
    fetcher,
    {
      revalidateOnFocus: true, // Revalidate when the window gains focus
      refreshInterval: 30000, // Refresh data every 30 seconds
      onError: (err) => console.error("Error fetching blogs:", err),
    }
  );

  if (error)
    return (
      <div className="text-center text-white h-screen flex items-center justify-center">
        Error loading blogs
      </div>
    );
  if (!blogs)
    return (
      <div className="text-center text-white h-screen flex items-center justify-center">
        Loading file...
      </div>
    );
  if (error) return <div className="text-center">Failed to load file</div>;

  if (blogs.data.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p>No blogs found to edit 🧐</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-gray-900 h-screen">
      {blogs.data.map((blog) => (
        <div
          key={blog._id}
          className="border-gray-200 pb-4 flex gap-5 justify-center"
        >
          <div className="flex gap-8 border py-3 px-24 rounded-sm items-center">
            <p>{blog.fileName}</p>
            <Link href={`/edit/${blog._id}`}>
              <p className="text-blue-500 text-sm flex items-center gap-1 border hover:border-blue-700 p-2 rounded-md">
                <AiOutlineEdit /> Edit File
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditFileMainPage;
