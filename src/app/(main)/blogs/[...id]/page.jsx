/* eslint-disable react-refresh/only-export-components */
import getAllBlogs from "@/lib/getAllBlogs";
import getSingleBlogs from "@/lib/getSingleBlog";
import Image from "next/image";
import { Open_Sans } from "next/font/google";
import DefaultImage from "@/utils/DefaultImage";

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
        <div className="w-[90%] lg:w-[50%] mx-auto pt-10 pb-10">
          {/* Conditional rendering for imageOne */}
          {blog?.data?.imageOne && (
            <div>
              <Image
                src={blog?.data?.imageOne}
                width={1280}
                height={720}
                alt="Image one"
                className="mx-auto mb-2 w-full  h-[200px] sm:h-[400px] xl:h-[600px] object-cover object-center rounded-lg"
              />
            </div>
          )}

          {/* Conditional rendering for title */}
          {blog?.data?.title && (
            <div>
              <h2 className="text-xl  md:text-2xl lg:text-3xl font-extrabold mb-2 lg:mb-10  text-center md:text-start">
                {blog?.data?.title}
              </h2>
            </div>
          )}

          <div className="relative">
            {/* Conditional rendering for imageTwo */}
            {blog?.data?.imageTwo && blog?.data?.imageTwo !== DefaultImage && (
              <div className="float-left mr-4 mb-2 hidden lg:block">
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
