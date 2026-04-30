# SpecNest

SpecNest is a modern, full-stack e-commerce platform for selling computer hardware and components. It provides a seamless shopping experience for customers and a robust backend for managing products, orders, and users.

## Features

*   **Product Catalog:** Browse a wide range of computer components with detailed specifications.
*   **Search and Filtering:** Easily find products with powerful search and filtering options.
*   **User Accounts:** Create accounts, manage personal information, and track order history.
*   **Shopping Cart:** Add products to a cart and proceed to a smooth checkout process.
*   **Secure Authentication:** User authentication and password hashing using bcrypt.

## Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
*   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [npm](https://www.npmjs.com/)
*   [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/specnest.git
    cd specnest
    ```

2.  Install the dependencies for both the frontend and backend:
    ```bash
    npm install
    ```

3.  Set up your environment variables. Create a `.env` file in the root of the project and add the following:
    ```
    DB_USER=your_postgres_user
    DB_HOST=localhost
    DB_DATABASE=specnest
    DB_PASSWORD=your_postgres_password
    DB_PORT=5432
    ```

### Database Setup

1.  Make sure your PostgreSQL server is running.
2.  Create a new database named `specnest`.
3.  Run the database setup script to create the necessary tables:
    ```bash
    npm run db:setup
    ```

### Running the Application

You can run the frontend and backend servers concurrently in separate terminals.

1.  **Start the backend server:**
    ```bash
    npm run backend
    ```
    The backend server will start on `http://localhost:3001`.

2.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

## API Endpoints

The backend API is served from `/api`. Here are some of the main endpoints:

*   `GET /api/products`: Get a list of all products.
*   `GET /api/products/:id`: Get a single product by ID.
*   `POST /api/register`: Register a new user.
*   `POST /api/login`: Log in a user.

For a full list of API endpoints and their specifications, please refer to the backend source code.

## Deployment

SpecNest is deployed and live on the following platforms:

*   **Frontend (Next.js):** Deployed on [Vercel](https://vercel.com/).
    *   **Live Demo:** [https://specnest.vercel.app](https://specnest.vercel.app)
*   **Backend (Express.js):** Deployed on [Railway](https://railway.app/).
    *   **API URL:** [https://specnest-api.up.railway.app](https://specnest-api.up.railway.app)
*   **Database (PostgreSQL):** Hosted on [Neon](https://neon.tech/).

This setup provides a scalable and reliable architecture for the SpecNest platform.
