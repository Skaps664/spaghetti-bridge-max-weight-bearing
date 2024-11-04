"use client";
import React, { useState } from "react";
import { Loader2, Info, RefreshCw } from "lucide-react";
import Image from "next/image";

interface OptionalParams {
  param1: string;
  param2: string;
  param3: string;
  param4: string;
}

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOptParams, setShowOptParams] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [maxWeight, setMaxWeight] = useState<number>(0);
  const [optionalParams, setOptionalParams] = useState<OptionalParams>({
    param1: "",
    param2: "",
    param3: "",
    param4: "",
  });

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
    setShowOptParams(false);
    setOptionalParams({
      param1: "",
      param2: "",
      param3: "",
      param4: "",
    });
    setShowDrawer(false);
    setMaxWeight(0);
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleParamChange = (param: keyof OptionalParams, value: string) => {
    setOptionalParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const handleToggle = () => {
    setShowOptParams((prev) => !prev);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Generate random weight between 1 and 40
    const randomWeight = Math.floor(Math.random() * 40) + 1;
    setMaxWeight(randomWeight);
    setIsLoading(false);
    setShowDrawer(true);
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      {/* Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 w-full bg-white shadow-lg transform transition-transform duration-300 rounded-t-xl ${
          showDrawer ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-4xl mx-auto p-4 relative">
          {/* Drawer Handle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full mb-4" />

          <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500">
            <Info className="w-4 h-4 mr-2.5" />
            Load Capacity Result
          </h5>
          <button
            onClick={resetComponent}
            className="absolute top-4 right-4 flex items-center gap-2 text-sky-400 hover:text-sky-600 rounded-lg px-3 py-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try New</span>
          </button>
          <div className="text-xl font-medium">
            MAX LOAD OF {maxWeight}KG
            {showOptParams && (
              <div className="text-sm mt-2">
                <div>Parameter 1: {optionalParams.param1}</div>
                <div>Parameter 2: {optionalParams.param2}</div>
                <div>Parameter 3: {optionalParams.param3}</div>
                <div>Parameter 4: {optionalParams.param4}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-700">
        <div className="relative w-full max-w-xl flex items-center gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 flex-1">
            <p className="text-sky-400 text-xl mb-8 text-center">
              Click on the card
            </p>

            <div
              className="border-2 border-dashed border-sky-400 rounded-lg p-16 mb-8 cursor-pointer relative"
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

            <div className="flex flex-row bg-slate-50 p-4 rounded-lg justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-sky-400 mr-2">File</span>
                <span className="text-gray-700">
                  {selectedFile ? "Uploaded" : "No selected File"}
                </span>
              </div>
              {selectedFile && (
                <div className="flex items-center ml-4">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showOptParams}
                    onClick={handleToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                      showOptParams ? "bg-sky-400" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`${
                        showOptParams ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                  <span className="ml-2 text-gray-700">Opt params</span>
                </div>
              )}
            </div>

            {showOptParams && (
              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Parameter 1</label>
                    <input
                      type="text"
                      value={optionalParams.param1}
                      onChange={(e) =>
                        handleParamChange("param1", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter param 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Parameter 2</label>
                    <input
                      type="text"
                      value={optionalParams.param2}
                      onChange={(e) =>
                        handleParamChange("param2", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter param 2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Parameter 3</label>
                    <input
                      type="text"
                      value={optionalParams.param3}
                      onChange={(e) =>
                        handleParamChange("param3", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter param 3"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Parameter 4</label>
                    <input
                      type="text"
                      value={optionalParams.param4}
                      onChange={(e) =>
                        handleParamChange("param4", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter param 4"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Weight Progress Bar */}
          <div className="h-96 w-3 bg-gray-200 rounded-full relative">
            <div
              className="absolute bottom-0 left-0 right-0 bg-sky-400 rounded-full transition-all duration-500 ease-out"
              style={{
                height: `${(maxWeight / 40) * 100}%`,
                backgroundColor: maxWeight > 30 ? "#ef4444" : "#38bdf8",
              }}
            />
            <div
              className="absolute -right-7 text-white text-sm font-medium transition-all duration-500"
              style={{
                bottom: `${(maxWeight / 40) * 100}%`,
                transform: "translateY(50%)",
              }}
            >
              {maxWeight}kg
            </div>
          </div>

          {selectedFile && (
            <div className="mt-6 flex justify-center absolute -bottom-20 left-1/2 -translate-x-1/2">
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="bg-sky-400 text-white px-8 py-3 rounded-lg font-medium hover:bg-sky-800 transition-colors disabled:bg-blue-400 flex items-center space-x-2"
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
    </>
  );
};

export default FileUpload;
