import getAllBlogs from "@/lib/getAllBlogs";
import Image from "next/image";
import Link from "next/link";

const Recommended = async () => {
  const blogs = await getAllBlogs({
    cache: "no-store",
  });

  // Filter, sort, and limit blogs
  const onlineBlogs = (blogs?.data || [])
    .filter((blog) => blog?.isOnline)
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)) // Sort by uploadDate
    .slice(0, 7); // Get top 7 blogs

  return (
    <div>
      {onlineBlogs.length > 0 ? (
        onlineBlogs.map((blog, index) => (
          <div key={index} className="">
            <Link href={`/blogs/${blog?._id}`}>
              <div className="mt-5 text-sm flex gap-3 items-center justify-center">
                <Image
                  src={blog?.imageOne}
                  alt={blog?.title}
                  width={40}
                  height={40}
                  className="rounded-sm"
                />
                <p className="truncate hover:text-primaryLight cursor-pointer">
                  {blog.title}
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No online blogs available</p>
      )}
    </div>
  );
};

export default Recommended;
