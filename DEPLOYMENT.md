# Deployment Guide

## Quick Start: Deploy to Netlify

### Prerequisites
- GitHub account
- Netlify account (free)
- Backend deployed to Render, Railway, or Heroku (optional)

### Step 1: Prepare Your Repo
✅ Already done! All necessary files are included:
- `index.html` - Frontend game
- `server.js` - Backend server
- `netlify.toml` - Netlify configuration
- `package.json` - Dependencies with metadata

### Step 2: Connect to Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (root folder)
6. Click "Deploy site"

### Step 3 (Optional): Deploy Backend Separately

If you want online multiplayer, deploy backend to:

**Render:**
1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repo
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Copy your Render URL

**Railway:**
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Railway auto-detects Node.js
4. Copy your Railway URL

**Heroku:**
1. Go to [heroku.com](https://www.heroku.com)
2. Create new app
3. Connect GitHub
4. Enable auto-deploy
5. Copy your Heroku URL

### Step 4: Connect Frontend to Backend

1. In Netlify dashboard → Site settings
2. Go to "Build & deploy" → "Environment"
3. Add new variable:
   - Key: `BACKEND_URL`
   - Value: `https://your-backend-url.com`
4. Redeploy site

### Step 5: Update Frontend Code

In `index.html`, find this line and update it:
```javascript
const BACKEND_URL = process.env.BACKEND_URL || window.location.origin;
```

Change to:
```javascript
const BACKEND_URL = (typeof process !== 'undefined' && process.env.BACKEND_URL) || window.location.origin;
```

### Done! 🎉

Your game is now live:
- **Frontend**: `https://your-site.netlify.app`
- **Backend**: `https://your-backend.com` (if deployed)

## Troubleshooting

**Issue: Multiplayer not connecting**
- Check backend is deployed and running
- Verify BACKEND_URL environment variable is set
- Check browser console for errors

**Issue: Static site not serving**
- Confirm netlify.toml is in repo root
- Check Netlify build logs for errors
- Clear cache and redeploy

**Issue: Port conflicts**
- Netlify automatically assigns port 443 (HTTPS)
- Backend should use PORT environment variable

## URL Configuration

Frontend automatically detects backend:
1. Development: Uses `localhost:5000` (Node server)
2. Production: Uses `process.env.BACKEND_URL` (Netlify env var)
3. Fallback: Uses `window.location.origin` (same domain)

No code changes needed - just set the environment variable!
