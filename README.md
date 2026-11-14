# Vacations Management System

Full-stack web application for managing and liking vacations, featuring role-based authentication (Guest, User, Admin), Gemini AI travel recommendations, an MCP natural-language database assistant, Admin reports with CSV export, and Docker Compose deployment.

## GitHub Repository
https://github.com/mariab306/vacations-system.git

## Tech Stack
- **Frontend:** React, TypeScript, Vite, React Router, Recharts
- **Backend:** Node.js, Express, TypeScript, JWT, Multer
- **Database:** Neon PostgreSQL
- **AI:** Google Gemini API (`@google/genai`)
- **Deployment:** Docker & Docker Compose

## How to Run with Docker
1. Create a `backend/.env` file with your `DATABASE_URL`, `JWT_SECRET`, and `GEMINI_API_KEY`.
2. Run in the root folder:
   ```bash
   docker compose up -d --build