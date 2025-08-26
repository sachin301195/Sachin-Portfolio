import React from 'react';

export const ContextArea: React.FC = () => {
    const metrics = [
        { label: 'Accuracy', value: '96.5%' },
        { label: 'Precision', value: '97.1%' },
        { label: 'Recall', value: '95.8%' },
        { label: 'F1-Score', value: '96.4%' },
    ];

    return (
        <div className="tw-space-y-10">
            {/* --- The Process --- */}
            <div>
                <h2 className="tw-text-3xl tw-font-semibold tw-mb-4">What's Happening Under the Hood?</h2>
                <ol className="tw-relative tw-border-l tw-border-gray-300 dark:tw-border-gray-600 tw-space-y-8 tw-pl-6">
                    <li>
                        <div className="tw-absolute tw-w-3 tw-h-3 tw-bg-gray-400 tw-rounded-full tw-mt-1.5 tw--left-1.5"></div>
                        <h3 className="tw-text-xl tw-font-semibold">1. Image Preprocessing</h3>
                        <p className="tw-mt-1 tw-text-light-gray-text dark:tw-text-dark-gray-text">The input image is resized to match the model's expected input dimensions, normalized, and converted into a tensor format suitable for processing.</p>
                    </li>
                    <li>
                        <div className="tw-absolute tw-w-3 tw-h-3 tw-bg-gray-400 tw-rounded-full tw-mt-1.5 tw--left-1.5"></div>
                        <h3 className="tw-text-xl tw-font-semibold">2. Feature Extraction</h3>
                        <p className="tw-mt-1 tw-text-light-gray-text dark:tw-text-dark-gray-text">A fine-tuned ResNet18 Convolutional Neural Network (CNN) analyzes the image, identifying complex patterns, textures, and cellular structures indicative of tissue type.</p>
                    </li>
                    <li>
                        <div className="tw-absolute tw-w-3 tw-h-3 tw-bg-gray-400 tw-rounded-full tw-mt-1.5 tw--left-1.5"></div>
                        <h3 className="tw-text-xl tw-font-semibold">3. Classification</h3>
                        <p className="tw-mt-1 tw-text-light-gray-text dark:tw-text-dark-gray-text">The final layer of the network outputs a probability score for each class (Benign vs. Malignant), making the final prediction based on the highest score.</p>
                    </li>
                </ol>
            </div>

            {/* --- Model Performance --- */}
            <div>
                <h2 className="tw-text-3xl tw-font-semibold tw-mb-4">Model Performance</h2>
                <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
                    {metrics.map(metric => (
                        <div key={metric.label} className="tw-bg-light-card dark:tw-bg-dark-card tw-p-4 tw-rounded-lg tw-text-center tw-shadow-sm">
                            <p className="tw-text-2xl tw-font-bold">{metric.value}</p>
                            <p className="tw-text-sm tw-text-light-gray-text dark:tw-text-dark-gray-text">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Tech Stack --- */}
            <div>
                 <h2 className="tw-text-3xl tw-font-semibold tw-mb-4">Tech Stack & Links</h2>
                <div className="tw-flex tw-flex-wrap tw-gap-4 tw-items-center">
                    <span className="tw-bg-blue-100 tw-text-blue-800 tw-text-sm tw-font-medium tw-me-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-blue-900 dark:tw-text-blue-300">PyTorch</span>
                    <span className="tw-bg-gray-100 tw-text-gray-800 tw-text-sm tw-font-medium tw-me-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-gray-700 dark:tw-text-gray-300">FastAPI</span>
                    <span className="tw-bg-green-100 tw-text-green-800 tw-text-sm tw-font-medium tw-me-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-green-900 dark:tw-text-green-300">Docker</span>
                    <span className="tw-bg-yellow-100 tw-text-yellow-800 tw-text-sm tw-font-medium tw-me-2 tw-px-2.5 tw-py-0.5 tw-rounded dark:tw-bg-yellow-900 dark:tw-text-yellow-300">AWS ECS</span>
                    <a href="https://github.com/sachin301195/breast-cancer-detection-mlops" target="_blank" rel="noopener noreferrer" className="tw-text-accent hover:tw-underline">GitHub Repo</a>
                </div>
            </div>
            
            {/* --- Disclaimer --- */}
            <div className="tw-p-4 tw-bg-yellow-100 dark:tw-bg-yellow-900 tw-text-yellow-800 dark:tw-text-yellow-200 tw-rounded-lg">
                <p><strong>Disclaimer:</strong> This model is for demonstration purposes only and is not intended for clinical diagnosis. Always consult a qualified medical professional for health concerns.</p>
            </div>
        </div>
    );
};