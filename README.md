# oikos-project

This is the beginning of the oikos-project. More details to follow.

## Project Overview

For a detailed understanding of the project's vision and core goals, please refer to the [PROJECT_MANIFEST.md](PROJECT_MANIFEST.md).

## How to Run the Project

### Initial Setup

Before running the project for the first time, or after pulling new changes, install all necessary dependencies for both the backend and frontend by running the following command from the project root:

```bash
yarn bootstrap
```

This command will install Python dependencies for the backend, Node.js dependencies for the frontend, and `concurrently` for the root project.

### Database Configuration

The backend uses SQLAlchemy for database interactions. By default, it will use an SQLite database file named `oikos.db` in the `backend` directory.

To use a PostgreSQL database (or any other supported by SQLAlchemy), set the `DATABASE_URL` environment variable before starting the application.

Example for PostgreSQL:
```bash
export DATABASE_URL="postgresql://user:password@host:port/dbname"
```

### Running the Full Project (Development)

To start both the backend API and the frontend application concurrently for development, run the following command from the project root:

```bash
OIKOS_API_URL=http://localhost:51730 yarn dev
```

This command uses `concurrently` to manage both processes. The `VITE_API_URL` environment variable is passed to the frontend to configure its backend connection.

### Running Individual Components

#### Backend (Python API)

The backend is a Flask application that provides the core API and database interactions.

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  (Optional) Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  Run the API:
    ```bash
    python run.py
    ```
    The API will typically be available at `http://localhost:51730`.

#### Running Backend Tests

To execute the backend tests, run the following command from the project root directory:

```bash
PYTHONPATH=. pytest backend/tests
```

This command ensures that the `backend` module is correctly found by `pytest` and runs all tests located in the `backend/tests` directory.

#### Frontend (TypeScript React Application)

The frontend is a TypeScript React application developed with Vite, using Chakra UI for its component library.

##### Chakra UI Setup

The application is wrapped with `ChakraProvider` in `frontend/src/main.tsx` to enable Chakra UI's styling and theming capabilities.

##### Authentication Routes

After starting the frontend, you can access the following authentication routes:
*   **Home:** `http://localhost:5173/` (with links to Register/Login)
*   **Register:** `http://localhost:5173/register`
*   **Login:** `http://localhost:5173/login`

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Run the frontend application:
    ```bash
    yarn dev
    ```
    The frontend will typically be available at `http://localhost:5173` (Vite's default port).
