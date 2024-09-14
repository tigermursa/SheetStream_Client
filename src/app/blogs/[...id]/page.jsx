/* eslint-disable react-refresh/only-export-components */
import getAllBlogs from "@/lib/getAllBlogs";
import getSingleBlogs from "@/lib/getSingleBlog";
import Image from "next/image";
import { Open_Sans } from "next/font/google";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "SheetStream | Blogs Details",
  description: "Upload blogs with docx file input",
};

// SSR CODE ...
export const generateStaticParams = async () => {
  const res = await getAllBlogs();
  const blogs = await res?.data;

  return blogs.slice(0, 4).map((blog) => ({
    blogId: blog?.id,
  }));
};

const BlogDetails = async ({ params }) => {
  const blogId = params?.id;
  const blog = await getSingleBlogs(blogId);

  return (
    <div className={font?.className}>
      <div>
        <div className="w-[50%] mx-auto pt-10 pb-10">
          {/* Conditional rendering for imageOne */}
          {blog?.data?.imageOne && (
            <div>
              <Image
                src={blog?.data?.imageOne}
                width={600}
                height={600}
                alt="Image one"
                className="mx-auto mb-10 w-full h-auto rounded-lg"
              />
            </div>
          )}

          {/* Conditional rendering for title */}
          {blog?.data?.title && (
            <div>
              <h2 className="text-3xl font-extrabold mb-10 ">
                {blog?.data?.title}
              </h2>
            </div>
          )}

          <div className="relative">
            {/* Conditional rendering for imageTwo */}
            {blog?.data?.imageTwo && (
              <div className="float-left mr-4 mb-2">
                <Image
                  src={blog?.data?.imageTwo}
                  width={300}
                  height={300}
                  alt="Image two"
                  className="block p-3 rounded-md"
                />
              </div>
            )}

            {/* Correctly structured dangerouslySetInnerHTML */}
            {blog?.data?.htmlContent && (
              <div
                dangerouslySetInnerHTML={{ __html: blog?.data?.htmlContent }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
