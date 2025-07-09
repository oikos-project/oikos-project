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
yarn dev
```

This command uses `concurrently` to manage both processes.

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
    The API will typically be available at `http://localhost:5000`.

#### Frontend (TypeScript Application)

The frontend is a TypeScript application served by `http-server` for development.

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Run the frontend application:
    ```bash
    yarn start
    ```
    The frontend will typically be available at `http://localhost:3000` (or another port if configured in `frontend/package.json`).
