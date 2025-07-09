# Oikos Project

[![Backend Tests](https://github.com/oikos-project/oikos-project/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/oikos-project/oikos-project/actions/workflows/backend-tests.yml)
[![Frontend Tests](https://github.com/oikos-project/oikos-project/actions/workflows/frontend-tests.yml/badge.svg)](https://github.com/oikos-project/oikos-project/actions/workflows/frontend-tests.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

Welcome to the Oikos Project! Oikos, meaning "home and family" in ancient Greek, is an open-source personal assistant designed to seamlessly integrate with your digital and physical life. This project aims to provide a multi-tenant solution for managing various aspects of your personal and professional world, from email and calendar integration to home automation.

## Project Overview

The Oikos project is built with a modern tech stack, featuring:
-   **Backend:** Flask (Python) for robust API services and SQLAlchemy for efficient database interactions.
-   **Frontend:** React (TypeScript) with Vite for a fast development experience, and Chakra UI for a beautiful and accessible user interface.

For a detailed understanding of the project's vision and core goals, please refer to the [PROJECT_MANIFEST.md](PROJECT_MANIFEST.md).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
-   Node.js (with npm or Yarn)
-   Python 3.8+
-   Git

### Initial Setup

Before running the project for the first time, or after pulling new changes, install all necessary dependencies for both the backend and frontend.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oikos-project/oikos-project.git
    cd oikos-project
    ```

2.  **Install dependencies:**
    The `yarn bootstrap` command will install Python dependencies for the backend (runtime and development), Node.js dependencies for the frontend, and `concurrently` for the root project.
    ```bash
    yarn bootstrap
    ```

3.  **Install pre-commit hooks:**
    To ensure code quality and consistency, install the pre-commit hooks. These hooks will run automatically before each commit.
    ```bash
    pip install pre-commit
    pre-commit install
    ```

### Database Configuration

The backend uses SQLAlchemy for database interactions. By default, it will use an SQLite database file named `oikos.db` in the `backend/data` directory.

To use a PostgreSQL database (or any other supported by SQLAlchemy), set the `DATABASE_URL` environment variable before starting the application.

Example for PostgreSQL:
```bash
export DATABASE_URL="postgresql://user:password@host:port/dbname"
```

### Running the Project

#### Running the Full Project (Development)

To start both the backend API and the frontend application concurrently for development, run the following command from the project root:

```bash
OIKOS_API_URL=http://localhost:51730 yarn dev
```

This command uses `concurrently` to manage both processes. The `OIKOS_API_URL` environment variable is passed to the frontend to configure its backend connection.

#### Running Individual Components

##### Backend (Python API)

The backend is a Flask application that provides the core API and database interactions.

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  (Optional) Create and activate a Python virtual environment (highly recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  Run the API:
    ```bash
    python run.py
    ```
    The API will typically be available at `http://localhost:51730`.

##### Frontend (TypeScript React Application)

The frontend is a TypeScript React application developed with Vite, using Chakra UI for its component library.

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Run the frontend application:
    ```bash
    yarn dev
    ```
    The frontend will typically be available at `http://localhost:5173` (Vite's default port).

### Testing

#### Running Backend Tests

To execute the backend tests, run the following command from the project root directory:

```bash
PYTHONPATH=. pytest backend/tests
```

This command ensures that the `backend` module is correctly found by `pytest` and runs all tests located in the `backend/tests` directory.

### Authentication Routes (Frontend)

After starting the frontend, you can access the following authentication routes:
*   **Home:** `http://localhost:5173/` (with links to Register/Login)
*   **Register:** `http://localhost:5173/register`
*   **Login:** `http://localhost:5173/login`

## Contributing

We welcome contributions to the Oikos Project! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure tests pass.
4.  Commit your changes with a clear and concise message.
5.  Push your branch to your fork.
6.  Open a pull request to the `main` branch of the original repository.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.