import BlogDetails from "@/Components/BlogDetails/BlogDetails";

const BlogDetailsPage = ({ params }) => {
  const blogId = params?.id;
  return (
    <div>
      <BlogDetails blogId={blogId} />
    </div>
  );
};

export default BlogDetailsPage;
