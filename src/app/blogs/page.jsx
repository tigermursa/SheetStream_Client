import ButtonPrimary from "@/Components/Ui/Buttons/ButtonPrimary";
import getAllBlogs from "@/lib/getAllBlogs";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { MdDateRange } from "react-icons/md";
const BlogMainPage = async () => {
  const blogs = await getAllBlogs();

  if (blogs?.data?.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p>No blogs Uploaded 🧐</p>
      </div>
    );
  }

  //console.log(blogs);

  return (
    <div className="p-4 space-y-4 bg-white text-gray-900 overflow-auto">
      {blogs?.data?.map((blog) => (
        <div
          key={blog._id}
          className="border-gray-200 pb-4 w-[50%] mx-auto mb-20"
        >
          {/* Conditional rendering for imageOne */}
          {blog?.imageOne && (
            <div>
              <Image
                src={blog?.imageOne}
                width={600}
                height={600}
                alt="Image one"
                className="mx-auto mb-2 w-full h-auto rounded-lg"
              />
            </div>
          )}
          {/* Posted date */}
          {blog?.uploadDate && (
            <div>
              <h2 className="text-lg mb-10 font-sans font-semibold flex items-center gap-1">
                <MdDateRange size={25} />
                {format(new Date(blog.uploadDate), "d MMMM yyyy 'at' h:mm a")}
              </h2>
            </div>
          )}
          {/* Conditional rendering for title */}
          {blog?.title && (
            <div>
              <h2 className="text-3xl font-extrabold mb-2 font-serif">
                {blog?.title}
              </h2>
            </div>
          )}
          {/* Conditional rendering for shortDescription */}
          {blog?.shortDescription && (
            <div>
              <h2 className="text-lg font-normal  font-serif mb-6">
                {blog?.shortDescription}...
              </h2>
            </div>
          )}

          <Link href={`/blogs/${blog?._id}`}>
            <ButtonPrimary name={"Read Details"} color={"blue"} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogMainPage;
