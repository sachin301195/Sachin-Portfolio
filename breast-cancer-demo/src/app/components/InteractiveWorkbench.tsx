"use client";

import React, { useState } from 'react';
import { ResultsDisplay } from './ResultsDisplay';

// --- MOCKED API RESPONSE TYPES ---
interface PredictionResponse {
  success: true;
  prediction_label: 'Malignant' | 'Benign';
  confidence_scores: {
    Benign: number;
    Malignant: number;
  };
  heatmap_base64: string;
}

interface ErrorResponse {
  success: false;
  error_message: string;
}

type ApiResponse = PredictionResponse | ErrorResponse;

export const InteractiveWorkbench: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'sample' | 'upload'>('sample');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    // --- MOCK API CALL FUNCTION ---
    // const runClassification = async () => {
    //     if (!selectedImage) return;

    //     setIsLoading(true);
    //     setApiResponse(null);

    //     // Simulate a 1.5-second API call
    //     await new Promise(resolve => setTimeout(resolve, 1500));

    //     // Mock logic: randomly return success or error
    //     if (Math.random() > 0.1) { // 90% chance of success
    //         const isMalignant = selectedImage.includes('malignant');
    //         setApiResponse({
    //             success: true,
    //             prediction_label: isMalignant ? 'Malignant' : 'Benign',
    //             confidence_scores: {
    //                 Benign: isMalignant ? 0.12 : 0.88,
    //                 Malignant: isMalignant ? 0.88 : 0.12,
    //             },
    //             heatmap_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', // Mocked 1x1 red pixel
    //         });
    //     } else {
    //         setApiResponse({
    //             success: false,
    //             error_message: 'Invalid file format or server error.',
    //         });
    //     }

    //     setIsLoading(false);
    // };

    const runClassification = async () => {
        if (!selectedImage) return;
    
        setIsLoading(true);
        setApiResponse(null);
    
        try {
            // Convert base64 string to Blob for sending
            const fetchRes = await fetch(selectedImage);
            const blob = await fetchRes.blob();
    
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');
    
            const response = await fetch('https://breast-cancer-classifier-nb6n4hmlkq-pd.a.run.app/predict', { 
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data: ApiResponse = await response.json();
            
            setApiResponse(data);
    
        } catch (error) {
            setApiResponse({
                success: false,
                error_message: 'Failed to connect to the classification service.',
            });
            console.error("API call failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const sampleImages = [
        { id: 1, type: 'benign', src: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Benign+1' },
        { id: 2, type: 'malignant', src: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Malignant+1' },
        { id: 3, type: 'benign', src: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Benign+2' },
        { id: 4, type: 'malignant', src: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Malignant+2' },
        { id: 5, type: 'benign', src: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Benign+3' },
        { id: 6, type: 'malignant', src: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Malignant+3' },
    ];


  return (
        <div className="tw-bg-light-card dark:tw-bg-dark-card tw-p-6 lg:tw-p-8 tw-rounded-3xl tw-shadow-md">
            {/* --- TABS --- */}
            <div className="tw-flex tw-border-b tw-border-gray-300 dark:tw-border-gray-600">
                <button
                    onClick={() => setActiveTab('sample')}
                    className={`tw-px-4 tw-py-2 tw-font-medium ${activeTab === 'sample' ? 'tw-border-b-2 tw-border-accent tw-text-accent' : 'tw-text-light-gray-text dark:tw-text-dark-gray-text'}`}
                >
                    Try a Sample
                </button>
                <button
                    onClick={() => setActiveTab('upload')}
                    className={`tw-px-4 tw-py-2 tw-font-medium ${activeTab === 'upload' ? 'tw-border-b-2 tw-border-accent tw-text-accent' : 'tw-text-light-gray-text dark:tw-text-dark-gray-text'}`}
                >
                    Upload Image
                </button>
            </div>

            {/* --- TAB CONTENT --- */}
            <div className="tw-mt-6">
                {activeTab === 'sample' && (
                    <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                        {sampleImages.map(img => (
                            <img
                                key={img.id}
                                src={img.src}
                                alt={`${img.type} sample`}
                                className={`tw-cursor-pointer tw-rounded-lg tw-border-4 ${selectedImage === img.src ? 'tw-border-accent' : 'tw-border-transparent'} hover:tw-opacity-80 tw-transition-opacity`}
                                onClick={() => setSelectedImage(img.src)}
                            />
                        ))}
                    </div>
                )}
                {activeTab === 'upload' && (
                    <div className="tw-border-2 tw-border-dashed tw-border-gray-400 dark:tw-border-gray-500 tw-rounded-lg tw-p-8 tw-text-center">
                        <input
                            type="file"
                            className="tw-hidden"
                            id="file-upload"
                            accept="image/png, image/jpeg"
                            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                        />
                        <label htmlFor="file-upload" className="tw-cursor-pointer tw-text-light-gray-text dark:tw-text-dark-gray-text">
                            Drag & drop your image here, or <span className="tw-text-accent tw-font-semibold">browse</span>
                        </label>
                        <p className="tw-text-xs tw-mt-2">Supports JPG, PNG. Max 5MB.</p>
                    </div>
                )}
            </div>

            {/* --- ACTIVE IMAGE PREVIEW --- */}
            <div className="tw-mt-8 tw-flex tw-justify-center tw-items-center tw-h-[350px] tw-w-full tw-bg-gray-200 dark:tw-bg-gray-800 tw-rounded-lg">
                {selectedImage ? (
                    <img src={selectedImage} alt="Selected preview" className="tw-max-h-full tw-max-w-full tw-object-contain" />
                ) : (
                    <p className="tw-text-light-gray-text dark:tw-text-dark-gray-text">Image preview will appear here</p>
                )}
            </div>

            {/* --- ACTION BUTTON --- */}
            <div className="tw-mt-8">
                 <button
                    onClick={runClassification}
                    disabled={!selectedImage || isLoading}
                    className="btn tw-w-full !tw-rounded-xl !tw-py-3 tw-flex tw-justify-center tw-items-center tw-gap-2 tw-transition-all tw-duration-300 tw-text-white !tw-bg-accent hover:!tw-bg-accent-hover disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <svg className="tw-animate-spin tw-h-5 tw-w-5 tw-mr-3" viewBox="0 0 24 24">
                              <circle className="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        'Run Classification'
                    )}
                </button>
            </div>

            {/* --- RESULTS AREA --- */}
            <div className="tw-mt-8">
                <ResultsDisplay response={apiResponse} />
            </div>
        </div>
    );
};