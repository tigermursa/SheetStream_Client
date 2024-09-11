import getAllBlogs from "@/lib/getAllBlogs";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai"; // Importing the edit icon

const EditFileMainPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="p-4 space-y-4 bg-white text-gray-800 h-screen">
      {blogs?.files?.map((blog) => (
        <div key={blog._id} className=" border-gray-200 pb-4 flex gap-5 justify-center">
          <p>{blog.fileName}</p>
          <Link href={`/edit/${blog._id}`}>
            <p className="text-blue-500 hover:underline flex items-center gap-1">
              <AiOutlineEdit /> Update
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EditFileMainPage;
