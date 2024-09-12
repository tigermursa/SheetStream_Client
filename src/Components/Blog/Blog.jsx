import ButtonPrimary from "@/Components/Ui/Buttons/ButtonPrimary";
import getAllBlogs from "@/lib/getAllBlogs";
import Image from "next/image";
import Link from "next/link";

const Blog = async () => {
  const blogs = await getAllBlogs();

  if (blogs?.data?.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p>No blogs Uploaded 🧐</p>
      </div>
    );
  }

  console.log(blogs);

  return (
    <div className="p-4 space-y-4 bg-white text-gray-900 overflow-auto">
      {blogs?.data?.map((blog) => (
        <div
          key={blog._id}
          className="border-gray-200 pb-4 w-[50%] mx-auto mb-10"
        >
          {/* Conditional rendering for imageOne */}
          {blog?.imageOne && (
            <div>
              <Image
                src={blog?.imageOne}
                width={600}
                height={600}
                alt="Image one"
                className="mx-auto mb-10 w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Conditional rendering for title */}
          {blog?.title && (
            <div>
              <h2 className="text-3xl font-extrabold mb-3 font-serif">
                {blog?.title}
              </h2>
            </div>
          )}
          {/* Conditional rendering for title */}
          {blog?.shortDescription && (
            <div>
              <h2 className="text-lg font-normal mb-10 font-serif">
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

export default Blog;
