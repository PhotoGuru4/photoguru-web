# 📸 PhotoGuru – Photographer Web Application

PhotoGuru is a modern web application designed for **Photographers** to manage portfolios, concepts, bookings, and real-time communication with customers. The platform is part of the PhotoGuru ecosystem, which connects **Customers (mobile app)** and **Photographers (web app)**, enhanced with AI-powered photo guidance.

This repository focuses on the **Web Application for Photographers**.

---

## 🎯 Project Overview

PhotoGuru helps photographers:

* Showcase photography **concepts & portfolios**
* Manage **booking schedules** efficiently
* Communicate with customers via **real-time chat**
* Accept or reject booking requests
* Maintain a professional online presence

The system works together with:

* 📱 **Customer Mobile App (Android)** – for searching concepts, booking, and using AI Photo Guide
* 🧠 **Backend & AI Services** – for data, real-time chat, and AI-powered photo guidance

---

## 👥 Target Users

| Role             | Platform                  | Purpose                                                       |
| ---------------- | ------------------------- | ------------------------------------------------------------- |
| **Photographer** | Web Application (Desktop) | Manage portfolio, concepts, bookings, and chat with customers |
| **Customer**     | Mobile App (Android)      | Search concepts, book photographers, use AI Photo Guide       |

---

## ⚙️ Tech Stack (Web – Photographer)

| Technology              | Purpose                        |
| ----------------------- | ------------------------------ |
| **React**               | Component-based UI development |
| **Vite**                | Fast build tool & dev server   |
| **TypeScript**          | Type safety & maintainability  |
| **Tailwind CSS**        | Utility-first styling          |
| **Zustand**             | Global state management        |
| **TanStack Query**      | Server-state & API caching     |
| **React Router DOM**    | Client-side routing            |
| **Axios**               | HTTP client for REST APIs      |
| **Lucide React**        | Icon library                   |
| **ESLint**              | Code quality & linting         |
| **Husky & lint-staged** | Pre-commit automation          |

---

## 🧩 Key Features

### 🔐 Authentication

* Register & login as **Photographer**
* Secure session handling

### 📂 Portfolio & Concept Management

* Create and delete photography concepts
* Upload and organize portfolio images
* Each concept includes description, images, location, and pricing

### 📅 Booking Management

* View bookings in list or calendar format
* Track booking statuses:

  * Pending
  * Confirmed
  * Completed
  * Rejected

### 💬 Real-time Chat

* Direct 1-1 chat with customers
* Receive booking requests through chat
* Accept or reject booking requests

### 📊 Dashboard

* Overview of concepts, bookings, and clients
* Quick access to messages and schedules

---

## 🗂 Project Structure

The project follows a **Feature-based Architecture** for scalability and clarity.

```
src/
├── assets/                # Images, icons, static files
├── features/              # Domain-based features
│   └── auth/
│       ├── components/    # Auth UI components
│       ├── hooks/
│       │   ├── mutations/ # Auth mutations
│       │   └── queries/   # Auth queries
│       ├── services/      # Auth API services
│       └── types/         # Auth types
├── lib/                   # Third-party configurations (axios, etc.)
├── pages/                 # Route-level pages
├── routes/                # App routing configuration
├── shared/                # Reusable resources
│   ├── components/
│   │   ├── common/        # Common UI components (Modal, Badge, Button...)
│   │   └── ui/            # Higher-level UI components
│   ├── constants/         # Global constants & messages
│   ├── guards/            # Route guards (auth protection)
│   ├── hooks/
│   │   ├── mutations/
│   │   └── queries/
│   ├── layouts/           # App layouts
│   ├── services/          # Shared API services
│   ├── styles/            # Global styles
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Utility functions
├── store/                 # Zustand global stores
└── App.tsx                # Root component
```

---

## 🚀 Getting Started

### 1️⃣ Installation

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

The app will be available at:
👉 `http://localhost:5173`

### 3️⃣ Production Build

```bash
npm run build
```

---

## 🔧 Configuration & Tooling

* **Environment Variables:** Managed via `.env`
* **Linting:** ESLint + TypeScript strict mode
* **Git Hooks:** Husky runs lint checks before commit
* **Code Style:** Consistent, scalable, feature-based

---

## 🔗 Related Systems

* **Mobile App (Customer):** React Native + Expo
* **Backend:** NestJS + PostgreSQL + Prisma
* **Real-time Chat:** Firebase Firestore
* **AI Photo Guide:** Google Gemini API
* **Image Storage:** Cloudinary

---

## 📌 Notes

* This web app is optimized for **desktop usage**
* Designed as an **admin-style dashboard** for photographers
* Built for scalability and future feature expansion