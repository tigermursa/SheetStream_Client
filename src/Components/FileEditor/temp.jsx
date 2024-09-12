"use client";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic"; // dynamic for client-side only components
import { fetcher } from "@/lib/fetcher";
import "./FileEditor.css";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Quill styles
import { toast } from "react-toastify";
import Image from "next/image";

const FileEditor = ({ fileId }) => {
  useEffect(() => {
    // Import and configure Quill only after the component has mounted
    import("quill").then((Quill) => {
      const SizeStyle = Quill.default.import("attributors/style/size");
      SizeStyle.whitelist = ["8px", "12px", "16px", "24px", "32px", "40px"];
      Quill.default.register(SizeStyle, true);
    });
  }, []);
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/v1/files/single/${fileId}`,
    fetcher
  );

  const [editorContent, setEditorContent] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  useEffect(() => {
    if (data?.data) {
      setEditorContent(data?.data?.htmlContent || "");
      setImageOne(data?.data?.imageOne || "");
      setImageTwo(data?.data?.imageTwo || "");
      setTitle(data?.data?.title || "");
      setShortDescription(data?.data?.shortDescription || "");
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
            body: JSON.stringify({
              htmlContent: editorContent,
              imageOne,
              imageTwo,
              title,
              shortDescription,
            }),
          }
        );

        if (response.ok) {
          toast.success("Content updated successfully!");
          mutate(`http://localhost:5000/api/v1/files/single/${fileId}`);
        } else {
          console.error("Failed to update file:", await response.text());
          toast.error("Failed to update file:");
        }
      } catch (error) {
        console.error("Error updating content:", error);
        toast.error("Error updating content:", error);
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
          toast.success("File deleted successfully!");
          mutate(`http://localhost:5000/api/v1/files/single/${fileId}`);
          router.push("/edit");
        } else {
          console.error("Failed to delete file:", await response.text());
          toast.error("Failed to delete file:");
        }
      } catch (error) {
        console.error("Error deleting file:", error);
        toast.error("Error deleting file:", error);
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
        Error! Failed to load file 😢
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="p-8 rounded-lg shadow-lg w-full md:w-[60%] bg-white text-gray-700">
        <div>
          <h2 className="text-xl mb-4 font-semibold">Edit Content</h2>
          {/* Image One Input and Preview */}
          <label className="block mb-2 font-medium text-gray-700">
            Thumbnail image
          </label>
          {imageOne && (
            <div className="mb-4">
              <Image
                src={imageOne}
                alt="Image One"
                width={720}
                height={1080}
                className="max-w-[400px] max-h-[400px] object-contain rounded mb-2 mx-auto"
              />
            </div>
          )}
          <input
            type="text"
            placeholder="Enter Image One URL"
            value={imageOne}
            onChange={(e) => setImageOne(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md border-gray-300"
          />

          {/* Image Two Input and Preview */}
          <label className="block mb-2 font-medium text-gray-700">
            Image Two
          </label>
          {imageTwo && (
            <div className="mb-4">
              <Image
                src={imageTwo}
                alt="Image Two"
                width={720}
                height={1080}
                className="max-w-[400px] max-h-[400px] object-contain rounded mb-2 mx-auto"
              />
            </div>
          )}
          <input
            type="text"
            placeholder="Enter Image Two URL"
            value={imageTwo}
            onChange={(e) => setImageTwo(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md border-gray-300"
          />

          {/* Title Input */}
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md border-gray-300"
          />
          {/* ShortDescription Input */}
          <label className="block mb-2 font-medium text-gray-700">
            Short Description
          </label>
          <input
            type="text"
            placeholder="Enter short description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md border-gray-300"
          />

          {/* Text Editor */}
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
              className="mt-4 px-4 py-2 border border-red-600 text-red-600 hover:text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-500"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete File"}
            </button>
            <button
              className="mt-4 px-4 py-2 border border-green-600 text-green-600 hover:text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-500"
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
