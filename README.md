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

- **Frontend**: React.js , Typescript
- **Backend**: Node.js, Express.js , Typescript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Others**: Axios, dotenv, CORS


## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)

### Backend Setup

```bash
cd ./api
npm install

Sample .env file
# server/.env
JWT_ACCESS_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_secret_key
PORT=3004
MONGODB_URI=mongo-URI(cloud/local)
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=60m
CORS_ALLOWED_ORIGIN=http://localhost:5173
NODE_ENV=development
```
### Frontend Setup
```bash
cd client
npm install
npm run dev
