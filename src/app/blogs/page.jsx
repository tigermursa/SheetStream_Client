import getAllBlogs from "@/lib/getAllBlogs";
import Image from "next/image";

const BlogMainPage = async () => {
  const blogs = await getAllBlogs();

  if (blogs?.data?.length === 0) {
    return (
      <div className="text-gray-100 h-screen flex justify-center items-center">
        <p>No blogs Uploaded 🧐</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-white text-gray-900 overflow-auto">
      {blogs?.data?.map((blog) => (
        <div
          key={blog._id}
          className="border-gray-200 pb-4 w-[50%] mx-auto mb-10"
        >
          <div>
            <Image
              src={blog?.imageOne}
              width={600}
              height={600}
              alt="Image one"
              className="mx-auto mb-10 w-full h-auto"
            />
          </div>
          
          <div className="relative">
            {/* Float imageTwo to the left */}
            <div className="float-left mr-4 mb-2">
              <Image
                src={blog?.imageTwo}
                width={300}  // Adjust width as necessary
                height={300}
                alt="Image two"
                className="block p-3"
              />
            </div>
            {/* Blog content will wrap around the image */}
            <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
          </div>

          {/* Clear the float to avoid overlapping */}
          <div className="clear-both"></div>
        </div>
      ))}
    </div>
  );
};

export default BlogMainPage;
