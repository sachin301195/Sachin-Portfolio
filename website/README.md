# Personal Portfolio Website

This directory contains the source code for my personal portfolio website, designed to showcase my projects in cloud engineering, MLOps, and software development. The site is built as a fast, secure, and globally available static web application, hosted entirely on AWS.

**Live Site:** [www.sachinpb.com](http://www.sachinpb.com)

---

## Technical Architecture & Cloud Infrastructure

This website is more than just a static page; it's a demonstration of a modern, serverless cloud architecture designed for high performance, security, and scalability. The entire infrastructure is automated via a CI/CD pipeline.

### Architecture Overview



The architecture leverages a suite of AWS services to deliver the content securely and efficiently:

1.  **DNS & Routing (Amazon Route 53)**: Route 53 manages the DNS routing for the custom domain (`sachinpb.com`), directing user traffic to the CloudFront distribution. It provides a reliable and scalable Domain Name System.

2.  **Content Delivery Network (Amazon CloudFront)**: CloudFront serves as the global CDN. It caches the website's content at edge locations around the world, ensuring low-latency delivery to users regardless of their geographic location.
    * **Security**: An **SSL/TLS certificate**, managed by AWS Certificate Manager (ACM), is attached to the CloudFront distribution, enabling end-to-end **HTTPS** encryption.
    * **HTTP to HTTPS Redirection**: The CloudFront distribution is configured to automatically redirect all HTTP requests to HTTPS, ensuring all traffic is secure.

3.  **Static Hosting (Amazon S3)**: The core website files (HTML, CSS, JavaScript, and images) are stored in an Amazon S3 bucket. The bucket is configured for static website hosting and is set as the origin for the CloudFront distribution. Access to the S3 bucket is restricted so that content is only served through CloudFront, a security best practice.

---

## CI/CD Automation Pipeline

The deployment of this website is fully automated using a CI/CD pipeline defined in the `.github/workflows/deploy-website.yml` file. This ensures that any changes pushed to the `main` branch are automatically built and deployed, providing a seamless and error-free update process.

### Workflow Steps:
1.  **Trigger**: The workflow is automatically triggered on any `push` to the `main` branch that involves a change within the `/website` directory.
2.  **Build Environment**: A new Ubuntu runner is provisioned, and Node.js is set up.
3.  **Build Assets**: The workflow installs the necessary `npm` packages and runs a script to build and minify the Tailwind CSS files.
4.  **Deploy to S3**: The workflow authenticates with AWS using repository secrets and syncs the entire built website directory to the designated S3 bucket. The `--delete` flag is used to remove any old files that are no longer part of the new build.
5.  **Invalidate CloudFront Cache**: The final step is to create a CloudFront invalidation for `/*`. This purges the cache at all edge locations, forcing CloudFront to fetch the new version of the files from S3. This ensures that users see the updated website immediately after deployment.

---

## Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript
* **CSS Framework**: Tailwind CSS
* **Cloud Services**: AWS S3, AWS CloudFront, AWS Route 53, AWS Certificate Manager
* **CI/CD**: GitHub Actions

---

## How to Run Locally

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to this directory**:
    ```bash
    cd website
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the Tailwind CSS build process in watch mode**:
    ```bash
    npm run start:tailwind
    ```
5.  Open the `index.html` file in your browser. The page will automatically reflect any changes you make to the HTML or Tailwind CSS classes.