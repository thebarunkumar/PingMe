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

- **Frontend:** React 18, Vite 5, React Router, Zustand, Tailwind + DaisyUI, axios, react-hot-toast, lucide-react
- **Backend:** Node 18+, Express, Socket.IO, MongoDB (Mongoose), JWT, bcryptjs, Cloudinary

---

## Local Setup

### 1. Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Cloudinary account (for image uploads)

### 2. Backend
```bash
cd server
```
Create `.env` with (example values shown):

```
PORT=3000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_LONG_SECRET
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
```

Then install and run:
```bash
npm ci
npm run dev
```

### 3. Frontend
```bash
cd client
```
Create `.env.local` for dev:
```
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Then install and run:
```bash
npm ci
npm run dev
```

App will run at: [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

### Backend (`server/.env`)
- `PORT` (default 3000)
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `CLIENT_URL` — Comma-separated list of allowed URLs  
  Example:  
  ```
  https://your-frontend-domain.com,http://localhost:5173
  ```

Optional:
- `CLIENT_URL` — Single allowed URL if not using multiple.

### Frontend (`client/.env`)
- `VITE_API_URL` — Full API base with `/api`, e.g. `https://your-backend-domain.com/api`
- `VITE_SOCKET_URL` — Socket URL without `/api`, e.g. `https://your-backend-domain.com`

**Defaults (if not set)**  
- Dev: axios → `http://localhost:3000/api`, socket → `http://localhost:3000`
- Prod: axios → `/api`, socket → `/` (works when frontend and backend share the same domain)

---

## Scripts

### Frontend (`client`)
- `npm run dev` — Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally

### Backend (`server`)
- `npm run dev` — Start with nodemon
- `npm start` — Start with node

---

## Deployment

You can deploy the backend to any WebSocket-friendly host such as **Render**, **Railway**, **Fly.io**, or your own **VPS**.

### Backend Deployment
1. Deploy the `server` folder.
2. Set environment variables:
   ```
   PORT=3000
   MONGODB_URI=your_connection_string
   JWT_SECRET=your_secret
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   CLIENT_URL=https://your-frontend-domain.com
   ```
3. Ensure your host allows:
   - WebSocket connections
   - CORS from your frontend domain(s)

### Frontend Deployment
1. Deploy the `client` build output (`dist/`) to your chosen static host (e.g., Netlify, GitHub Pages, Firebase Hosting, Cloudflare Pages, etc.).
2. Set frontend environment variables before building:
   ```
   VITE_API_URL=https://your-backend-domain.com/api
   VITE_SOCKET_URL=https://your-backend-domain.com
   ```
3. Build and deploy:
   ```bash
   npm run build
   ```

---

## API Overview (High-Level)

**Base:** `/api`

**Auth**
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/check` (protected)
- `PUT /auth/update-profile` (protected)

**Messages**
- Routes under `/messages` (protected)

**Socket.IO**
- Path: `/socket.io`
- Query: `?userId=<id>`
- Event: `getOnlineUsers`

---
 
## Troubleshooting

- **401/403 in production:**  
  Ensure `CLIENT_URL` or `CLIENT_URL` includes your deployed frontend URL.

- **Socket not connecting:**  
  Make sure `VITE_SOCKET_URL` is set correctly, and backend CORS allows your frontend domain.

- **404 for `/api` routes:**  
  Confirm `VITE_API_URL` points to your backend API base.

---

## License

This project is provided as-is for learning and demo purposes.
