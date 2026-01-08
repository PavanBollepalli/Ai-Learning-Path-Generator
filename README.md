# SkillVector is an AI-Powered Personalized Learning Path Generator

> **SIH25199** - An intelligent system that generates customized learning and skill development pathways aligned with NSQF standards and industry demands.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The AI-Powered Personalized Learning Path Generator addresses the skill gap between learners and job market demands by creating customized learning pathways. The system leverages AI, Machine Learning, and Labour Market Intelligence to recommend courses, certifications, and skill development programs aligned with individual learner profiles and NSQF (National Skills Qualification Framework) standards.

### Vision

To design a dynamic, adaptive learning recommendation system that supports lifelong learning, improves employability, and provides data-driven career guidance for learners across India.

## ✨ Features

### Core Features

- **Personalized Learning Paths** - AI-generated recommendations based on learner profiles, skills, and career goals
- **NSQF Alignment** - Maps learner competencies to appropriate NSQF qualification levels
- **Labour Market Intelligence** - Integrates current and future industry demand data
- **Progress Tracking** - Dynamic updates based on learner performance and feedback
- **Multi-user Support** - Separate interfaces for learners, trainers, counselors, and policymakers
- **Multilingual Interface** - Accessible to learners from diverse linguistic backgrounds
- **Analytics Dashboard** - Comprehensive insights for administrators and policymakers
- **Skill Gap Analysis** - Identifies gaps between current skills and career requirements

### Optional Features

- Integration with external e-learning platforms
- Industry-specific learning path customization (IT, Healthcare, Manufacturing)
- Mobile application with offline support
- Gamification elements (badges, milestones, achievements)

## 🏗️ System Architecture

```
┌─────────────────┐
│   React Frontend │
│   (Port 3000)    │
└────────┬─────────┘
         │
         │ REST API
         │
┌────────▼──────────┐
│  FastAPI Backend  │
│   (Port 8000)     │
└────────┬──────────┘
         │
    ┌────┴────┬──────────────┐
    │         │              │
┌───▼───┐ ┌──▼──────┐ ┌────▼─────┐
│PostgreSQL│ │TensorFlow│ │  AWS    │
│ Database │ │AI/ML Engine│ │ Cloud   │
└──────────┘ └─────────┘ └──────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.8 or higher
- **Node.js** 16.x or higher
- **PostgreSQL** 14 or higher
- **Git**
- **pip** (Python package manager)
- **npm** or **yarn** (Node package manager)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-learning-path-generator.git
cd ai-learning-path-generator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or
yarn install
```

### 4. Database Setup

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE learning_path_db;

# Create user (optional)
CREATE USER learning_path_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE learning_path_db TO learning_path_user;

# Exit PostgreSQL
\q
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://learning_path_user:your_password@localhost:5432/learning_path_db

# JWT Configuration
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AWS Configuration (if using)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# CORS Origins
CORS_ORIGINS=http://localhost:3000
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Start Frontend Development Server

```bash
cd frontend
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

### Run Database Migrations

```bash
cd backend
alembic upgrade head
```

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key API Endpoints

```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User authentication
GET    /api/learners/profile       - Get learner profile
POST   /api/learners/assessment    - Submit learner assessment
GET    /api/recommendations        - Get personalized learning paths
POST   /api/progress/update        - Update learning progress
GET    /api/analytics/dashboard    - Get analytics data
GET    /api/reports/skill-gap      - Generate skill gap report
```

## 👥 User Roles

1. **Learner** - Access personalized learning paths, track progress, view recommendations
2. **Trainer/Institution** - Monitor learner progress, manage courses, view analytics
3. **Counselor** - Provide guidance, review learner profiles, suggest career paths
4. **Policymaker/Administrator** - Access aggregated analytics, manage system configuration

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python** - Core programming language
- **TensorFlow** - Machine learning and AI model development
- **PostgreSQL** - Relational database management
- **SQLAlchemy** - Python SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **JWT** - Secure authentication mechanism

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Material-UI / Tailwind CSS** - UI component libraries
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **Redux / Context API** - State management
- **Chart.js / Recharts** - Data visualization

### AI/ML
- **TensorFlow** - Deep learning framework
- **Scikit-learn** - Machine learning algorithms
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing

### DevOps & Cloud
- **AWS** - Cloud hosting platform
- **Docker** - Containerization (optional)
- **GitHub Actions** - CI/CD pipeline

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and queries:
- Open an issue in the GitHub repository
- Contact the development team

## 🙏 Acknowledgments

- National Skills Qualification Framework (NSQF)
- National Council for Vocational Education and Training (NCVET)
- Smart India Hackathon 2025

---
