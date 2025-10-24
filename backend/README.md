# KidSafe Analyzer - Backend

Flask-based backend API for the KidSafe Food Analyzer application.

## Quick Start

### 1. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install packages
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python main.py
```

The server will start on `http://localhost:5001`

## API Endpoints

### `GET /api/status`
Check if the system is initialized.

### `GET /api/cereals`
Get the list of available cereal products.

### `POST /api/configure`
Configure API keys and initialize the RAG system.

**Body:**
```json
{
  "openai_api_key": "sk-...",
  "langsmith_api_key": "ls_...",
  "cohere_api_key": "...",
  "tavily_api_key": "...",
  "retrieval_strategy": "ensemble"
}
```

### `POST /api/analyze`
Analyze ingredients for a cereal product.

**Body:**
```json
{
  "cereal_name": "Cheerios",
  "ingredients": "Whole Grain Oats, Sugar, Salt, ..."
}
```

## Directory Structure

```
backend/
├── backend/                    # Python package
│   ├── __init__.py
│   ├── config.py              # Configuration
│   ├── vector_store.py        # Qdrant vector store
│   ├── rag_engine.py          # LangGraph RAG workflow
│   ├── advanced_retrieval.py  # Retrieval strategies
│   └── evaluation.py          # Evaluation utilities
├── Data/
│   ├── cereal.csv            # Cereal database
│   └── Input/
│       └── Food-Labeling-Guide-(PDF).pdf
├── main.py                    # Flask application
└── requirements.txt           # Dependencies
```

## Dependencies

- **Flask**: Web framework
- **LangChain**: AI application framework
- **LangGraph**: Workflow orchestration
- **Qdrant**: Vector database
- **OpenAI**: Language models and embeddings
- **PyMuPDF**: PDF processing

## Environment Variables

Set these through the web interface:
- `OPENAI_API_KEY`
- `LANGCHAIN_API_KEY`
- `COHERE_API_KEY` (optional)
- `TAVILY_API_KEY` (optional)

## Retrieval Strategies

1. **naive**: Simple vector search
2. **bm25**: Keyword-based search
3. **multi_query**: LLM query expansion
4. **compression**: Cohere reranking
5. **ensemble**: Combines multiple strategies (recommended)

## Development

For development mode with auto-reload:

```bash
export FLASK_ENV=development
export FLASK_DEBUG=True
python main.py
```

## Production Deployment

For production deployment, consider using:
- Gunicorn or uWSGI
- Docker containerization
- Environment-based configuration
- Proper logging and monitoring

Example with Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 main:app
```

