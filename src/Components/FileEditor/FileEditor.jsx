"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic";
import { fetcher } from "@/lib/fetcher";
import { toast } from "react-toastify";
import Image from "next/image";
import "./FileEditor.css";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Quill styles

const DEFAULT_IMAGE_URL =
  "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Photo-Image-Icon-Graphics-10388619-1-1-580x386.jpg";

const FileEditor = ({ fileId }) => {
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

  // Fetch the current online status using SWR
  const { data: onlineData, mutate: mutateIsOnline } = useSWR(
    `http://localhost:5000/api/v1/files/toggle/isOnline/${fileId}`,
    fetcher
  );

  // Set the initial online state from SWR data (default to false if not fetched yet)
  const isOnline = onlineData?.isOnline || false;

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
    try {
      // Optimistically update the UI before the API call
      mutateIsOnline({ isOnline: !isOnline }, false);

      const response = await fetch(
        `http://localhost:5000/api/v1/files/toggle/isOnline/${fileId}`,
        {
          method: "PATCH",
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Update SWR cache with the actual result
        mutateIsOnline(result);
        toast.success(`File is now ${result.isOnline ? "Online" : "Offline"}`);
      } else {
        toast.error("Failed to toggle status");
      }
    } catch (error) {
      toast.error("Error toggling online status");
      // Rollback optimistic update in case of error
      mutateIsOnline({ isOnline: isOnline }, false);
    }
  };

  if (isLoading) return <div>Loading file...</div>;
  if (error) return <div>Error loading file...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-gray-50 text-gray-900 rounded-lg shadow-lg w-[50%] mx-auto  mt-5 mb-5"
    >
      <button
        type="button"
        onClick={toggleIsOnline}
        className={`mt-4 px-4 py-2 border ${
          isOnline
            ? "border-green-600 text-green-600"
            : "border-red-600 text-red-600"
        } font-semibold rounded-md hover:bg-gray-200`}
      >
        {isOnline ? "Online" : "Offline"}
      </button>
      {/* Image One Input */}
      <label className="block mb-2 font-medium text-gray-100">
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
      <label className="block mb-2 font-medium text-gray-100">Image Two</label>
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
      <label className="block mb-2 font-medium text-gray-100">Title</label>
      <input
        {...register("title", { required: "Title is required" })}
        type="text"
        placeholder="Enter title"
        className="w-full p-2 mb-4 border rounded-md border-gray-300 text-gray-900"
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}

      {/* ShortDescription Input */}
      <label className="block mb-2 font-medium text-gray-100">
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
        className="react-quill min-h-[300px] border border-gray-300 rounded mb-4"
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
