# Syeed E-Commerce Backend 🛒

A robust Node.js/Express REST API for a modern e-commerce platform, featuring secure authentication, product management, and order processing.

---

## 🚀 Features
* **Authentication:** JWT-based secure login and registration.
* **Role Management:** Distinct flows for Admins and Customers.
* **File Handling:** Optimized image uploads using Multer.
* **Database:** Structured MongoDB schemas with Mongoose.
* **Security:** Password hashing with Bcrypt and environment variable protection.

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **Auth:** JSON Web Tokens (JWT) & Bcrypt
* **Utilities:** Multer (File Uploads), Cors, Dotenv

## 📂 Project Structure
```text
├── controllers/    # Request handling logic
├── models/         # Database schemas
├── routes/         # API endpoints
├── middleware/     # Auth & validation logic
├── config/         # Database & third-party configs
├── uploads/        # Local storage for images (Git ignored)
└── server.js       # Entry point