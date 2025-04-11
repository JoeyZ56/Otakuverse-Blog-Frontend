"use client";
import { useRef, useState } from "react";

const ImageUploader = ({ onFileSelect, label = "Upload Image" }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (file) {
      onFileSelect(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`border-2 ${
        dragging ? "border-yellow-400 bg-yellow-50" : "border-gray-300 bg-white"
      } border-dashed rounded-md p-4 text-center transition-all cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {previewUrl && (
        <div className="flex justify-center mb-4">
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            className="max-w-full rounded-md max-h-48"
          />
        </div>
      )}

      <p className="text-sm text-gray-600">
        {fileName || "Drag & Drop Image Here or Click to Upload"}
      </p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      <div className="inline-block px-4 py-2 mt-3 font-medium text-white transition bg-purple-600 rounded-md hover:bg-purple-700">
        {label}
      </div>
    </div>
  );
};

export default ImageUploader;
