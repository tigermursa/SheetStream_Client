import FileEditor from "@/Components/FileEditor/FileEditor";
import getSingleBlogs from "@/lib/getSingleBlog";

const EditorMainPage = async ({ params }) => {
  const fileId = params?.id;

  const blog = await getSingleBlogs(fileId);

  return (
    <div>
      <FileEditor fileId={fileId} fileData={blog} />
    </div>
  );
};

export default EditorMainPage;
