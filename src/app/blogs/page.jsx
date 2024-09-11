import getAllBlogs from "@/lib/getAllBlogs";

const BlogMainPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="p-4 space-y-4 bg-white text-gray-900 ">
      {blogs?.files?.map((blog) => (
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
