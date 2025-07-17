# 📝 MERN Blog Application

A full-stack blogging platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This application features a secure backend API and a modern, responsive frontend with **Instagram-like dark mode** styling using **Tailwind CSS**.

Users can register/login, create/edit blog posts with images, add comments, and filter content by categories. Admins and authors have different permissions, and all interactions follow RESTful API principles with **JWT authentication**, **Multer image uploads**, **search**, **pagination**, and more.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT)
- 📝 **Create, Read, Update, Delete (CRUD)** Blog Posts
- 💬 **Comment System** (with delete support for admins/authors)
- 🏷️ **Categories & Filtering**
- 🔎 **Search & Pagination**
- 🖼️ **Image Uploads with Preview** (Multer)
- 🌗 **Dark Mode (Instagram-like)**
- 📱 **Responsive Design**
- 👤 **User Roles**: Admin & Author
- 🧠 **RESTful API** with secure route access

---

## 🛠️ Technologies Used

- **MongoDB** – Document-based NoSQL database
- **Express.js** – Backend web framework for Node.js
- **React.js (via Vite)** – Frontend UI framework
- **Node.js** – JavaScript runtime for backend
- **Tailwind CSS** – Modern utility-first styling framework (dark mode supported)
- **JWT (JSON Web Tokens)** – Secure token-based auth
- **Multer** – Middleware for file/image uploads
- **Axios / Fetch** – HTTP client for frontend API requests
- **bcryptjs** – Password hashing
- **React Context (optional)** – Global auth state management

---

## 📁 Folder Structure

├── server/                   # Express server (Node.js)
│   ├── controllers/           # Route controllers (logic for each endpoint)
│   ├── middleware/            # Authentication and other middleware
│   ├── models/                # Mongoose data models (User, Post, Comment, Category)
│   ├── routes/                # Express route definitions
│   ├── uploads/               # Uploaded images storage (e.g. /public/uploads)
│   ├── .env                   # Backend environment variables (e.g. MONGO_URI, JWT_SECRET)
│   ├── server.js              # Entry point to start the server
│   └── package.json           # Backend dependencies and scripts
│
└── client/                  # React app (Vite)
    ├── public/
    │   └── index.html         # HTML template
    ├── src/
    │   ├── components/        # Reusable UI components (Navbar, PostList, etc.)
    │   ├── pages/             # Page components (Home, Login, Dashboard, etc.)
    │   ├── context/          # (Optional) React context providers (e.g. AuthContext)
    │   ├── App.jsx            # Main React component
    │   └── main.jsx           # Application entry (render to DOM)
    ├── tailwind.config.js     # Tailwind CSS configuration
    ├── package.json           # Frontend dependencies and scripts
    └── .env.local             # Frontend environment variables (e.g. VITE_API_URL)
