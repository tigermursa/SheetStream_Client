"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import ReactQuill, { Quill } from "react-quill"; // Make sure to import Quill here
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./quill-custom.css"; // Your custom CSS
import { fetcher } from "@/lib/fetcher";

// Extend Quill with custom sizes
const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = ["8px", "12px", "16px", "24px", "32px", "40px"];
Quill.register(SizeStyle, true);

const ShowFile = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/v1/files/files",
    fetcher
  );
  const [editingFileId, setEditingFileId] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = (fileId, content) => {
    setEditingFileId(fileId);
    setEditorContent(content);
  };

  const handleSave = async () => {
    if (editingFileId) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/update/${editingFileId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ htmlContent: editorContent }),
          }
        );

        if (response.ok) {
          alert("Content updated successfully!");
          setEditingFileId(null);
          setEditorContent("");
          // Refresh the file list
          mutate("http://localhost:5000/api/v1/files/files");
        } else {
          console.error("Failed to update file:", await response.text());
        }
      } catch (error) {
        console.error("Error updating content:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) return <div className="text-center">Loading files...</div>;
  if (error) return <div className="text-center">Failed to load files</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="p-8 rounded-lg shadow-lg w-full md:w-[80%] bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Uploaded Files</h1>
        <ul className="text-left space-y-4">
          {data?.files?.map((file) => (
            <li key={file._id} className="mb-4 text-gray-900">
              <h2 className="text-xl font-semibold mb-2">{file.fileName}</h2>
              <div className="mb-4">
                <div
                  className="p-4 border border-gray-300 rounded bg-gray-50 mb-4"
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
                  [
                    {
                      size: [
                        "8px",
                        "12px",
                        "16px",
                        "24px",
                        "32px",
                        "40px", // Define sizes directly
                      ],
                    },
                  ],
                  ["bold", "italic", "underline", "strike"],
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
                "strike",
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
            <div className="flex justify-end mt-4">
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowFile;
