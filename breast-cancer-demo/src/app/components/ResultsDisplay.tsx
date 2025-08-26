"use client";

import React, { useState } from 'react';

// --- TYPE DEFINITIONS ---
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

type ApiResponse = PredictionResponse | ErrorResponse | null;

interface ResultsDisplayProps {
  response: ApiResponse;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ response }) => {
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  if (!response) {
    return (
      <div className="tw-text-center tw-p-4 tw-bg-gray-100 dark:tw-bg-gray-800 tw-rounded-lg">
        <p className="tw-text-light-gray-text dark:tw-text-dark-gray-text">Select or upload an image to begin analysis.</p>
      </div>
    );
  }

  if (!response.success) {
    return (
      <div className="tw-text-center tw-p-4 tw-bg-red-100 dark:tw-bg-red-900 tw-text-red-700 dark:tw-text-red-200 tw-rounded-lg">
        <p><strong>Error:</strong> {response.error_message}</p>
      </div>
    );
  }

  const { prediction_label, confidence_scores } = response;
  const isMalignant = prediction_label === 'Malignant';

  return (
    <div className="tw-space-y-6">
      <div>
        <h3 className="tw-text-lg tw-font-semibold tw-text-light-gray-text dark:tw-text-dark-gray-text">Prediction Result</h3>
        <p className={`tw-text-3xl tw-font-bold ${isMalignant ? 'tw-text-red-500' : 'tw-text-green-500'}`}>
          {prediction_label.toUpperCase()}
        </p>
      </div>

      <div>
        <h3 className="tw-text-lg tw-font-semibold tw-text-light-gray-text dark:tw-text-dark-gray-text">Confidence Scores</h3>
        <div className="tw-space-y-2 tw-mt-2">
          {/* Malignant Score */}
          <div className="tw-w-full">
            <div className="tw-flex tw-justify-between tw-mb-1">
              <span className="tw-text-base tw-font-medium">Malignant</span>
              <span className="tw-text-sm tw-font-medium">{Math.round(confidence_scores.Malignant * 100)}%</span>
            </div>
            <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2.5 dark:tw-bg-gray-700">
              <div className="tw-bg-red-500 tw-h-2.5 tw-rounded-full" style={{ width: `${confidence_scores.Malignant * 100}%` }}></div>
            </div>
          </div>
          {/* Benign Score */}
          <div className="tw-w-full">
            <div className="tw-flex tw-justify-between tw-mb-1">
              <span className="tw-text-base tw-font-medium">Benign</span>
              <span className="tw-text-sm tw-font-medium">{Math.round(confidence_scores.Benign * 100)}%</span>
            </div>
            <div className="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2.5 dark:tw-bg-gray-700">
              <div className="tw-bg-green-500 tw-h-2.5 tw-rounded-full" style={{ width: `${confidence_scores.Benign * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
       {/* --- HEATMAP TOGGLE --- */}
      <div className="tw-flex tw-items-center tw-justify-between tw-mt-4">
        <span className="tw-font-semibold">Show Heatmap (Grad-CAM)</span>
        <label className="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer">
          <input type="checkbox" checked={showHeatmap} onChange={() => setShowHeatmap(!showHeatmap)} className="tw-sr-only tw-peer" />
          <div className="tw-w-11 tw-h-6 tw-bg-gray-200 tw-rounded-full peer dark:tw-bg-gray-700 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-0.5 after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600 peer-checked:tw-bg-accent"></div>
        </label>
      </div>

    </div>
  );
};