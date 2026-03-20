# AI Conclave: Women's Edition - Ticket Generator

A premium, modern web application to generate personalized event tickets with AI-themed aesthetics.

## 🚀 Features
- **Luma-Inspired UI**: Dark theme with glassmorphism and smooth animations.
- **Dynamic Ticket Generation**: Python (Pillow) backend for high-quality PNG output.
- **Social Sharing**: One-click sharing for LinkedIn, X (Twitter), and Instagram (Download).
- **Responsive Design**: Mobile-friendly preview and download.

## 📁 Project Structure
- `frontend/`: React + Vite (Typescript/JS)
- `backend/`: Flask (Python 3.x)
- `vercel.json`: Configuration for unified Vercel deployment.

---

## 🛠️ Local Setup

### 1. Backend (Flask)
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 2. Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 📤 How to Upload to GitHub (IMPORTANT)

GitHub's web uploader has a **25MB limit**. To keep your repo clean and small:

1. **Delete** (or don't include) these folders:
   - `frontend/node_modules/` (~80MB)
   - `backend/venv/` (~7MB)
2. **Zip** the remaining files. The size should be around **5-10MB**.
3. **Upload** the zip or use the command line:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

---

## 🌐 Deployment (Vercel)

1. Connect your GitHub repository to **Vercel**.
2. Vercel will detect `vercel.json` and automatically:
   - Build the React frontend (`frontend/`)
   - Deploy the Flask backend as Serverless Functions (`backend/`)
3. Ensure you have the `VITE_API_URL` environment variable pointing to your API if needed.

---

## ⚖️ Credits
Built by **React Hyderabad** & **Juicer Technology**.
