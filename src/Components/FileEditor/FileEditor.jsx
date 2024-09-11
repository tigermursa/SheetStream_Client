"use client";
import { useReducer } from "react";
import useSWR, { mutate } from "swr";
import ReactQuill, { Quill } from "react-quill"; // Make sure to import Quill here
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./quill-custom.css"; // Your custom CSS
import { fetcher } from "@/lib/fetcher";
import "./FileEditor.css";

// Extend Quill with custom sizes
const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = ["8px", "12px", "16px", "24px", "32px", "40px"];
Quill.register(SizeStyle, true);

// Define action types for better state management
const EDITOR_ACTIONS = {
  SET_EDITING_FILE_ID: "SET_EDITING_FILE_ID",
  SET_EDITOR_CONTENT: "SET_EDITOR_CONTENT",
  SET_LOADING: "SET_LOADING",
  RESET_EDITOR: "RESET_EDITOR",
};

const initialState = {
  editingFileId: null,
  editorContent: "",
  loading: false,
};

function editorReducer(state, action) {
  switch (action.type) {
    case EDITOR_ACTIONS.SET_EDITING_FILE_ID:
      return { ...state, editingFileId: action.payload };
    case EDITOR_ACTIONS.SET_EDITOR_CONTENT:
      return { ...state, editorContent: action.payload };
    case EDITOR_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case EDITOR_ACTIONS.RESET_EDITOR:
      return initialState;
    default:
      return state;
  }
}

const useFileData = (id) => {
  const { data, error, isLoading } = useSWR(
    id ? `http://localhost:5000/api/v1/files/single/${id}` : null,
    fetcher
  );

  return {
    file: data?.file,
    files: data?.files,
    isLoading,
    isError: error,
  };
};

const FileEditor = ({ params }) => {
  const id = params?.id;
  const { files, isLoading, isError } = useFileData(id);

  const [state, dispatch] = useReducer(editorReducer, initialState);

  const handleEdit = (fileId, content) => {
    dispatch({ type: EDITOR_ACTIONS.SET_EDITING_FILE_ID, payload: fileId });
    dispatch({ type: EDITOR_ACTIONS.SET_EDITOR_CONTENT, payload: content });
  };

  const handleSave = async () => {
    if (state.editingFileId) {
      dispatch({ type: EDITOR_ACTIONS.SET_LOADING, payload: true });

      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/files/update/${state.editingFileId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ htmlContent: state.editorContent }),
          }
        );

        if (response.ok) {
          alert("Content updated successfully!");
          dispatch({ type: EDITOR_ACTIONS.RESET_EDITOR });
          // Refresh the file list
          mutate("http://localhost:5000/api/v1/files/files");
        } else {
          const errorText = await response.text();
          alert(`Failed to update file: ${errorText}`);
        }
      } catch (error) {
        console.error("Error updating content:", error);
      } finally {
        dispatch({ type: EDITOR_ACTIONS.SET_LOADING, payload: false });
      }
    }
  };

  if (isLoading) return <div className="text-center">Loading files...</div>;
  if (isError) return <div className="text-center">Failed to load files</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="p-8 rounded-lg shadow-lg w-full md:w-[80%] bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Uploaded Files</h1>
        <ul className="text-left space-y-4">
          {files?.map((file) => (
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
        {state.editingFileId && (
          <div className="mt-8">
            <h2 className="text-xl mb-4 font-semibold">Edit Content</h2>
            <ReactQuill
              value={state.editorContent}
              onChange={(content) =>
                dispatch({
                  type: EDITOR_ACTIONS.SET_EDITOR_CONTENT,
                  payload: content,
                })
              }
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
                disabled={state.loading}
              >
                {state.loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileEditor;
