# ShopLite

ShopLite is a minimal e-commerce product catalog application built with:
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React (Vite or CRA)
- **Authentication**: JWT-based
- **Containerization**: Docker & Docker Compose

---

## **Features**
- User registration & authentication (JWT)
- CRUD operations for products
- RESTful API built with Express
- Frontend with React components for products
- ESLint for code quality
- Jest & Supertest for backend tests
- Docker-based local setup

---

## **Getting Started**

### **1. Clone the repository**
```bash
git clone https://github.com/Eyiniola/shop-lite.git
cd shop-lite
Local Development (without Docker)
Backend
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in backend/:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoplite
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy
Edit
npm run dev
Frontend
Navigate to the frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend:

bash
Copy
Edit
npm run dev
Docker Setup
Prerequisites
Docker installed

Docker Compose installed

2. Build and Run with Docker Compose
From the root of the project:

bash
Copy
Edit
docker-compose up --build
This will:

Start the backend container

Start the frontend container

Use a MongoDB container as the database

3. Environment Variables for Docker
Create a .env file in the project root (not inside backend or frontend) with:

env
Copy
Edit
MONGO_URI=mongodb://mongo:27017/shoplite
JWT_SECRET=your_jwt_secret
PORT=5000
4. Access the App
Frontend: http://localhost:3000

Backend API: http://localhost:5000/api

MongoDB: localhost:27017 (inside container as mongo)

Docker Commands
Start containers in background:

bash
Copy
Edit
docker-compose up -d
Stop containers:

bash
Copy
Edit
docker-compose down
Rebuild images:

bash
Copy
Edit
docker-compose build --no-cache
Check logs:

bash
Copy
Edit
docker-compose logs -f
Running Tests
Inside the backend container:

bash
Copy
Edit
docker exec -it shoplite-backend npm test
Project Structure
bash
Copy
Edit
shop-lite/
│
├── backend/               # Node.js + Express API
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── tests/             # Jest + Supertest tests
│   ├── server.js          # Backend entry point
│   └── package.json
│
├── frontend/              # React frontend
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── ...
│
├── docker-compose.yml
└── README.md
Future Improvements
Add CI/CD pipeline with GitHub Actions

Integrate Nginx for production builds

Add caching for product list API

Unit tests for React components

Author: Fagbemi Eyiniola