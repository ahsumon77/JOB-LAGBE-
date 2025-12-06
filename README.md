# Job Portal ( InsiderJobs )

A full-stack job portal application with a React + Vite client and an Express/MongoDB server. Supports job listings, applications, recruiter management, and file uploads (Cloudinary).

**Table of contents**
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Installation & Running](#local-installation--running)
- [Available Scripts](#available-scripts)
- [API Endpoints (overview)](#api-endpoints-overview)
- [Authentication](#authentication)
- [File Uploads & Cloudinary](#file-uploads--cloudinary)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

**Project Overview**

This repository contains a job portal web application. The client is a React app bootstrapped with Vite and uses Tailwind for styling. The server is an Express.js API that uses MongoDB for persistence. Recruiters can post jobs and manage applications; applicants can browse jobs and apply.

**Features**
- Job listing and search
- Job creation and management (Recruiter)
- Apply to jobs with file upload (resume)
- Recruiter dashboard to view/manage applications
- User authentication (JWT)
- Cloudinary integration for file/media uploads

**Tech Stack**
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (via mongoose)
- File storage: Cloudinary
- Authentication: JSON Web Tokens (JWT)

**Repository Structure**

- `client/` — React frontend (Vite) with Tailwind; main source in `client/src`
  - `src/components` — UI components (Navbar, JobCard, JobListing, etc.)
  - `src/pages` — page views (Home, Dashboard, AddJob, ApplyJob, etc.)
  - `index.html`, `vite.config.*`, and Tailwind config present
- `server/` — Express API server
  - `server.js` — server entry
  - `config/` — configuration helpers (`db.js`, `cloudinary.js`, `multer.js`, `instrument.js`)
  - `controllers/` — route handlers (`jobController.js`, `companyController.js`, `userController.js`, `webhooks.js`)
  - `routes/` — Express routers (`jobRoutes.js`, `companyRoutes.js`, `userRoutes.js`)
  - `models/` — Mongoose models (`Job.js`, `Company.js`, `User.js`, `JobApplication.js`)
  - `middleware/` — middleware (e.g., `authMiddleware.js`)
  - `utils/` — helper utilities (`generateToken.js`)

---

**Prerequisites**

- Node.js (recommended v18+)
- npm (or yarn)
- MongoDB instance (local or cloud)
- Cloudinary account (for file uploads) — optional for development but required for uploading candidate resumes or images

**Environment Variables**

Create a `.env` file in the `server/` folder (and configure the host environment for production). The server expects at least the following variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `PORT` — server port (default 5000)
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret

Example `.env` (server/.env):

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/job_portal?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Notes:
- If you don't configure Cloudinary, file-upload features will fail — you can stub or skip upload-related flows for local testing.

---

**Local Installation & Running**

Open two terminals (one for client, one for server) and run the following on Windows `cmd.exe`:

1) Install dependencies for both parts:

```cmd
cd client
npm install

cd ..\server
npm install
```

2) Start the development servers

Frontend (client):

```cmd
cd client
npm run dev
```

Backend (server):

```cmd
cd server
npm run dev
```

Notes about scripts: If `dev` is not present in a `package.json`, use `npm start`, or inspect each `package.json` to confirm available scripts.

---

**Available Scripts (common examples)**

- Root: (may not exist — repository contains separate client and server packages)
- `cd client && npm run dev` — start Vite dev server
- `cd client && npm run build` — build production client bundle
- `cd client && npm run preview` — preview production build
- `cd server && npm run dev` — start server with nodemon (development)
- `cd server && npm start` — start production server

Check `client/package.json` and `server/package.json` to confirm script names.

---

**API Endpoints (overview)**

The server exposes REST endpoints under `/api/*`. The exact routes are implemented in `server/routes/*.js`. Typical endpoints (adjust to match server code):

- `POST /api/users/register` — register new user (applicant or recruiter)
- `POST /api/users/login` — authenticate and receive JWT
- `GET /api/users/profile` — get current user profile (protected)

- `GET /api/jobs` — list jobs (supports query params for search/filter)
- `GET /api/jobs/:id` — get job details
- `POST /api/jobs` — create a job (recruiter only, protected)


- `POST /api/jobs/:id/apply` — apply to a job (file upload supported)

- `GET /api/companies` — list companies
- `POST /api/companies` — add a company

- `POST /api/webhooks` — webhook receiver (see `webhooks.js`)

To inspect exact route paths and expected request bodies, open `server/routes/*.js` and the corresponding controllers in `server/controllers`.

---

**Authentication**

This app uses JWT for authentication. After successful login, the server returns a token (commonly in JSON response). Include the token in requests to protected endpoints using the `Authorization` header:

```
Authorization: Bearer <token>
```

The middleware `server/middleware/authMiddleware.js` protects routes and injects user data into requests.

---

**File Uploads & Cloudinary**

The server contains Cloudinary configuration in `server/config/cloudinary.js` and Multer integration in `server/config/multer.js`. Uploaded files (resumes, images) are expected to be uploaded to Cloudinary. Ensure Cloudinary env vars are set.

If you want to skip Cloudinary during development, you can stub the upload logic in the controller or set conditional logic to store uploads locally.

---

**Testing**

This repo doesn't include a test suite by default (check for `test` scripts in both `package.json` files). To add tests, consider using Jest for backend and React Testing Library for frontend.

---

**Deployment**

General guidance:

- Client: build static assets with `cd client && npm run build` and serve them via a static host (Netlify, Vercel, S3 + CloudFront) or through the server's static middleware.
- Server: deploy to a Node host (Heroku, Render, DigitalOcean App Platform) or as serverless functions (Vercel). Ensure `MONGO_URI` and Cloudinary env vars are present in your deployment environment.

Example: Deploying server to Heroku or Render

1. Push server code to a remote repository
2. Set environment variables in your host control panel
3. Use `npm start` as the production start command (make sure `server/package.json` has a `start` script that runs `node server.js` or similar)

Vercel: There's a `server/vercel.json` file which suggests some Vercel configuration. Deploying a full-stack app on Vercel can be done by deploying the `client` as a static site and the `server` as serverless functions, or by deploying the server separately.

---

**Contributing**

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/short-description`
3. Implement changes and add tests where applicable
4. Commit changes and open a Pull Request

Style notes:
- Keep components small and focused
- Reuse existing utilities and styling patterns
- Add comments and update README when adding public-facing features

---

**Troubleshooting**

- If the frontend cannot reach the API, check that the backend is running and the client is configured to call the correct API base URL (look in `client/src` or environment files used by the client)
- If file uploads fail, double-check Cloudinary credentials and network access
- If DB connection fails, verify `MONGO_URI` and network/firewall settings for your MongoDB instance

---

**License & Contact**

Include your license here (MIT, Apache-2.0, etc.). If you don't have one, add a `LICENSE` file to the repo.

Maintainer: mamun2021331086 && ahsumon77

If you'd like, I can:
- Run a quick repo scan to extract exact `package.json` scripts and populate the README with exact commands
- Add a `.env.example` in `server/` with the env var names shown above

---

Thank you — let me know if you want the README expanded with exact script names (I'll read `client/package.json` and `server/package.json`), or to add a `.env.example` file.

