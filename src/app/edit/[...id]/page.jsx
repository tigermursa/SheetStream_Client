"use client";
import FileEditor from "@/Components/FileEditor/FileEditor";

const EditorMainPage = ({ params }) => {
  console.log(params)
  const fileId = params?.id;
  return (
    <div>
      <FileEditor fileId={fileId} />
    </div>
  );
};

export default EditorMainPage;
