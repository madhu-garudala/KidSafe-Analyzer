# 🚀 Quick Start Guide

Get KidSafe Analyzer running in 5 minutes!

## Prerequisites

- Node.js (v18+)
- Python (3.9+)
- OpenAI API Key
- LangSmith API Key

## Step 1: Clone or Download

If you haven't already, make sure you have the project on your machine.

## Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python main.py
```

✅ Backend should now be running on `http://localhost:5001`

## Step 3: Frontend Setup (2 minutes)

Open a **new terminal** (keep the backend running):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should now be running on `http://localhost:3000`

## Step 4: Configure & Use (1 minute)

1. Open your browser to `http://localhost:3000`
2. Enter your API keys:
   - OpenAI API Key (required)
   - LangSmith API Key (required)
   - Cohere API Key (optional)
   - Tavily API Key (optional)
3. Select retrieval strategy (Ensemble recommended)
4. Click **Initialize System** (wait 10-15 seconds)
5. Select a cereal from the dropdown
6. Click **Analyze Ingredients**
7. View the results!

## Troubleshooting

### Backend won't start
- Make sure virtual environment is activated
- Check Python version: `python --version` (should be 3.9+)
- Try: `pip install --upgrade pip` then reinstall dependencies

### Frontend won't start
- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`

### API Configuration fails
- Verify your API keys are correct
- Check that backend is running on port 5001
- Look at the browser console for errors (F12)

### Analysis takes too long
- First analysis can take 10-15 seconds (PDF processing)
- Subsequent analyses should be faster (3-5 seconds)
- Check your internet connection

## Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create new secret key
5. Copy and save it (you won't see it again!)

### LangSmith API Key
1. Go to https://smith.langchain.com/
2. Sign up with your email
3. Create a new API key
4. Copy and save it

### Cohere API Key (Optional)
1. Go to https://dashboard.cohere.com/
2. Sign up for free
3. Get your API key from the dashboard

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Explore different retrieval strategies
- Check out the [Backend README](./backend/README.md) for API details
- Deploy to production (see Deployment section in README)

## Need Help?

- Check the main README.md for detailed information
- Review the API documentation
- Look at the backend logs for error messages
- Open an issue on GitHub

---

**Happy analyzing! 🍎**

