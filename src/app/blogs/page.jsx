import getAllBlogs from "@/lib/getAllBlogs";

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
    <div className="p-4 space-y-4 bg-white text-gray-900 h-max ">
      {blogs?.data?.map((blog) => (
        <div
          key={blog._id}
          className=" border-gray-200 pb-4 w-[70%] mx-auto mb-10"
        >
          <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
        </div>
      ))}
    </div>
  );
};

export default BlogMainPage;
