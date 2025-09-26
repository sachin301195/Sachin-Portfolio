# Cloud & MLOps Engineering Portfolio

## Overview

Welcome! This repository hosts my comprehensive portfolio in Cloud, DevOps, and MLOps engineering. This collection of projects showcases my skills in **ML Engineering**, **MLOps**, **DevOps**, and **Cloud Engineering** through a professional portfolio website and live ML demos, all supported by automated CI/CD pipelines.

The goal of this portfolio is to demonstrate a fully functional, automated, and deployed system that reflects the end-to-end lifecycle of modern ML projects, targeting roles in ML engineering, DevOps, and cloud engineering.

**Live Portfolio:** [www.sachinpb.com](http://www.sachinpb.com)

---

## Key Projects

### 1. Interactive Portfolio Website (Live)

A static website built with HTML, CSS, JavaScript, and **Tailwind CSS**, featuring a responsive design with dark and light modes.
* **Hosting**: Deployed on **AWS S3** with **CloudFront** for low-latency global content delivery.
* **CI/CD**: A complete GitHub Actions workflow automates the deployment process. Any push to the `main` branch triggers a workflow that builds the site and syncs it to the S3 bucket, ensuring the portfolio is always up-to-date.

### 2. Computer Vision Demo: Breast Cancer Classifier (Live)

An end-to-end MLOps demonstration of a deep learning model for classifying breast cancer histopathology images.
* **Model**: A fine-tuned **ResNet50V2** model built with Keras/TensorFlow.
* **Backend**: A FastAPI server, containerized with Docker, serves the model as a REST API.
* **Frontend**: A Next.js application provides an interactive user interface for image uploads and classification.
* **Deployment**: Both frontend and backend are deployed as separate serverless applications on **Google Cloud Run**, showcasing a decoupled, microservices-based architecture.
* **Automation**: The entire deployment is automated with **GitHub Actions** to build and deploy Docker images to Google Artifact Registry and Cloud Run.

### 3. Movielytics: ETL Pipeline & Data Analytics

A comprehensive data engineering project to analyze movie trends and build a recommender system.
* **ETL Pipeline**: Developed a robust ETL pipeline using **Apache Airflow** to process and load data into a **PostgreSQL** database.
* **Analytics**: Performed in-depth analysis and created visualizations using **AWS QuickSight**.
* **Cloud Architecture**: Designed and implemented the entire data architecture on AWS.

### 4. Reinforcement Learning for Job Shop Scheduling

A research-focused project applying deep reinforcement learning to optimize complex scheduling problems in a simulated manufacturing environment.
* **Algorithm**: Implemented a Double Deep Q-Network (DDQN) using **PyTorch** and **OpenAI Gym**.
* **Simulation**: Modeled a flexible manufacturing system to test and validate the RL agent's performance against traditional scheduling heuristics.

*(Note: The code for Movielytics and the Reinforcement Learning project is available in their respective repositories, linked on the portfolio website.)*

---

## Tech Stack

* **Programming Languages**: Python, JavaScript, TypeScript, HTML/CSS
* **ML Frameworks**: Keras/TensorFlow, PyTorch, Scikit-learn
* **Frontend**: Next.js, React, Tailwind CSS
* **Backend API**: FastAPI
* **Cloud Platforms**: AWS (S3, CloudFront), Google Cloud (Cloud Run, Artifact Registry)
* **Data Engineering**: Apache Airflow, PostgreSQL, AWS QuickSight
* **CI/CD & DevOps**: GitHub Actions, Docker, Git

---

## Project Timeline & Status

* **Overall Timeline:** Approximately 8 weeks (August - September 2025)
* **Current Phase:** Completed

| Task                                          | Start Date         | End Date           | Status    |
| :-------------------------------------------- | :----------------- | :----------------- | :-------- |
| **Phase 1: Planning & Scoping** | August 4, 2025     | August 10, 2025    | Completed |
| **Phase 2: Development & Implementation** | August 11, 2025    | September 14, 2025 | Completed |
| **Phase 3: Testing & Deployment** | September 15, 2025 | September 21, 2025 | Completed |
| **Phase 4: Final Review & Documentation** | September 22, 2025 | September 28, 2025 | Completed |

---

## Cost Breakdown

-   **Website:** ~$5/month (S3 + CloudFront).
-   **Breast Cancer Demo:** ~$5-10/month (Cloud Run, Artifact Registry).
-   **Total Estimated Cost:** ~$10-15/month (Leveraging free tiers on AWS & GCP).

---

## Contact

* **GitHub:** [https://github.com/sachin301195](https://github.com/sachin301195)
* **LinkedIn:** [https://www.linkedin.com/in/sachin-bulchandani/](https://www.linkedin.com/in/sachin-bulchandani/)
* **E-mail:** sachinbulchandani1@gmail.com