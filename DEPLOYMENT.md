# 🌐 Deployment Guide

Complete guide for deploying KidSafe Analyzer to production.

## Overview

KidSafe Analyzer consists of two parts that need to be deployed:
1. **Frontend (React)** - Deploy to Vercel (recommended)
2. **Backend (Flask)** - Deploy to Render, Railway, or any Python hosting service

## Frontend Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Backend already deployed and accessible

### Steps

1. **Push your code to GitHub**
   ```bash
   cd /path/to/KidSafe-Analyzer
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/KidSafe-Analyzer.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Add `VITE_API_URL` with your backend URL
   - Example: `https://your-backend.onrender.com`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Backend Deployment

### Option 1: Render (Recommended)

**Advantages:**
- Free tier available
- Easy Python deployment
- Auto-deploy from GitHub
- Good for production use

**Steps:**

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**
   - **Name**: kidsafe-analyzer-backend
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`

4. **Environment Variables**
   You don't need to set API keys here - they're configured through the UI.
   Just set:
   - `PYTHON_VERSION`: `3.9.0`
   - `PORT`: `5001`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your service URL

6. **Update Frontend**
   - Update `VITE_API_URL` in Vercel to your Render URL
   - Redeploy frontend

### Option 2: Railway

**Advantages:**
- Very easy deployment
- Good free tier
- Fast builds

**Steps:**

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Railway auto-detects Python
   - Set root directory to `backend`
   - Add environment variable `PORT`: `5001`

4. **Deploy**
   - Railway automatically builds and deploys
   - Copy your public URL

### Option 3: Docker (Any Platform)

**For advanced users who want containerization:**

1. **Create Dockerfile in backend/**
   ```dockerfile
   FROM python:3.9-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   EXPOSE 5001

   CMD ["python", "main.py"]
   ```

2. **Build and Deploy**
   ```bash
   cd backend
   docker build -t kidsafe-backend .
   docker run -p 5001:5001 kidsafe-backend
   ```

3. **Deploy to:**
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

## Production Checklist

### Frontend
- [ ] Environment variables configured
- [ ] API URL points to production backend
- [ ] Build completes without errors
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)

### Backend
- [ ] Dependencies installed successfully
- [ ] PDF file included in deployment
- [ ] CSV file included in deployment
- [ ] Port configuration correct
- [ ] CORS configured for frontend domain
- [ ] Logs accessible for debugging

### Testing
- [ ] Frontend loads correctly
- [ ] API configuration works
- [ ] Can initialize system
- [ ] Can select cereals
- [ ] Analysis completes successfully
- [ ] Results display properly
- [ ] No console errors

## Environment Variables Summary

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.com
```

### Backend
No environment variables needed - API keys are configured through the UI.

## CORS Configuration

If you have CORS issues, update `main.py`:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-frontend.vercel.app"])
```

## Monitoring & Logs

### Frontend (Vercel)
- View logs in Vercel dashboard
- Real-time function logs
- Build logs for debugging

### Backend (Render/Railway)
- View logs in platform dashboard
- Set up log persistence
- Configure alerts

## Scaling

### Frontend
- Vercel automatically scales
- Global CDN included
- No configuration needed

### Backend
- **Render**: Upgrade to paid plan for more instances
- **Railway**: Increase resources in settings
- **Docker**: Use Kubernetes for orchestration

## Cost Estimates

### Free Tier (Development)
- **Frontend**: Free on Vercel (hobby plan)
- **Backend**: Free on Render (with limitations)
- **Total**: $0/month

### Production (Recommended)
- **Frontend**: Vercel Pro ($20/month) or free
- **Backend**: Render Starter ($7/month) or Railway ($5/month)
- **Total**: $5-20/month

### Enterprise
- Custom pricing based on usage
- Dedicated resources
- SLA guarantees

## Troubleshooting

### Build Fails
- Check Node/Python versions
- Verify all dependencies in package.json/requirements.txt
- Check build logs for specific errors

### Backend Not Responding
- Verify backend is running
- Check environment variables
- Test API endpoints directly
- Review backend logs

### CORS Errors
- Update CORS configuration in main.py
- Verify frontend URL is correct
- Check network tab in browser

### Slow Performance
- Upgrade to paid tier
- Add caching layer
- Optimize database queries
- Use CDN for static assets

## Security Best Practices

1. **Never commit API keys**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use HTTPS**
   - Vercel provides free SSL
   - Backend should use HTTPS too

3. **Rate Limiting**
   - Consider adding rate limits to API
   - Prevent abuse

4. **Input Validation**
   - Already implemented in backend
   - Additional frontend validation helps

## Support

Need help with deployment?
- Check platform documentation
- Review error logs
- Open a GitHub issue
- Contact platform support

---

**Ready to go live! 🚀**

