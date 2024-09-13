import ButtonPrimary from "@/Components/Ui/Buttons/ButtonPrimary";
import getAllBlogs from "@/lib/getAllBlogs";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { MdDateRange } from "react-icons/md";

const BlogMainPage = async () => {
  const blogs = await getAllBlogs({
    next: {
      revalidate: 120,
    },
  });

  // Show message if there are no blogs
  if (!blogs?.data || blogs.data.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p>No blogs uploaded 🧐</p>
      </div>
    );
  }
  //console.log(blogs)
  return (
    <div className=" space-y-4 bg-gray-900 text-gray-200 overflow-auto">
      {blogs?.data?.map((blog) => {
        // Only render blog if it is online
        if (blog?.isOnline) {
          return (
            <div key={blog._id} className="border-gray-200 pb-4  mb-20">
              {/* Render Image One if available */}
              {blog?.imageOne && (
                <div>
                  <Image
                    src={blog.imageOne}
                    width={600}
                    height={600}
                    alt="Image one"
                    className="mx-auto mb-2 w-full h-auto rounded-lg"
                  />
                </div>
              )}

              {/* Render Upload Date */}
              {blog?.uploadDate && (
                <div>
                  <h2 className="text-lg mb-10 font-sans font-semibold flex items-center gap-1">
                    <MdDateRange size={25} />
                    {format(
                      new Date(blog.uploadDate),
                      "d MMMM yyyy 'at' h:mm a"
                    )}
                  </h2>
                </div>
              )}

              {/* Render Title */}
              {blog?.title && (
                <div>
                  <h2 className="text-3xl font-extrabold mb-2 font-serif">
                    {blog.title}
                  </h2>
                </div>
              )}

              {/* Render Short Description */}
              {blog?.shortDescription && (
                <div>
                  <h2 className="text-lg font-normal font-serif mb-6">
                    {blog.shortDescription}...
                  </h2>
                </div>
              )}

              {/* Read Details Button */}
              <Link href={`/blogs/${blog?._id}`}>
                <ButtonPrimary name="Read Details" color="blue" />
              </Link>
            </div>
          );
        }

        // Optional message for blogs that are not online (can be removed if not needed)
        return null;
      })}

      {!blogs?.data?.some((blog) => blog.isOnline) && (
        <div className="text-gray-100 flex items-center justify-center text-lg text-center h-screen bg-gray-900 ">
          No blogs are currently online
        </div>
      )}
    </div>
  );
};

export default BlogMainPage;
