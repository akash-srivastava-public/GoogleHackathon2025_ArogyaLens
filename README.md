# 🩺 ArogyaLens

**ArogyaLens** analyzes your annual health document to deliver a personalized chronic risk score — secure, private, and ethical.  
Powered by **Google Gemini**, **MongoDB**, **Docker**, and **GitLab CI** for seamless, scalable AI-powered healthcare insights.

---

## 📸 Design

![ArogyaLens Design](https://github.com/akash-srivastava-public/GoogleHackathon2025_ArogyaLens/blob/main/ArogyaLensDesign.png)

---

## 🎥 Demo Video

[![Watch the Demo](https://img.youtube.com/vi/qWQQGhzwxM4/0.jpg)]([)

Link: https://youtu.be/qWQQGhzwxM4]

> *Click above to watch our 2-minute hackathon demo of ArogyaLens in action.*

---

## 🔍 Overview

**ArogyaLens** empowers individuals to better understand their long-term health risks by leveraging AI to interpret medical data such as lab reports and diagnostic summaries. With privacy at its core, ArogyaLens converts raw health documents into actionable insights through a chronic risk score.

---

## 🚀 Features

- ⚕️ **AI-Powered Risk Analysis**  
  Uses Google Gemini to assess and summarize chronic disease risks from medical reports.

- 🔒 **Privacy First**  
  No data leaves your environment unencrypted. Complies with ethical standards and privacy best practices.

- 🧠 **Personalized Risk Score**  
  Tailored insights highlighting risk factors for chronic conditions like diabetes, heart disease, and more.

- 📦 **Containerized Deployment**  
  Fully containerized with Docker for easy setup and consistent performance.

- ⚙️ **CI/CD Ready**  
  Integrated GitLab CI pipelines for automatic build, test, and deploy workflows.

---

## 🧪 Tech Stack

| Component      | Technology         |
|----------------|--------------------|
| LLM / AI       | Google Gemini      |
| Backend        | Node.js / Express  |
| Database       | MongoDB            |
| Containerization| Docker            |
| DevOps         | GitLab CI/CD       |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Docker
- MongoDB (Local or Atlas)
- Google Gemini API Key

### Setup

```bash
# Clone the repo
git clone https://github.com/akash-srivastava-public/GoogleHackathon2025_ArogyaLens.git

# Install dependencies
npm install

# Setup environment
make file at root .env
# Add MongoDB URI and Gemini API Key in .env

PORT=8000

MONGO_URI=mongodb+srv://<>:.....

API_KEY="XXXXXXXX"

# Run locally
npm run build
npm run start
```
#### Built with ❤️ at [Google AI in Action Hackathon](https://ai-in-action.devpost.com/) — because your health deserves clarity and care.

