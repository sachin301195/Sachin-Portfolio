# Frontend: Breast Cancer Classifier Demo

This directory contains the source code for the frontend application of the end-to-end Breast Cancer Classifier project. It is a modern, responsive web application built with Next.js and React, providing an interactive user interface for the machine learning model.

**Live Demo:** [https://breast-cancer-demo-frontend-120059375610.northamerica-northeast2.run.app/](https://breast-cancer-demo-frontend-120059375610.northamerica-northeast2.run.app/)

---

## Overview

The primary role of this application is to serve as the user-facing client for the ML model. It allows users to either upload their own histopathology image or select a pre-loaded sample. The application then sends the image to the backend API for classification and displays the prediction result in a clear and intuitive dashboard.

### Key Features & Technical Details

* **Framework**: Built with **Next.js 15** and **React 19** for a fast, server-rendered user experience.
* **Styling**: Styled with **Tailwind CSS** for a clean, responsive, and modern design that works on all devices.
* **API Communication**: To ensure secure and seamless communication with the backend, this application uses a **Next.js rewrite**. All API calls to `/api/predict` are proxied through the frontend's server to the backend Cloud Run service. This approach elegantly solves potential CORS and mixed-content issues.
* **Deployment**: The application is containerized using a multi-stage **Dockerfile** and automatically deployed to **Google Cloud Run** via a **GitHub Actions** CI/CD pipeline located in the parent repository's `.github/workflows` directory.

---

## Getting Started (Local Development)

To run this frontend application on your local machine, follow these steps:

1.  **Navigate to this directory**:
    ```bash
    cd breast-cancer-demo
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

4.  Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application running.

*Note: For the classification feature to work locally, the backend service must also be running and accessible.*