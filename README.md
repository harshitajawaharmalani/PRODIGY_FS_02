# 🏢 Employee Management System (EMS) - Task 02

An industry-standard web application designed for administrators to manage employee records with high security and efficiency. This project fulfills the requirements of **Task-02**, focusing on the MERN stack development lifecycle.

## 🎯 Task Objectives
- [x] **Full CRUD Operations:** Create, Read, Update, and Delete employee profiles.
- [x] **Secure Authentication:** JWT-based login/signup with HTTP-only cookies.
- [x] **Data Validation:** Server-side and Client-side validation for sensitive data.
- [x] **Protected Routes:** Middleware to prevent unauthorized access to the dashboard.

## 🛠️ Technical Stack
- **Frontend:** React.js, Tailwind CSS, Axios, React Router.
- **Backend:** Node.js, Express.js, JWT, BcryptJS.
- **Database:** MongoDB (via Mongoose ODM).

## 🚀 Core Functionalities
- **Admin Authentication:** Secure entry point for administrators only.
- **Employee Directory:** Real-time list of all employees fetched from MongoDB.
- **Record Management:** - Add new employees with detailed fields (Name, Email, Position, Salary).
  - Update existing employee details.
  - Remove employee records with a single click.
- **Security:** Password hashing and token-based session persistence.

## 📸 Screenshots
## Admin Dashboard
<img width="1732" height="892" alt="image" src="https://github.com/user-attachments/assets/65244603-532f-431f-84d0-efb4c243af20" />

## User Dashboard
<img width="1761" height="888" alt="image" src="https://github.com/user-attachments/assets/496a2af6-4bf1-4ee0-80cd-f1ef7f1b3689" />

## Login Page
<img width="1742" height="797" alt="image" src="https://github.com/user-attachments/assets/941a44fa-9448-4299-a5a0-8ce56e767b53" />

## Signup Page
<img width="1767" height="882" alt="image" src="https://github.com/user-attachments/assets/5be1d947-a1cc-4da5-93c3-14e7d4381acb" />


## 🛠️ Installation & Setup
1. **Clone Repo:** `git clone https://github.com/your-username/ems-task-02.git`
2. **Setup Backend:** - `cd backend`
   - `npm install`
   - Configure your `.env` with `MONGO_URI` and `JWT_SECRET`.
3. **Setup Frontend:** - `cd frontend`
   - `npm install`
4. **Run:** Start both servers using `npm run dev`.

---
*Developed by Harshita as part of the Full-Stack Web Development Internship Task.*
