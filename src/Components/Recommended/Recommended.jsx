import getAllBlogs from "@/lib/getAllBlogs";
import Image from "next/image";
import Link from "next/link";

const Recommended = async () => {
  const blogs = await getAllBlogs({
    cache: "no-store",
  });

  // Filter blogs to only include those that are online
  const onlineBlogs = blogs?.data?.filter((blog) => blog?.isOnline) || [];

  return (
    <div>
      {onlineBlogs.length > 0 ? (
        onlineBlogs.map((blog, index) => (
          <div key={index} className="">
            <Link href={`/blogs/${blog?._id}`}>
              <div className="mt-3 text-sm flex gap-3 items-center justify-center">
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
        <p>No online blogs available</p> // Optional message if no online blogs are available
      )}
    </div>
  );
};

export default Recommended;
