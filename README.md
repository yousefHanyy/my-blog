# My Blog

A full-featured blog application built with React, Vite, and Tailwind CSS. This project includes user authentication and CRUD operations for blog posts, using `json-server` as a mock backend.

## Features

- **User Authentication**: Register and login with secure authentication (handled by `json-server-auth`).
- **Post Management**: View all blog posts, create new posts, and edit existing ones.
- **Responsive Design**: Modern UI built with Tailwind CSS and DaisyUI.
- **Real-time Notifications**: Integrated `react-toastify` for user feedback.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, DaisyUI
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Backend**: JSON Server + JSON Server Auth (Mock API)

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

You need to run both the frontend and the backend simultaneously.

#### 1. Start the Backend (API)
The backend runs on port 5000 and handles authentication.
```bash
npm run backend
```

#### 2. Start the Frontend (Vite)
Open a new terminal and run:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

- `src/components/`: Reusable UI components like Navbar and Footer.
- `src/pages/`: Main application screens (Home, Login, Register, AddPost).
- `db.json`: Local database for posts and users.
