# StreakFit

StreakFit is a React + Vite fitness app with a Node.js, Express, and MongoDB backend.

## Project Structure

```text
streakfit/
  frontend/
    src/
    public/
    package.json
    vite.config.js
  backend/
    server.js
    package.json
    .env.example
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Backend

```bash
cd backend
npm install
npm run dev
```

The backend API runs at `http://localhost:5000`.

## Environment

Backend environment variables live in `backend/.env`.

```env
MONGO_URI=mongodb://127.0.0.1:27017/streakfit
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Frontend environment variables live in `frontend/.env`.

```env
VITE_API_URL=http://localhost:5000/api
```
