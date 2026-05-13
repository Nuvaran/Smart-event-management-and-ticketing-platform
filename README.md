# 🎟️ Smart Event Management & Ticketing Platform

A full-stack web application that enables users to browse events, book tickets, and manage enquiries, while allowing administrators to create and manage events with real-time insights and secure access control.

---

## 📌 Overview

The Smart Event Management & Ticketing Platform is designed to digitize and streamline event operations. It eliminates manual booking errors, improves event capacity control, and provides a centralized system for event discovery, ticketing, and customer engagement.

Built using **Node.js, Express, EJS, and MongoDB**, the system follows the **MVC architecture** with secure authentication and role-based access control.

---

## 👥 Collaborators & Team Roles

- **Team Lead / Project Coordinator:** _[Name]_
- **Backend Developer:** _[Name]_
- **Frontend Developer:** _[Your Name]_
- **Database Engineer:** Masego Motswe (600256)
- **DevOps Engineer:** _[Name]_

---

## 🗂️ Project Structure

smart-event-platform/
│
├── config/ # Database configuration
├── controllers/ # Application logic
├── models/ # MongoDB schemas
├── routes/ # API and page routes
├── middleware/ # Auth, roles, error handling
├── views/ # EJS frontend templates
│ ├── pages/
│ ├── partials/
│ └── layouts/
├── public/ # CSS, JS, images
├── utils/ # Helper functions
├── server.js # Entry point
├── .env
├── package.json
└── README.md

---

---

## 🚀 Features

- User registration & login with secure password hashing
- Role-based access (Admin & User)
- Event creation, update, and deletion (Admin only)
- Ticket booking system with capacity validation
- User booking history dashboard
- Contact / enquiry submission system
- Event search & filtering

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- MongoDB + Mongoose
- bcrypt (password hashing)
- express-session / JWT (authentication)
- Tailwind css

---
---
## ▶️ How to Run the Project

### 1. Clone the repository
git clone https://github.com/Nuvaran/Smart-event-management-and-ticketing-platform.git

### 2. Install dependencies
npm install

### 3. Configure environment variables
Create a .env file:
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

### 4. Run the application
npm run dev

### 5. Open in browser
http://localhost:3000

---
## 📸 Screenshots

---
---
## 🌐 Live Demo

---

