# 🍎 KidSafe Food Analyzer

An AI-powered application that helps parents make informed decisions about store-bought food products for their children by analyzing ingredient lists and providing detailed safety assessments.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Python](https://img.shields.io/badge/Python-3.9+-green?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0.0-lightgrey?logo=flask)
![LangChain](https://img.shields.io/badge/LangChain-0.3.0-orange)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Advanced Retrieval Strategies](#advanced-retrieval-strategies)
- [Deployment](#deployment)
- [Original Repository Contents](#original-repository-contents)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**KidSafe Food Analyzer** is a web application built with React (frontend) and Flask (backend) that leverages AI to analyze food ingredients specifically for children's safety. Parents can select cereal products from a database or input custom ingredient lists to receive detailed, evidence-based analysis powered by RAG (Retrieval-Augmented Generation) technology.

This application was developed as part of the **AI Engineering Bootcamp Cohort 8 Certification Challenge** from AI Makerspace, implementing production-grade AI systems with advanced retrieval strategies and full observability.

---

## ❓ Problem Statement

Parents struggle to quickly assess whether store-bought food products are safe and appropriate for their children. Key challenges include:

- **Time Constraints**: Unable to research every ingredient while shopping or at home
- **Complex Terminology**: Food labels contain technical terms and additives that are difficult to understand
- **Hidden Dangers**: Inability to identify harmful ingredients, allergens, or concerning additives
- **Information Overload**: Too much conflicting information from various sources
- **Decision Paralysis**: Difficulty making quick, informed decisions about children's food

---

## ✅ Solution

KidSafe Food Analyzer provides an intelligent, data-driven solution by:

1. **AI-Powered Analysis**: Using LangGraph and RAG to analyze ingredients against FDA guidelines and pediatric nutrition standards
2. **Clear Verdicts**: Providing immediate "GOOD ✅" or "BAD ❌" verdicts with detailed explanations
3. **Ingredient Breakdown**: Offering ingredient-by-ingredient analysis with concerns and benefits
4. **Evidence-Based**: Grounding all recommendations in FDA food labeling guidelines and medical research
5. **User-Friendly Interface**: Beautiful, modern UI that makes complex analysis accessible to all parents

---

## 🌟 Key Features

### Frontend (React)
- **Modern UI/UX**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Status**: Shows system initialization status and analysis progress
- **Component-Based**: Modular React components for maintainability
- **API Integration**: Axios-based service layer for clean API communication

### Backend (Flask + LangChain)
- **Advanced RAG System**: Multiple retrieval strategies for optimal results
- **Vector Search**: Qdrant vector database for semantic document search
- **LangGraph Workflow**: Structured AI workflow with retrieval and analysis steps
- **LangSmith Integration**: Full observability and tracing for production monitoring
- **Multiple Retrievers**: 
  - Naive Vector Search (baseline)
  - BM25 Keyword Search
  - Multi-Query Expansion
  - Cohere Reranking
  - Ensemble (combines multiple strategies)

### Analysis Features
- **Detailed Verdicts**: Clear GOOD/BAD assessment with reasoning
- **Ingredient Analysis**: Individual ingredient breakdown with safety concerns
- **Key Concerns**: Highlights problematic ingredients for children
- **Positive Aspects**: Identifies beneficial ingredients and nutritional value
- **Context-Aware**: Understands nuances (e.g., "Natural Flavors" doesn't mean all-natural)

---

## 🛠 Technology Stack

### Frontend
- **React 18.2**: Modern component-based UI framework
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client for API requests
- **CSS3**: Custom styling with CSS variables and animations
- **Google Fonts (Poppins)**: Modern typography

### Backend
- **Python 3.9+**: Primary backend language
- **Flask 3.0**: Lightweight web framework
- **Flask-CORS**: Cross-origin resource sharing
- **LangChain 0.3**: AI application framework
- **LangGraph 0.2**: Workflow orchestration
- **OpenAI GPT-4o-mini**: Language model for analysis
- **Qdrant**: Vector database for embeddings
- **PyMuPDF**: PDF document processing
- **RAGAS 0.2**: Evaluation framework

### AI & ML
- **OpenAI Embeddings**: text-embedding-3-small
- **Cohere Rerank**: Advanced reranking for better retrieval
- **LangSmith**: Observability and tracing
- **Tavily**: Web search capabilities (optional)

### DevOps & Tools
- **Git**: Version control
- **npm/pip**: Package management
- **Virtual Environment**: Python dependency isolation

---

## 📁 Project Structure

```
KidSafe-Analyzer/
├── frontend/                      # React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # Banner header component
│   │   │   ├── APIConfig.jsx      # API configuration form
│   │   │   ├── CerealSelector.jsx # Cereal selection & analysis trigger
│   │   │   └── AnalysisResults.jsx # Results display component
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.jsx                # Main application component
│   │   ├── App.css                # Application styles
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite configuration
│   ├── package.json               # Frontend dependencies
│   └── .gitignore                 # Git ignore rules
│
├── backend/                       # Flask Backend Application
│   ├── backend/                   # Python package
│   │   ├── __init__.py
│   │   ├── config.py              # Configuration settings
│   │   ├── vector_store.py        # Qdrant vector store management
│   │   ├── rag_engine.py          # LangGraph RAG workflow
│   │   ├── advanced_retrieval.py  # Advanced retrieval strategies
│   │   └── evaluation.py          # Evaluation utilities
│   ├── Data/
│   │   ├── cereal.csv             # Cereal products database
│   │   └── Input/
│   │       └── Food-Labeling-Guide-(PDF).pdf  # FDA guidelines
│   ├── main.py                    # Flask application entry point
│   ├── requirements.txt           # Python dependencies
│   └── .gitignore                 # Git ignore rules
│
└── README.md                      # This file
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.9 or higher)
- **pip** (Python package manager)
- **npm** or **yarn** (Node package manager)

### API Keys Required

You'll need the following API keys:

1. **OpenAI API Key** (Required) - [Get it here](https://platform.openai.com/api-keys)
2. **LangSmith API Key** (Required) - [Get it here](https://smith.langchain.com/)
3. **Cohere API Key** (Optional, for advanced retrieval) - [Get it here](https://dashboard.cohere.com/)
4. **Tavily API Key** (Optional, for web search) - [Get it here](https://tavily.com/)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask server:**
   ```bash
   python main.py
   ```

   The backend will start on `http://localhost:5001`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

4. **Open your browser:**
   Navigate to `http://localhost:3000`

---

## 🎮 Usage

### Step 1: Configure API Keys

1. Open the application in your browser (`http://localhost:3000`)
2. In the **API Configuration** section, enter:
   - OpenAI API Key (required)
   - LangSmith API Key (required)
   - Cohere API Key (optional, for better retrieval)
   - Tavily API Key (optional)
3. Select your preferred **Retrieval Strategy** (Ensemble recommended)
4. Click **Initialize System**

The system will:
- Load the FDA Food Labeling Guide PDF
- Create embeddings and vector database
- Initialize the selected retrieval strategy
- Set up the LangGraph RAG workflow

### Step 2: Select a Cereal Product

1. Once initialized, the **Select a Cereal Product** section becomes active
2. Choose a cereal from the dropdown menu
3. The selected cereal will display with a checkmark

### Step 3: Analyze Ingredients

1. Click the **Analyze Ingredients** button
2. Wait 5-10 seconds for AI analysis
3. View the detailed results:
   - Overall GOOD ✅ or BAD ❌ verdict
   - Quick summary
   - Ingredient-by-ingredient breakdown
   - Key concerns and positive aspects

### Step 4: Review Results

The analysis provides:
- **Clear Verdict**: Immediate assessment for busy parents
- **Evidence-Based Reasoning**: References to FDA guidelines
- **Actionable Information**: What to look out for in ingredients
- **Balanced View**: Both concerns and benefits

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001
```

### Endpoints

#### 1. Check System Status
```http
GET /api/status
```

**Response:**
```json
{
  "initialized": true,
  "has_api_keys": true
}
```

#### 2. Get Cereals List
```http
GET /api/cereals
```

**Response:**
```json
[
  {
    "brand": "Cheerios",
    "ingredients": "Whole Grain Oats, Sugar, Salt, ..."
  }
]
```

#### 3. Configure API Keys
```http
POST /api/configure
```

**Request Body:**
```json
{
  "openai_api_key": "sk-...",
  "langsmith_api_key": "ls_...",
  "cohere_api_key": "...",
  "tavily_api_key": "...",
  "retrieval_strategy": "ensemble"
}
```

**Response:**
```json
{
  "success": true,
  "message": "API keys configured and RAG system initialized with ensemble retrieval!",
  "retrieval_strategy": "ensemble"
}
```

#### 4. Analyze Ingredients
```http
POST /api/analyze
```

**Request Body:**
```json
{
  "cereal_name": "Cheerios",
  "ingredients": "Whole Grain Oats, Sugar, Salt, ..."
}
```

**Response:**
```json
{
  "success": true,
  "cereal_name": "Cheerios",
  "ingredients": "Whole Grain Oats, Sugar, Salt, ...",
  "analysis": "## VERDICT: GOOD ✅\n\n**Quick Summary:** ..."
}
```

---

## 🔍 Advanced Retrieval Strategies

The application implements multiple retrieval strategies to optimize the RAG pipeline:

### 1. Naive Vector Search (Baseline)
- Simple semantic similarity search
- Fast and straightforward
- Good for general queries

### 2. BM25 Keyword Search
- Sparse retrieval based on term frequency
- Excellent for keyword-specific queries
- Complements semantic search

### 3. Multi-Query Expansion
- LLM generates multiple query variations
- Improves recall by capturing different perspectives
- Better for complex queries

### 4. Cohere Rerank (Compression)
- Reranks retrieved documents using Cohere's reranking model
- Significantly improves relevance
- Requires Cohere API key

### 5. Ensemble (Recommended)
- Combines multiple strategies using Reciprocal Rank Fusion (RRF)
- Best of all approaches
- Default: Naive + BM25 + Cohere (if available)

**Performance Comparison:**

| Strategy | Speed | Accuracy | Best For |
|----------|-------|----------|----------|
| Naive | ⚡⚡⚡ | ⭐⭐⭐ | Simple queries |
| BM25 | ⚡⚡⚡ | ⭐⭐⭐ | Keyword matching |
| Multi-Query | ⚡⚡ | ⭐⭐⭐⭐ | Complex questions |
| Compression | ⚡⚡ | ⭐⭐⭐⭐⭐ | High precision needs |
| Ensemble | ⚡⚡ | ⭐⭐⭐⭐⭐ | Production use |

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variable:**
   - `VITE_API_URL`: Your backend API URL

5. **Deploy!**

### Backend Deployment Options

#### Option 1: Render
1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `python main.py`

#### Option 2: Railway
1. Deploy on [Railway](https://railway.app/)
2. Connect your repository
3. Set environment variables
4. Deploy automatically

#### Option 3: AWS/GCP/Azure
- Deploy using container services (Docker)
- Use managed services (AWS Lambda, Google Cloud Run, Azure Functions)

**Important:** Make sure to update the `VITE_API_URL` in your frontend environment variables to point to your deployed backend!

---

## 📚 Original Repository Contents

This React application is based on the **AI-MakerSpace-Certification-Challenge** repository. Here's what was included in the original repo:

### Core Application Files
- **`main.py`**: Flask backend application with API endpoints
- **`templates/index.html`**: Original Jinja2 template (replaced with React)
- **`static/`**: CSS and JavaScript files (migrated to React components)

### Backend Modules (`backend/`)
- **`config.py`**: Configuration settings and constants
- **`vector_store.py`**: Qdrant vector database management
- **`rag_engine.py`**: LangGraph-based RAG workflow engine
- **`advanced_retrieval.py`**: Multiple retrieval strategy implementations
- **`evaluation.py`**: System evaluation utilities
- **`ragas_evaluation.py`**: RAGAS framework integration

### Data Files (`Data/`)
- **`cereal.csv`**: Database of cereal products with ingredients
- **`Input/Food-Labeling-Guide-(PDF).pdf`**: FDA food labeling guidelines PDF

### Documentation (`docs/`)
The original repository contains extensive documentation:
- **`README.md`**: Project overview and description
- **`QUICKSTART.md`**: Quick start guide
- **`ADVANCED_RETRIEVAL.md`**: Detailed guide on retrieval strategies
- **`ADVANCED_RETRIEVAL_SUMMARY.md`**: Summary of retrieval implementations
- **`IMPLEMENTATION_SUMMARY.md`**: What has been built
- **`RAGAS_EVALUATION_GUIDE.md`**: Guide for using RAGAS evaluation
- **`architecture.md`**: Technical architecture decisions
- **`certification-challenge-plan.md`**: Complete certification challenge deliverables
- **`certification-challenge.md`**: Challenge requirements
- **`CLAUDE.md`**: Development guidelines
- **`NEXT_STEPS.md`**: Future improvements
- **`tasks.md`**: Task tracking
- **`overall_flow.excalidraw`**: System flow diagram

### Evaluation Files
- **`run_ragas_eval.py`**: Script to run RAGAS evaluations
- **`ragas_evaluation_results_ensemble.csv`**: Evaluation results

### Configuration Files
- **`pyproject.toml`**: Python project configuration
- **`cert_challenge.egg-info/`**: Python package metadata
- **`AIE8 Cert Challenge Rubric - Student.csv`**: Challenge rubric

### Development Files
- **`AI-MakerSpace-Certification-Challenge.code-workspace`**: VS Code workspace
- **`written_document_with_answers.doc`**: Challenge answers document

---

## 🚀 Future Roadmap

### Phase 2: Enhanced Features
- [ ] Mobile application with camera-based ingredient scanning (OCR)
- [ ] Barcode scanning for instant product lookup
- [ ] Personalized profiles for children with specific allergies
- [ ] Alternative product recommendations
- [ ] Offline mode for in-store use
- [ ] Multi-language support

### Phase 3: Advanced Capabilities
- [ ] Percentage-based safety scoring (0-100%)
- [ ] Multi-factor analysis dashboard
- [ ] Allergen detection with severity levels
- [ ] Sugar/sodium content visualization
- [ ] Nutritional value comparison charts
- [ ] Community ratings and reviews

### Phase 4: Enterprise Features
- [ ] Dietitian/pediatrician recommendations
- [ ] School cafeteria menu analysis
- [ ] Bulk product analysis
- [ ] API for third-party integration
- [ ] White-label solution for health organizations

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m 'Add amazing feature'`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Write clean, documented Python code
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes

---

## 📄 License

This project is part of the AI Engineering Bootcamp Cohort 8 Certification Challenge from **AI Makerspace**.

---

## 🙏 Acknowledgments

- **AI Makerspace**: For the excellent AI Engineering Bootcamp
- **LangChain**: For the powerful AI application framework
- **OpenAI**: For GPT-4o-mini and embeddings
- **FDA**: For comprehensive food labeling guidelines
- **React Team**: For the amazing frontend framework
- **Flask Team**: For the lightweight backend framework

---

## 📞 Support

For questions, issues, or feedback:

- **GitHub Issues**: [Report a bug](https://github.com/yourusername/KidSafe-Analyzer/issues)
- **Discussions**: [Start a discussion](https://github.com/yourusername/KidSafe-Analyzer/discussions)

---

## 📊 Project Stats

- **Total Lines of Code**: ~3,500+
- **React Components**: 5
- **API Endpoints**: 4
- **Retrieval Strategies**: 5
- **Documentation Files**: 15+
- **Technologies Used**: 20+

---

## 🎓 About the Challenge

This project was developed as part of the **AI Engineering Bootcamp Cohort 8 Certification Challenge**, which focuses on building production-grade AI applications with:

- ✅ RAG (Retrieval-Augmented Generation) systems
- ✅ LangGraph workflow orchestration
- ✅ Advanced retrieval strategies
- ✅ Vector database integration
- ✅ Full observability with LangSmith
- ✅ Systematic evaluation with RAGAS
- ✅ Production-ready architecture
- ✅ Modern frontend integration

---

**Built with ❤️ for parents who care about their children's health**

*Making food safety analysis accessible, accurate, and actionable.*

