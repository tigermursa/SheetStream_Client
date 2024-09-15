"use client";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Use SWR to fetch the list of files
  const { mutate } = useSWR(
    "http://localhost:5000/api/v1/files/files",
    fetcher
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setSelectedFile(file);
      setUploadStatus(""); // Clear any previous status
    } else {
      setSelectedFile(null);
      setUploadStatus("Please upload a DOCX file.");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a DOCX file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Got your DOCX file!");
        mutate(); // Refetch the file list after successful upload
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed. Please try again.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setSelectedFile(file);
      setUploadStatus(""); // Clear any previous status
    } else {
      setSelectedFile(null);
      setUploadStatus("Please upload a DOCX file.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className={`bg-gray-800 p-14 border border-separate rounded-xl shadow-lg w-full max-w-md text-center relative transition-all ${
          dragActive ? "border-2 border-indigo-500 bg-gray-700" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-white mb-4">
          <div className="text-2xl font-semibold mb-6">
            Drag & Drop. It&apos;s Online.
          </div>
          <p>Drop your DOCX file here or click to upload</p>
        </div>

        <input
          type="file"
          accept=".docx"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex justify-center items-center border-4 border-dashed border-indigo-600 p-6 rounded-lg hover:bg-indigo-500 transition-all">
            <div className="text-indigo-400 text-lg">
              {selectedFile ? selectedFile.name : "Browse your DOCX file"}
            </div>
          </div>
        </label>

        <button
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
          onClick={handleFileUpload}
        >
          Upload
        </button>

        {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default UploadFile;
