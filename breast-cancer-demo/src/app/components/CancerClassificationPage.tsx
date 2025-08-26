"use client";

import React from 'react';
import { InteractiveWorkbench } from './InteractiveWorkbench';
import { ContextArea } from './ContextArea';

export const CancerClassificationPage: React.FC = () => {
  return (
    <div className="tw-min-h-screen tw-bg-light-background dark:tw-bg-dark-background tw-text-light-text dark:tw-text-dark-text tw-py-20 tw-px-4 sm:tw-px-6 lg:tw-px-8">
      <header className="tw-text-center tw-mb-16">
        <h1 className="tw-text-4xl lg:tw-text-6xl tw-font-semibold tw-uppercase">
          Breast Cancer Classification
        </h1>
        <p className="tw-mt-4 tw-text-lg tw-text-light-gray-text dark:tw-text-dark-gray-text tw-max-w-3xl tw-mx-auto">
          An interactive demonstration of a Convolutional Neural Network trained to classify histopathological images.
        </p>
      </header>

      <main className="tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12">
        <div className="tw-w-full">
          <InteractiveWorkbench />
        </div>
        <div className="tw-w-full">
          <ContextArea />
        </div>
      </main>
    </div>
  );
};