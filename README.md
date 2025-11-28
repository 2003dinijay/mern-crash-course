# 🛒 Product Store - MERN Stack Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v20+-green.svg)
![React](https://img.shields.io/badge/React-v18+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)

A full-stack responsive web application for managing product inventory. Built using the **MERN Stack** (MongoDB, Express.js, React, Node.js), featuring a modern UI with Chakra UI and efficient state management using Zustand.

## ✨ Features

- **📦 Product Management (CRUD):**
  - **Create:** Add new products with name, price, and image URL.
  - **Read:** View a grid layout of all products.
  - **Update:** Edit existing product details via a modal form.
  - **Delete:** Remove products from the inventory.
- **🌓 Dark/Light Mode:** Seamless theme toggling using Chakra UI.
- **⚡ Real-time Updates:** Instant UI updates without page reloads using Zustand.
- **📱 Fully Responsive:** Optimized for mobile, tablet, and desktop screens.
- **🛡️ Secure Backend:** Data validation and sanitization on the server side.

## 🛠️ Tech Stack

### Frontend
- **React.js:** Component-based UI library.
- **Vite:** Next-generation frontend tooling for fast builds.
- **Chakra UI:** Modular and accessible component library.
- **Zustand:** Lightweight state management (simpler alternative to Redux).
- **React Router:** Client-side routing for seamless navigation.

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web framework for handling API routes and middleware.
- **Mongoose:** ODM (Object Data Modeling) for MongoDB interaction.
- **MongoDB:** NoSQL database for storing product data.

## 📂 Project Structure

```bash
mern-crash-course/
├── backend/                # Server-side logic
│   ├── config/             # Database connection
│   ├── controllers/        # Request logic (get, create, update, delete)
│   ├── models/             # Mongoose schemas
│   └── routes/             # API endpoints
└── frontend/               # Client-side React app
    ├── src/
    │   ├── components/     # Reusable UI components (Navbar, ProductCard)
    │   ├── pages/          # Page views (Home, Create)
    │   └── store/          # Zustand state store
