PRODIGY_WD_01: Secure User Authentication System
📌 Project Overview
This project is part of my Full-Stack Web Development Internship at Prodigy InfoTech. The goal was to build a robust and secure User Authentication system that handles user onboarding, identity verification, and access control for protected application routes.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS (for a clean, "Pinterest-style" UI)

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Security: JSON Web Tokens (JWT), Bcrypt.js (Password Hashing)

✨ Key Features
User Registration: New users can create an account with validated credentials.

Secure Login: Identity verification using email and encrypted passwords.

Password Hashing: Implemented Bcrypt.js to salt and hash passwords before storing them in MongoDB (Industry Standard).

Protected Routes: Restricted access to the "Dashboard" and "Profile" pages—only accessible via a valid JWT.

Session Management: Persistent login state managed through browser storage and token validation.