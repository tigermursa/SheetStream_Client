"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill to disable SSR
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Quill styles
import "./FileEditor.css";

const DEFAULT_IMAGE_URL =
  "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Photo-Image-Icon-Graphics-10388619-1-1-580x386.jpg";

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

  // Form setup using React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoadingImageOne, setIsLoadingImageOne] = useState(false);
  const [isLoadingImageTwo, setIsLoadingImageTwo] = useState(false);
  const [imageOnePreview, setImageOnePreview] = useState(DEFAULT_IMAGE_URL);
  const [imageTwoPreview, setImageTwoPreview] = useState(DEFAULT_IMAGE_URL);
  const [isOnline, setIsOnline] = useState(false); // Default to false
  const [isToggling, setIsToggling] = useState(false); // For toggle loading state

  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/v1/files/single/${fileId}`,
    fetcher
  );

  useEffect(() => {
    if (data?.data) {
      setEditorContent(data?.data?.htmlContent || "");
      setValue("title", data?.data?.title || "");
      setValue("shortDescription", data?.data?.shortDescription || "");
      setImageOnePreview(data?.data?.imageOne || DEFAULT_IMAGE_URL);
      setImageTwoPreview(data?.data?.imageTwo || DEFAULT_IMAGE_URL);
      setIsOnline(data?.data?.isOnline);
    }
  }, [data, setValue]);

  const uploadToCloudinary = async (image, setImageUrl, setLoadingImage) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    );

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvwmhlyd6/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
    } finally {
      setLoadingImage(false);
    }
  };

  const onSubmit = async (formData) => {
    if (fileId) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/update/${fileId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              htmlContent: editorContent,
              imageOne: imageOnePreview,
              imageTwo: imageTwoPreview,
            }),
          }
        );

        if (response.ok) {
          toast.success("Content updated successfully!");
          mutate(`http://localhost:5000/api/v1/files/single/${fileId}`);
        } else {
          toast.error("Failed to update file");
        }
      } catch (error) {
        toast.error("Error updating content");
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
          toast.error("Failed to delete file");
        }
      } catch (error) {
        toast.error("Error deleting file");
      } finally {
        setDeleting(false);
      }
    }
  };

  // Function to toggle online status using SWR mutate
  const toggleIsOnline = async () => {
    setIsToggling(true); // Start loading state for toggle
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/files/toggle/isOnline/${fileId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOnline: !isOnline }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsOnline(result.isOnline); // Update state based on server response
        toast.success(`File is now ${result.isOnline ? "Online" : "Offline"}`);
      } else {
        toast.error("Failed to toggle status");
      }
    } catch (error) {
      toast.error("Error toggling online status");
    } finally {
      setIsToggling(false); // End loading state
      mutate(`http://localhost:5000/api/v1/files/single/${fileId}`); // Fetch latest data
    }
  };

  if (isLoading)
    return (
      <div className="text-gray-100 flex items-center justify-center text-lg text-center h-screen bg-gray-900 ">
        Loading file...
      </div>
    );
  if (error)
    return (
      <div className="text-gray-100 flex items-center justify-center text-lg text-center h-screen bg-gray-900 ">
        Error loading file...
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-gray-50 text-gray-900 rounded-lg shadow-lg w-[50%] mx-auto  mt-5 mb-5"
    >
      {/* Toggle button with loading spinner */}
      <label className="block mb-2 font-medium text-gray-900">
        {isOnline ? <p>Online</p> : <p>offline</p>}
      </label>
      <button
        type="button"
        onClick={toggleIsOnline}
        className={`relative inline-flex items-center h-6 rounded-full w-11  mb-10
    ${
      isOnline ? "bg-green-500" : "bg-gray-300"
    } transition-colors duration-200 ease-in-out`}
        disabled={isToggling}
      >
        {isToggling ? (
          <span className="spinner-border spinner-border-sm text-white text-center"></span>
        ) : (
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 
      ${isOnline ? "translate-x-6" : "translate-x-1"}`}
          />
        )}
      </button>
      {/* Image One Input */}
      <label className="block mb-2 font-medium text-gray-900">
        Thumbnail Image
      </label>
      <div className="mb-4">
        <Image
          src={imageOnePreview}
          alt="Image One Preview"
          width={400}
          height={400}
          className="max-w-[400px] max-h-[400px] object-contain rounded mx-auto"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          uploadToCloudinary(
            e.target.files[0],
            setImageOnePreview,
            setIsLoadingImageOne
          )
        }
        className="w-full p-2 mb-4 border rounded-md border-gray-300"
      />
      {isLoadingImageOne && <p>Uploading Image One...</p>}

      {/* Image Two Input */}
      <label className="block mb-2 font-medium text-gray-900">Image Two</label>
      <div className="mb-4">
        <Image
          src={imageTwoPreview}
          alt="Image Two Preview"
          width={400}
          height={400}
          className="max-w-[400px] max-h-[400px] object-contain rounded mx-auto"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          uploadToCloudinary(
            e.target.files[0],
            setImageTwoPreview,
            setIsLoadingImageTwo
          )
        }
        className="w-full p-2 mb-4 border rounded-md border-gray-300"
      />
      {isLoadingImageTwo && <p>Uploading Image Two...</p>}

      {/* Title Input */}
      <label className="block mb-2 font-medium text-gray-900">Title</label>
      <input
        {...register("title", { required: "Title is required" })}
        type="text"
        placeholder="Enter title"
        className="w-full p-2 mb-4 border rounded-md border-gray-300 text-gray-900"
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}

      {/* ShortDescription Input */}
      <label className="block mb-2 font-medium text-gray-900">
        Short Description
      </label>
      <input
        {...register("shortDescription", {
          required: "Short description is required",
        })}
        type="text"
        placeholder="Enter short description"
        className="w-full p-2 mb-4 border rounded-md border-gray-300 text-gray-900"
      />
      {errors.shortDescription && (
        <p className="text-red-600">{errors.shortDescription.message}</p>
      )}

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

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="mt-4 px-4 py-2 border border-red-600 text-red-600 hover:text-white font-semibold rounded-md hover:bg-red-600"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete File"}
        </button>
        <button
          type="submit"
          className="mt-4 px-4 py-2 border border-green-600 text-green-600 hover:text-white font-semibold rounded-md hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default FileEditor;
