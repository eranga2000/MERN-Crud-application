import React, { useState, useRef, useEffect } from "react";

const FilePicker = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    let newFiles = Array.from(selectedFiles);

    // Filter JPG/PNG
    newFiles = newFiles.filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    // Limit to max 3 files
    const availableSlots = 3 - files.length;
    newFiles = newFiles.slice(0, availableSlots);

    const fileObjects = newFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...fileObjects]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (files.length >= 3) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e) => {
    if (files.length >= 3) return;
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const removeFile = (index) => {
    const removedFile = files[index];
    URL.revokeObjectURL(removedFile.previewUrl); // Cleanup
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      // Cleanup all object URLs on unmount
      files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
  }, [files]);

  const canUploadMore = files.length < 3;

  return (
    <div className="w-full mx-auto mt-10 p-4 border border-gray-300 rounded-2xl shadow-xl">
      
      <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (optional)
          </label>
      
      {canUploadMore && (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-200 ${
            canUploadMore
              ? "border-blue-500 hover:bg-blue-50"
              : "border-gray-300 bg-gray-100 cursor-not-allowed"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <p className="text-gray-600">
            Drag & drop JPG or PNG files here, or{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              browse
            </span>
          </p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            ref={fileInputRef}
            onChange={handleBrowse}
            className="hidden"
            disabled={!canUploadMore}
          />
        </div>
      )}

      {/* Image Previews */}
      <div className="mt-4 flex flex-wrap gap-4">
        {files.map((item, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={item.previewUrl}
              alt={item.file.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
              {item.file.name}  </div>
            <button
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 text-white bg-red-500 hover:bg-red-600 rounded-bl px-2 py-1 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Limit Warning */}
      {files.length >= 3 && (
        <p className="mt-2 text-sm text-red-500 text-center">
          Maximum 3 image files (JPG/PNG) allowed.
        </p>
      )}
    </div>
  );
};

export default FilePicker;
