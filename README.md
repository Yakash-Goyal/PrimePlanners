# 🎉 PrimePlanners

> A premium, full-stack event management platform with dynamic pricing, role-based dashboards, and a futuristic dark-themed UI.

![Built with React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/API-Render-46E3B7?logo=render&logoColor=white)

---

## ✨ Features

### 🎫 For Attenders
- Browse and search events by category
- Dynamic ticket pricing based on demand, time, and fill rate
- Secure ticket booking with real-time seat availability
- Personal dashboard to track all purchased tickets

### 🎤 For Event Creators
- Create and publish events with custom details
- Track ticket sales, revenue, and event performance
- Manage all events from a dedicated Creator Hub

### 🛡️ For Admins
- Platform-wide analytics (revenue, users, bookings, events)
- 2% platform commission tracking on all ticket sales
- System monitoring and quick action controls

### 🔧 Platform Highlights
- **Dynamic Pricing Engine** — Ticket prices adjust automatically based on demand (fill rate), time until event, and category multipliers
- **JWT Authentication** — Secure login/signup with role-based access control (Attender, Creator, Admin)
- **Protected Routes** — Role-specific dashboards and pages guarded by authentication middleware
- **Responsive Design** — Fully responsive, dark-themed UI with glassmorphism, neon accents, and GSAP animations

---

## 🛠️ Tech Stack

| Layer       | Technology                                                     |
| ----------- | -------------------------------------------------------------- |
| Frontend    | React 19, Vite, Tailwind CSS 4, GSAP, React Router, Axios     |
| Backend     | Node.js, Express 5, Mongoose                                   |
| Database    | MongoDB Atlas                                                  |
| Auth        | JWT (jsonwebtoken), bcryptjs                                   |
| Deployment  | Render (Backend), Vercel (Frontend)                            |

---

## 📁 Project Structure

```
PrimePlanners/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Auth, Event, Booking, Analytics logic
│   ├── middleware/       # JWT auth & role authorization
│   ├── models/          # Mongoose schemas (User, Event, Booking, Analytics, PriceLog)
│   ├── routes/          # API route definitions
│   └── index.js         # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios instance with interceptors
│   │   ├── components/  # Navbar, Footer, EventCard, CheckoutModal, etc.
│   │   ├── context/     # AuthContext (global auth state)
│   │   ├── pages/       # Home, Events, EventDetails, Auth, Dashboards, Profile
│   │   ├── App.jsx      # Router setup with protected routes
│   │   └── main.jsx     # App entry point
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PrimePlanners.git
cd PrimePlanners
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint          | Description           | Access  |
| ------ | ----------------- | --------------------- | ------- |
| POST   | `/api/auth/register` | Register a new user | Public  |
| POST   | `/api/auth/login`    | Login & get token   | Public  |
| GET    | `/api/auth/me`       | Get current user    | Private |

### Events
| Method | Endpoint            | Description              | Access  |
| ------ | ------------------- | ------------------------ | ------- |
| GET    | `/api/events`       | List all active events   | Public  |
| GET    | `/api/events/:id`   | Get event details        | Public  |
| POST   | `/api/events`       | Create a new event       | Creator |
| PUT    | `/api/events/:id`   | Update an event          | Creator |
| DELETE | `/api/events/:id`   | Delete an event          | Creator |

### Bookings
| Method | Endpoint            | Description              | Access  |
| ------ | ------------------- | ------------------------ | ------- |
| POST   | `/api/bookings`     | Book tickets for an event| Private |
| GET    | `/api/bookings/my`  | Get my bookings          | Private |
| DELETE | `/api/bookings/:id` | Cancel a booking         | Private |
| GET    | `/api/bookings/all` | Get all bookings         | Admin   |

### Analytics
| Method | Endpoint                          | Description              | Access |
| ------ | --------------------------------- | ------------------------ | ------ |
| GET    | `/api/analytics/overview`         | Platform overview stats  | Admin  |
| GET    | `/api/analytics/registrations`    | 30-day booking trend     | Admin  |
| GET    | `/api/analytics/categories`       | Revenue by category      | Admin  |
| GET    | `/api/analytics/top-events`       | Top performing events    | Admin  |
| GET    | `/api/analytics/pricing-monitor`  | Live pricing dashboard   | Admin  |

---

## 💰 Dynamic Pricing Model

Ticket prices are calculated dynamically using three multipliers:

```
finalPrice = basePrice × demandMultiplier × timeMultiplier × categoryMultiplier
```

| Factor              | Logic                                                  |
| ------------------- | ------------------------------------------------------ |
| **Demand**          | Increases as seat fill rate rises (1.0x → 1.5x)       |
| **Time**            | Increases as event date approaches (1.0x → 1.3x)      |
| **Category**        | Fixed multiplier per category (e.g., Concert = 1.2x)  |

The platform earns a **2% commission** on every ticket sale.

---

## 🔐 Role-Based Access

| Role       | Capabilities                                              |
| ---------- | --------------------------------------------------------- |
| `attender` | Browse events, book tickets, view personal dashboard      |
| `creator`  | All attender perms + create/manage events, track revenue  |
| `admin`    | Full platform access, analytics, user & event management  |

---

## 🌐 Live Demo

| Service  | URL                                                       |
| -------- | --------------------------------------------------------- |
| Frontend | [prime-planners.vercel.app](https://prime-planners.vercel.app) |
| Backend  | [primeplanners.onrender.com](https://primeplanners.onrender.com) |

---

## 📝 License

This project is for educational and portfolio purposes.

---

<p align="center">
  Built with ❤️ by <strong>PrimePlanners Team</strong>
</p>