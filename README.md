# CRM Web App

A lightweight CRM-style web application designed for solo business owners to manage clients, projects, assigned workers, payments, and project budgets.

## Features

- User registration and login with JWT authentication
- Manage clients with basic contact information
- Create and update projects with budget tracking
- Assign internal/contract workers to projects
- Record payments made to workers per project
- Project dashboard with budget summary and payment breakdown

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Others**: Axios, dotenv, CORS


## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Add your Mongo URI and JWT secret to .env
npm run dev

Frontend Setup
cd client
npm install
npm run dev

Sample .env file
# server/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm-app
JWT_SECRET=your_jwt_secret_key
