import FileEditor from "@/Components/FileEditor/FileEditor";

const EditorMainPage = ({ params }) => {
  const fileId = params?.id;
  return (
    <div>
      <FileEditor fileId={fileId} />
    </div>
  );
};

export default EditorMainPage;