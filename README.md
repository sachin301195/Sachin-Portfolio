# Advanced ML Portfolio & MLOps Demonstration Project

## Overview

Welcome! This repository hosts my comprehensive machine learning portfolio, developed over an 8-12 weeks intensive period with 15-20 hours per week. This project showcases my skills in **ML Engineering**, **MLOps**, **DevOps**, and **Cloud Engineering** through a professional portfolio website, live ML demos, and automated pipelines, all hosted cost-effectively on AWS for under $20/month. It serves as both a demonstration of my capabilities for potential employers and a practical learning ground for applying industry-standard practices.

The goal is to build a fully functional, automated, and deployed system reflecting end-to-end ML project lifecycles, targeting roles in ML engineering, DevOps, and cloud engineering.

## Project Objectives

- Develop a dynamic portfolio website hosted on **AWS S3/CloudFront** to showcase projects and skills.
- Create an interactive platform for presenting technical achievements to recruiters and collaborators.
- Demonstrate proficiency in modern ML tools (PyTorch, XGBoost), cloud technologies (AWS), CI/CD automation (GitHub Actions), and MLOps principles (DVC, MLflow).
- Provide a clear, recruiter-friendly overview of my capabilities.
- Deepen practical skills in end-to-end ML pipelines, DevOps automation, and cloud optimization.

## Key Features & Deliverables

- **Interactive Portfolio Website**:
  - Static website built with HTML, CSS, JavaScript, and **Tailwind CSS** (responsive, dark/light mode).
  - Hosted on **AWS S3** with **CloudFront** for global delivery.
  - Showcases resume, projects, and embedded ML demos.
- **RAG-Based Chatbot**:
  - Built with **LangChain**, **FastAPI**, and **FAISS** (vector store) using **Sentence Transformers** (`all-MiniLM-L6-v2`) for embeddings and Hugging Face’s `distilbert-base-uncased` for generation.
  - Deployed on **AWS Lambda** for cost efficiency.
  - Guides users through portfolio content via a JavaScript widget.
- **Computer Vision Demo (Breast Cancer Prediction)**:
  - Fine-tuned **PyTorch ResNet18 CNN** on the CBIS-DDSM dataset (~500-1,000 anonymized X-ray images).
  - **ETL Pipeline**: OpenCV for preprocessing (resize, normalize), PyTorch for inference.
  - **Streamlit** interface for user uploads, with an “educational use only” disclaimer.
  - Containerized with **Docker**, deployed on **AWS ECS (Fargate)** for scalability.
- **Tabular Data Demo (Real Estate Price Predictor)**:
  - **XGBoost** model trained on Kaggle House Prices dataset (~1,500 rows).
  - **ETL Pipeline**: Pandas for feature engineering, XGBoost for inference.
  - **Streamlit** interface with input forms and feature importance plots.
  - Containerized with **Docker**, deployed on **AWS Lambda** for lightweight predictions.
- **Automated CI/CD Pipelines**:
  - **GitHub Actions** for linting, testing, building, and deploying all components (website to S3, chatbot/ML demos to Lambda/ECS).
  - Ensures rapid iteration and production-grade reliability.
- **MLOps Implementation**:
  - **Data/Model Versioning**: **DVC** tracks datasets and models (stored in S3), integrated with Git.
  - **Experiment Tracking**: **MLflow** logs parameters, metrics (e.g., accuracy, RMSE), and artifacts during training.
  - **Monitoring**: **AWS CloudWatch** tracks latency, errors, and usage, with alerts for issues.
- **Documentation**:
  - Comprehensive `README.md`, website “How I Built This” section, and architecture diagrams.
  - Curated project examples with code, pipelines, and results.

## Architecture Overview

The project employs a **microservices-oriented architecture** deployed on AWS, orchestrated by CI/CD pipelines and MLOps tools. Each component is modular, scalable, and cost-optimized.

### Components
1. **Portfolio Website**:
   - **Frontend**: Static HTML/CSS/JS with Tailwind CSS, responsive with dark/light mode.
   - **Hosting**: AWS S3 for storage, CloudFront for low-latency delivery.
   - **CI/CD**: GitHub Actions syncs `/website` to S3 and invalidates CloudFront cache on `main` push.
   - **Purpose**: Main entry point, embedding chatbot widget and ML demo links.

2. **RAG Chatbot**:
   - **Backend**: FastAPI app with LangChain, FAISS (vector store), and Sentence Transformers for embeddings.
   - **Data**: Markdown files and Q&A pairs versioned with DVC, stored in S3.
   - **Hosting**: AWS Lambda (serverless) via `serverless` framework, exposed through API Gateway.
   - **CI/CD**: GitHub Actions tests (`pytest`), builds Docker image, and deploys to Lambda.
   - **Frontend**: JavaScript widget (`fetch` to `/chat`) embedded in the website.
   - **Purpose**: Answers user queries about projects and skills.

3. **Breast Cancer Prediction Demo**:
   - **Model**: PyTorch ResNet18 CNN, fine-tuned on CBIS-DDSM dataset.
   - **ETL Pipeline**: OpenCV for image preprocessing, PyTorch for inference.
   - **Backend**: FastAPI app, containerized with Docker.
   - **Hosting**: AWS ECS (Fargate) for scalable ML workloads, exposed via Application Load Balancer.
   - **CI/CD**: GitHub Actions tests, retrains (manual trigger), pushes to ECR, and updates ECS.
   - **Frontend**: Streamlit app for uploads and predictions, with disclaimer.
   - **MLOps**: DVC for data/model versioning, MLflow for tracking, CloudWatch for monitoring.
   - **Purpose**: Showcases end-to-end computer vision pipeline.

4. **Real Estate Price Predictor**:
   - **Model**: XGBoost trained on Kaggle House Prices dataset.
   - **ETL Pipeline**: Pandas for feature engineering, XGBoost for inference.
   - **Backend**: FastAPI app, containerized with Docker.
   - **Hosting**: AWS Lambda for lightweight predictions, exposed via API Gateway.
   - **CI/CD**: GitHub Actions tests, retrains, and deploys to Lambda.
   - **Frontend**: Streamlit app with forms and feature importance plots.
   - **MLOps**: DVC for versioning, MLflow for tracking, CloudWatch for monitoring.
   - **Purpose**: Demonstrates tabular data ML and interpretability.

5. **CI/CD Pipelines**:
   - **Tool**: GitHub Actions.
   - **Workflows**:
     - Website: `aws s3 sync` to S3, CloudFront invalidation.
     - Chatbot: Test, build/push Docker to ECR, deploy to Lambda.
     - ML Demos: Test, retrain (manual), push to ECR, deploy to ECS/Lambda.
     - MLOps: `dvc pull` for data/models in CI/CD runs.
   - **Purpose**: Automates development-to-production workflows.

6. **MLOps**:
   - **DVC**: Tracks datasets/models in S3, integrated with Git (`dvc pull` in CI/CD).
   - **MLflow**: Logs experiments (local or Databricks Community during development).
   - **CloudWatch**: Monitors latency, errors, and usage with alerts.
   - **Purpose**: Ensures reproducibility, traceability, and production readiness.

### Architecture Diagram (Text-Based)
```
[User] --> [CloudFront] --> [S3 (Website)]
--> [API Gateway] --> [Lambda (Chatbot)]
--> [ALB] --> [ECS Fargate (Breast Cancer Demo)]
--> [API Gateway] --> [Lambda (Real Estate Demo)]
[GitHub Repo] --> [GitHub Actions] --> [S3/ECR/Lambda/ECS]
[DVC] --> [S3 (Data/Models)]
[MLflow] --> [Experiment Tracking (Local/Databricks)]
[CloudWatch] --> [Monitoring/Alerts]
```

- **User**: Accesses the website via CloudFront URL.
- **CloudFront**: Caches and delivers website/demo assets globally.
- **S3**: Stores website files and DVC data/models.
- **API Gateway/ALB**: Routes requests to Lambda (chatbot, real estate) or ECS (breast cancer).
- **Lambda/ECS**: Host backend services, with ECS for compute-heavy ML.
- **GitHub Actions**: Automates CI/CD, pushing to S3/ECR and deploying.
- **DVC/MLflow/CloudWatch**: Enable MLOps for versioning, tracking, and monitoring.

*(Architecture image coming soon!)*

## Tech Stack

- **Programming Language**: Python 3.9+
- **Frontend**: HTML, CSS, JavaScript, Tailwind CSS, Streamlit
- **Backend APIs**: FastAPI
- **ML Frameworks**: PyTorch (CNN), XGBoost (tabular), Scikit-learn (preprocessing)
- **NLP/RAG**: LangChain, Sentence Transformers (`all-MiniLM-L6-v2`), FAISS, Hugging Face (`distilbert-base-uncased`)
- **Cloud**: AWS S3, CloudFront, Lambda, ECS (Fargate), ECR, API Gateway, CloudWatch, IAM
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **MLOps**: DVC (data/model versioning), MLflow (experiment tracking)
- **Development Tools**: Git, VS Code, Google Colab (training), AWS CLI, `serverless` CLI
- **Future Consideration**: Terraform (IaC)

## Current Status

- **Overall Timeline:** 8 weeks (April 29 – June 23, 2025), 15-20 hours/week.
- **Current Phase:** Week 1 (Planning & Scope Definition, April 29 – May 5, 2025).
- **Progress:**
    - GitHub repo initialized with /website, /chatbot, /breast-cancer, /real-estate, /ci-cd folders.
    - Planning website deployment to S3/CloudFront with GitHub Actions CI/CD.
## Timeline

| Task | Start Date | End Date | Satatus |
| :--- | :--- | :--- | :--- |
| Planning & Scope Definition | April 29, 2025 | May 5, 2025 | In Progress |
| Design and Development (Website, ChatBot, Live Demos) | May 6, 2025 | June 9, 2025 | Planned |
| Content Creation (Chatbot Dataset, Website Content) | May 6, 2025 | June 9, 2025 | Planned |
| Testing and Deployment | June 10, 2025 | June 16, 2025| Planned |
| Review and Finalize | June 17, 2025 | June 23, 2025 | Planned |

***This section will be updated weekly***

## Cost Breakdown

- **Website:** ~$5/month (S3 + CloudFront).
- **Chatbot:** ~$2-5/month (Lambda, API Gateway).
- **Breast Cancer Demo:** ~$5-10/month (ECS Fargate, S3).
- **Real Estate Demo:** ~$3-5/month (Lambda, API Gateway).
- **Total:** ~$15-20/month (AWS Free Tier).

## Live Demo Links

- **Portfolio Website:** [TBD]
- **Chatbot:** Embedded in website.
- **Breast Cancer Demo:** [TBD]
- **Real Estate Demo:** [TBD]


## Contributions & Suggestions

This is a personal learning and portfolio project, but I welcome constructive feedback! Please open an issue to share suggestions on best practices, tools, or improvements.

## License

This project is for educational and portfolio purposes. Code and assets are not licensed for commercial use.

## Contact

- **GitHub:** https://github.com/sachin301195
- **LinkedIn:** https://www.linkedin.com/in/sachin-bulchandani/
- **E-mail:** sachinbulchandani1@gmail.com 


## Acknowledgments

- Inspired by industry best practices in ML engineering, MLOps, and DevOps.
- Built with open-source tools (LangChain, PyTorch, DVC) and AWS Free Tier.
- Thanks to the ML, DevOps, and cloud communities for resources and inspiration.