# oikos-project

This is the beginning of the oikos-project. More details to follow.

## How to Run the Project

### Initial Setup

Before running the project for the first time, or after pulling new changes, install all necessary dependencies for both the backend and frontend by running the following command from the project root:

```bash
yarn bootstrap
```

This command will install Python dependencies for the backend, Node.js dependencies for the frontend, and `concurrently` for the root project.

### Running the Full Project (Development)

To start both the backend API and the frontend application concurrently for development, run the following command from the project root:

```bash
yarn dev
```

This command uses `concurrently` to manage both processes.

### Running Individual Components

#### Backend (Python API)

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
    python main.py
    ```

#### Frontend (TypeScript Application)

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Run the frontend application:
    ```bash
    yarn start
    ```