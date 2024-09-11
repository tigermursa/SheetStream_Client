"use client";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic"; //  dynamic for client-side only components
import { fetcher } from "@/lib/fetcher";
import "./FileEditor.css";

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // t Quill styles

const FileEditor = ({ fileId }) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/v1/files/single/${fileId}`,
    fetcher
  );

  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (data?.data?.htmlContent) {
      setEditorContent(data?.data?.htmlContent);
    }
  }, [data]);

  const handleSave = async () => {
    if (fileId) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/update/${fileId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ htmlContent: editorContent }),
          }
        );

        if (response.ok) {
          alert("Content updated successfully!");
          mutate(`http://localhost:5000/api/v1/files/single/${fileId}`);
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

  const handleDelete = async () => {
    if (fileId) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this file?"
      );
      if (!confirmDelete) return;

      setDeleting(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/delete/${fileId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("File deleted successfully!");
          // You can redirect the user or trigger a re-render here
          mutate(`http://localhost:5000/api/v1/files/single/${fileId}`);
        } else {
          console.error("Failed to delete file:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting file:", error);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (isLoading)
    return (
      <div className="text-center h-screen text-white flex justify-center items-center font-semibold">
        Loading file. . . .
      </div> 
    );
  if (error)
    return (
      <div className="text-center h-screen text-red-600 flex justify-center items-center font-semibold">
        Error ! Failed to load file 😢
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 h-max">
      <div className="p-8 rounded-lg shadow-lg w-full md:w-[80%] bg-white text-gray-800">
        <div>
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
                    size: ["8px", "12px", "16px", "24px", "32px", "40px"], // Define sizes directly
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
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete File"}
            </button>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileEditor;
