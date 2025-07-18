# 🌐 MERN Blog Application

A full-stack blog platform built with MongoDB, Express.js, React, and Node.js.

## 🚀 Live Deployment

- **Frontend**: [Vercel Link](https://mern-blog-azure.vercel.app/)

## 📁 Project Structure
```bash
mern-blog/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
├── server/                  # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
├── README.md
└── .gitignore
```


## ⚙️ Technologies
- MongoDB (Atlas)
- Express.js
- React.js (Vite)
- Node.js
- Cloudinary
- GitHub Actions
- Vercel + Render

## 📦 CI/CD Pipeline

| Stage | Status |
|-------|--------|
| Lint  | ✅      |
| Test  | ✅      |
| Build | ✅      |
| Deploy | ✅     |

![CI/CD Pipeline](./screenshot/backend.png)
![CI/CD Pipeline](./screenshot/frontend.png)

## 📊 Monitoring

We use:
- **Render Monitoring** (logs, memory, uptime)
- **Health Check API** at `/api/health`
- **Sentry** for error tracking (optional)
- **Vercel Analytics** for frontend performance

## 📁 .env Setup

Create `.env` files in `client/` and `server/` based on the provided `.env.example`.

## 📸 Screenshots

| Description | Screenshot |
|-------------|------------|
| Home Page | ![home](./screenshot/Home.png) |
| CI/CD Logs | ![ci](./screenshot/backend.png) |

## 🛠️ Deployment Steps

### Frontend
- Auto-deployed from `main` branch to [Vercel](https://vercel.com)

### Backend
- Auto-deployed from `main` branch to [Render](https://render.com)

## 🧪 Testing
Run tests with:

```bash
# Client
cd client
npm test

# Server
cd server
npm test
