"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const ShowFile = () => {
  const [files, setFiles] = useState([]);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/files/files"
        );
        const data = await response.json();
        if (response.ok) {
          setFiles(data.files); // Assuming `data.files` contains the list of files
        } else {
          console.error("Failed to fetch files:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleEdit = (fileId, content) => {
    setEditingFileId(fileId);
    setEditorContent(content);
  };

  const handleSave = async () => {
    if (editingFileId) {
      try {
        await fetch(
          `http://localhost:5000/api/v1/files/update/${editingFileId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ htmlContent: editorContent }),
          }
        );
        alert("Content updated successfully!");
        setEditingFileId(null);
        setEditorContent("");
        // Refresh the file list
        const response = await fetch(
          "http://localhost:5000/api/v1/files/files"
        );
        const data = await response.json();
        if (response.ok) {
          setFiles(data.files);
        } else {
          console.error("Failed to fetch files:", data.message);
        }
      } catch (error) {
        console.error("Error updating content:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg w-[80%] bg-white">
        <ul className="text-left">
          {files.map((file) => (
            <li key={file._id} className="mb-4 text-gray-900">
              <div className="mt-2">
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: file.htmlContent }}
                />
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEdit(file._id, file.htmlContent)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editingFileId && (
          <div className="mt-8">
            <h2 className="text-xl mb-4 font-semibold">Edit Content</h2>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              theme="snow"
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline"],
                  [{ color: [] }, { background: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "color",
                "background",
                "list",
                "bullet",
                "link",
                "image",
                "clean",
              ]}
              className="react-quill min-h-[300px] border border-gray-300 rounded"
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
            />
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowFile;
