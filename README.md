# PingMe

Real-time chat application built with React (Vite) on the frontend and Node.js/Express + Socket.IO + MongoDB on the backend. Supports authentication, profile updates (Cloudinary), online users presence, and real-time messaging.

## Features

- Authentication with JWT (HTTP-only cookies)
- Real-time messaging via Socket.IO
- Online users presence
- Profile picture upload (Cloudinary)
- React Router navigation
- Global state with Zustand
- TailwindCSS + DaisyUI styling

## Monorepo Structure

- `client` — React + Vite app
- `server` — Node/Express + Socket.IO + MongoDB + Cloudinary

```
PingMe/
├─ client/
│  ├─ src/
│  ├─ public/
│  ├─ package.json
│  └─ vite.config.js
├─ server/
│  ├─ src/
│  │  ├─ config/ (database, socket, cloudinary, utils)
│  │  ├─ controllers/ (auth, message)
│  │  ├─ routes/ (auth.route, message.route)
│  │  ├─ models/ (User, Message)
│  │  └─ index.js
│  └─ package.json
└─ .gitignore
```

## Tech Stack

- Frontend: React 18, Vite 5, React Router, Zustand, Tailwind + DaisyUI, axios, react-hot-toast, lucide-react
- Backend: Node 18+, Express, Socket.IO, MongoDB (Mongoose), JWT, bcryptjs, Cloudinary

## Local Setup

1) Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Cloudinary account (for image uploads)

2) Backend
- cd `server`
- Create `.env` with (example values shown):
  - `PORT=5001`
  - `MONGODB_URI=YOUR_MONGODB_URI`
  - `JWT_SECRET=YOUR_LONG_SECRET`
  - `CLOUDINARY_CLOUD_NAME=...`
  - `CLOUDINARY_API_KEY=...`
  - `CLOUDINARY_API_SECRET=...`
  - `CLIENT_ORIGIN=http://localhost:5173`
  - Optional convenience aliases:
    - `SERVER_URL=http://localhost:3000`
    - `CLIENT_URL=http://localhost:5173`
- Install and run:
  - `npm ci`
  - `npm run dev`

3) Frontend
- cd `client`
- Optional `.env.local` for dev:
  - `VITE_API_URL=http://localhost:3000/api`
  - `VITE_SOCKET_URL=http://localhost:3000`
- Install and run:
  - `npm ci`
  - `npm run dev`
- App: http://localhost:5173

## Environment Variables

Backend (`server/.env`)
- `PORT` (default 3000)
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `CLIENT_ORIGIN` — Comma-separated list of allowed origins
  - Example: `https://your-app.vercel.app,http://localhost:5173`
- Optional:
  - `CLIENT_URL` — Single allowed origin if not using `CLIENT_ORIGIN`

Frontend (`client` env / Vercel Project Env)
- `VITE_API_URL` — Full API base with `/api`, e.g. `https://api.example.com/api`
- `VITE_SOCKET_URL` — Socket origin without `/api`, e.g. `https://api.example.com`

Defaults (if not set)
- Dev: axios -> `http://localhost:5001/api`, socket -> `http://localhost:5001`
- Prod: axios -> `/api`, socket -> `/` (works if you configure Vercel rewrites)

## Scripts

Frontend (client)
- `npm run dev` — Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview build locally

Backend (server)
- `npm run dev` — Start with nodemon
- `npm start` — Start with node

## Deployment

GitHub
- `.env` files are ignored (see `.gitignore`). Do not commit secrets.
- Push the repo to GitHub.

Frontend on Vercel
- Create a new Vercel project, set Project Root to `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node: 18.x or LTS

Options for backend URL
- Env-based (recommended):
  - Set in Vercel:
    - `VITE_API_URL=https://YOUR_BACKEND_HOST/api`
    - `VITE_SOCKET_URL=https://YOUR_BACKEND_HOST`
- Rewrite-based:
  - `client/vercel.json` is included to proxy `/api` and `/socket.io` to your backend host. Update it with your production backend origin when ready.

Backend Hosting
- Deploy to a WebSocket-friendly host (Render, Railway, Fly, VPS)
- Set envs: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `CLIENT_ORIGIN=your Vercel URL(s)`
- Ensure CORS and Socket.IO CORS include your Vercel origin(s)

Note on Vercel serverless
- Vercel’s serverless functions are not ideal for Socket.IO persistent connections. Prefer a dedicated host for the Node server.

## API Overview (high-level)

Base: `/api`

Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/check` (protected)
- `PUT /auth/update-profile` (protected)

Messages
- Endpoints under `/messages` (protected)

Socket.IO
- Path: `/socket.io`
- Query: `?userId=<id>`
- Event: `getOnlineUsers`

## Troubleshooting

- 401/403 in production
  - Ensure `CLIENT_ORIGIN` includes your exact Vercel URL
  - Cookies require https and `secure: true` in production
- Socket not connecting
  - Set `VITE_SOCKET_URL` or add `/socket.io` rewrites
  - Backend must allow WebSocket upgrades and CORS from the client
- 404 for `/api`
  - Set `VITE_API_URL` or configure the rewrites above

## License

This project is provided as-is for learning and demo purposes.
