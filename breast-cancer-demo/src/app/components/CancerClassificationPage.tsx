"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

// UPDATED: Expanded sample images array for all 8 images
const sampleImages = [
  { name: "Select a sample...", path: "" },
  { name: "Benign Sample 1", path: "/samples/benign_1.png" },
  { name: "Benign Sample 2", path: "/samples/benign_2.png" },
  { name: "Benign Sample 3", path: "/samples/benign_3.png" },
  { name: "Benign Sample 4", path: "/samples/benign_4.png" },
  { name: "Malignant Sample 1", path: "/samples/malignant_1.png" },
  { name: "Malignant Sample 2", path: "/samples/malignant_2.png" },
  { name: "Malignant Sample 3", path: "/samples/malignant_3.png" },
  { name: "Malignant Sample 4", path: "/samples/malignant_4.png" },
];

export function CancerClassificationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionTime, setPredictionTime] = useState<number | null>(null);

  const resetState = () => {
    setResult(null);
    setError(null);
    setPredictionTime(null);
  };

  const processFile = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    resetState();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true, 
  });

  const handleSampleImageSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const imagePath = event.target.value;
    if (!imagePath) {
      setFile(null);
      setPreview(null);
      resetState();
      return;
    }
    
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const fileName = imagePath.split("/").pop() || "sample.png";
      const file = new File([blob], fileName, { type: blob.type });
      processFile(file);
    } catch (err) {
      setError("Failed to load sample image.");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image file first.");
      return;
    }

    setIsLoading(true);
    resetState();
    const startTime = performance.now();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://breast-cancer-classifier-120059375610.northamerica-northeast2.run.app/predict", {
        method: "POST",
        body: formData,
      });

      const endTime = performance.now();
      setPredictionTime(endTime - startTime);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Prediction failed. Please try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Breast Cancer Classifier
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            An interactive demo of a deep learning model deployed on Google Cloud as a serverless API.
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Left Column: Interactive Area */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Classifier Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Upload */}
                    <div {...getRootProps()} className="p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-black/20 transition-colors border-gray-300 dark:border-gray-600">
                      <input {...getInputProps()} />
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <label htmlFor="file-upload" className="w-full bg-white dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                          Upload an Image
                      </label>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">or drag and drop here</p>
                    </div>

                    {/* Sample Selector */}
                    <div className="p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-black/20 border-gray-300 dark:border-gray-600">
                        <select onChange={handleSampleImageSelect} className="w-full bg-white dark:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg shadow-sm cursor-pointer">
                        {sampleImages.map((image) => (
                            <option key={image.name} value={image.path}>{image.name}</option>
                        ))}
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">or select a pre-loaded sample</p>
                    </div>
                </div>
              </div>
              
              <div className="w-full max-w-md mx-auto aspect-video bg-gray-100 dark:bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Selected image" className="w-full h-full object-contain rounded-md"/>
                ) : (
                  <p className="text-gray-500">Image preview will appear here</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !file}
                className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Classifying..." : "Classify Image"}
              </button>

              {/* Results Dashboard - Appears Below */}
              {(result || isLoading || error) && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Classification Dashboard</h2>
                    <div className="flex flex-col space-y-4 bg-gray-100 dark:bg-black/50 rounded-lg p-6">
                        {isLoading && <div className="text-center text-gray-500 dark:text-gray-400 py-12">Processing...</div>}
                        {error && <p className="text-red-500 text-center py-12">{error}</p>}
                        {result && (
                            <>
                                <div className={`text-center p-6 rounded-lg transition-all duration-300 ${result.prediction === "Malignant" ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"}`}>
                                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Prediction</p>
                                    <p className={`text-5xl font-bold ${result.prediction === "Malignant" ? "text-red-600" : "text-green-500"}`}>{result.prediction}</p>
                                </div>
                                <div className="text-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
                                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">Confidence Score</p>
                                    <div className="relative w-32 h-32 mx-auto">
                                        <svg className="w-full h-full" viewBox="0 0 36 36"><path className="text-gray-300 dark:text-gray-700" strokeWidth="3" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className={`${result.prediction === "Malignant" ? "text-red-500" : "text-green-500"}`} strokeWidth="3" fill="none" stroke="currentColor" strokeDasharray={`${(result.confidence * 100)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">{`${(result.confidence * 100).toFixed(1)}%`}</div>
                                    </div>
                                </div>
                                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-sm">
                                    <h3 className="font-semibold mb-2 text-center">Technical Details</h3>
                                    <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Model:</span><span className="font-mono">ResNet50V2</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Prediction Time:</span><span className="font-mono">{predictionTime ? `${(predictionTime / 1000).toFixed(2)}s` : "-"}</span></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
              )}
            </div>

            {/* Right Column: Information Panel */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Model Information</h2>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-200">How to Get Accurate Results</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        This classifier was trained on the <a href="https://www.kaggle.com/datasets/paultimothymooney/breakhis" target="_blank" rel="noopener noreferrer" className="underline font-semibold">BreaKHis dataset</a> and performs best under specific conditions. For an accurate prediction, please use images that are:
                    </p>
                    <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-2">
                        <li><strong>High Resolution:</strong> Clear, uncompressed histopathology slides.</li>
                        <li><strong>400x Magnification:</strong> The model is specifically optimized for images captured at this magnification factor.</li>
                        <li><strong>Standard Staining:</strong> Images should use standard Hematoxylin and Eosin (H&E) staining.</li>
                    </ul>
                    <p className="text-xs text-blue-600 dark:text-blue-400 pt-2">
                        Results for images with different parameters (e.g., 100x magnification, different stains) may be unreliable.
                    </p>
                </div>

                 <div className="p-6 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                    <h3 className="font-semibold text-lg">About This Demo</h3>
                    <p className="text-sm">This application is a practical demonstration of a full MLOps pipeline. The trained Keras/TensorFlow model is served via a FastAPI backend, containerized with Docker, and deployed on Google Cloud Run, allowing for a scalable, serverless inference API.</p>
                </div>

                 <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                     <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-200">Disclaimer</h3>
                     <p className="text-sm text-yellow-700 dark:text-yellow-300">This tool is for educational and technical demonstration purposes only. It is not a medical device and should not be used for actual medical diagnosis.</p>
                 </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Copyright © 2025 Sachin Bulchandani. All rights reserved.</p>
      </footer>
    </div>
  );
}