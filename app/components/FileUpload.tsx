"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const resetComponent = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    // Create preview URL for the image
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    // Simulating upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    toast.custom(
      () => (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center py-6 px-8">
            <span className="text-xl font-medium">MAX LOAD OF 35KG</span>
          </div>
        </div>
      ),
      {
        duration: 4000,
        className: "my-custom-toast",
        style: {
          minWidth: "400px",
        },
        onDismiss: () => {
          resetComponent();
        },
      }
    );
  };

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="relative w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Title */}
          <p className="text-blue-500 text-xl mb-8 text-center">
            Click on the card
          </p>
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-blue-400 rounded-lg p-16 mb-8 cursor-pointer relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {previewUrl ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <p className="text-2xl text-center text-gray-800">
                Browse Files to upload
              </p>
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* File Info */}
          <div className="flex flex-row bg-slate-50 p-4 rounded-lg justify-between">
            <span className="text-blue-500 mr-2">File</span>
            <span className="text-gray-700">
              {selectedFile ? selectedFile.name : "No selected File"}
            </span>
          </div>
        </div>

        {/* Upload Button */}
        {selectedFile && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-blue-400 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Uploading...</span>
                </>
              ) : (
                <span>CHECK LOAD CAPACITY</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
