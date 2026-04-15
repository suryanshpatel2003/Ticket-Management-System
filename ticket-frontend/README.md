# 🎫 Ticket Management System

A full-stack ticket management system where users can raise tickets and admins can manage, assign, and resolve them.

This project is built using React (frontend) and FastAPI (backend) with role-based authentication.

---

## 🚀 Features

### 👤 User
- Register & Login
- Create tickets
- View own tickets
- Track ticket status (open / in-progress / closed)

### 👨‍💼 Admin
- View all tickets
- Assign tickets to self
- Update ticket status
- Delete tickets
- View system stats (total, open, in-progress, closed)

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- JWT Authentication
- SQLite (for development)

---

## 📊 Ticket Fields

Each ticket contains:

- id  
- title  
- description  
- status  
- priority  
- category  
- created_by  
- assigned_to  
- created_at  
- updated_at  

---

## 🔐 Authentication

- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control (user / admin)

---

## ⚙️ API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Tickets
- `POST /tickets` → Create ticket  
- `GET /tickets` → Get tickets (with filters)  
- `GET /tickets/{id}` → Get single ticket  
- `PATCH /tickets/{id}` → Update ticket  
- `PATCH /tickets/{id}/status` → Update status  
- `PATCH /tickets/{id}/assign` → Assign ticket (admin only)  
- `DELETE /tickets/{id}` → Delete ticket  

### Admin
- `GET /tickets/admin/stats`

---

## 🖥️ UI Highlights

- Clean and minimal dashboard UI
- Separate dashboards for user and admin
- Status badges and priority indicators
- Real-time updates after actions

---

## 🧪 How to Run Locally

### 1. Clone the project
```bash
git clone <repo-link>
cd project

2. Backend setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

3. Frontend setup
cd frontend
npm install
npm run dev