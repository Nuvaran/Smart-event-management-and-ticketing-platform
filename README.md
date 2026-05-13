#  Smart Event Management & Ticketing Platform

A full-stack web application that enables users to browse events, book tickets, and manage enquiries, while allowing administrators to create and manage events with real-time insights and secure access control.

---

## 📌 Overview

The Smart Event Management & Ticketing Platform is designed to digitize and streamline event operations. It eliminates manual booking errors, improves event capacity control, and provides a centralized system for event discovery, ticketing, and customer engagement.

Built using **Node.js, Express, EJS, and MongoDB**, the system follows the **MVC architecture** with secure authentication and role-based access control.

---

## 👥 Collaborators & Team Roles

- **Team Lead / Project Coordinator:** _Iwan Groenewald 600166_
- **Backend Developer:** _Armand Erasmus 601631_
- **Frontend Developer:** _Nuvaran Reddy 603013_
- **Database Engineer:** _Masego Motswe 600256_
- **DevOps Engineer:** _Tinyiko Siwele 601726_

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
├── app.js # Entry point
├── .env
├── package.json
└── README.md

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
## ▶️ How to Run the Project Locally

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)
- [Git](https://git-scm.com/)

---

### 1. Clone the repository
git clone https://github.com/Nuvaran/Smart-event-management-and-ticketing-platform.git
cd Smart-event-management-and-ticketing-platform

### 2. Install dependencies
npm install

### 3. Configure environment variables
Create a `.env` file in the root of the project and add the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
ACCESS_TOKEN_SECRET=your_access_token_secret

> ⚠️ Never share your `.env` file or commit it to GitHub.

### 4. Run the application

Development mode (auto-restarts on save):
npm run dev

Production mode:
npm start

### 5. Open in browser
http://localhost:3000

---

### 🔐 Default Admin Access
To access the admin dashboard, register an account and manually update your role to `admin` in MongoDB Atlas, or use the seeded admin credentials if provided.

---
## 📸 Screenshots
<img width="1524" height="913" alt="image" src="https://github.com/user-attachments/assets/f48e07f1-7cd2-4845-a31d-14993f348885" />
<img width="1271" height="911" alt="image" src="https://github.com/user-attachments/assets/68f8c527-ed50-46f2-8858-14534c350935" />
<img width="1600" height="844" alt="image" src="https://github.com/user-attachments/assets/e5dc75a8-3e20-4b1a-a8c0-779f15937297" />
<img width="1249" height="909" alt="image" src="https://github.com/user-attachments/assets/1bcbaab0-0514-495b-8cc0-6f361b9a2ef7" />
<img width="1233" height="911" alt="image" src="https://github.com/user-attachments/assets/9c734b1a-5e75-451f-87ac-f115ce145acd" />
<img width="1124" height="910" alt="image" src="https://github.com/user-attachments/assets/55d20a20-18b2-4681-9063-d3e2e3f80a5d" />
<img width="1014" height="912" alt="image" src="https://github.com/user-attachments/assets/33c72bfe-5ca4-4b6d-83f7-53afbc0172bb" />
<img width="1221" height="910" alt="WhatsApp Image 2026-05-13 at 10 43 35 PM" src="https://github.com/user-attachments/assets/a146055b-cd93-465d-9727-d461dfc6d0a0" />


---
## 🌐 Live Demo

https://smart-event-platform.onrender.com

---

