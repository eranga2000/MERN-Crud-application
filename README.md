# Project Setup Guide

## Project Overview

This is a full-stack application with a React-based client and a Node.js/Express server.
- The `client` directory contains the frontend code.
- The `server` directory contains the backend code.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (which includes npm).
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/try/download/community) or ensure you have access to a MongoDB instance (e.g., a cloud-hosted MongoDB Atlas cluster).

## Server-Side Setup

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory. This file will store your environment-specific configurations. Add the following variables, replacing the placeholder values with your actual configuration:
    ```env
    PORT=3001 # Or any port you prefer for the server
    MONGODB_URI=include your link here # Your MongoDB connection string
    # Add any other environment variables your server might need
    ```
    *Note: Ensure the `.env` file is listed in your `server/.gitignore` file to prevent committing sensitive information.*

4.  **Run the server:**
    *   **Development mode (with hot-reloading using nodemon):**
        ```bash
        npm run dev
        ```
    *   **Production mode:**
        ```bash
        npm start
        ```
    The server should now be running (e.g., at `http://localhost:3001` if you used port 3001).

## Client-Side Setup

1.  **Navigate to the client directory:**
    Open a new terminal or navigate from the root directory:
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the client development server:**
    ```bash
    npm run dev
    ```
    This will typically start the development server, and you can view the application in your browser (e.g., at `http://localhost:5173` or another port specified by Vite).

4.  **Build for production:**
    To create a production build of the client application:
    ```bash
    npm run build
    ```
    The production-ready files will be placed in the `client/dist` directory (or as configured in `vite.config.js`).

## Available Scripts

This section lists the primary scripts available in the `package.json` files for both the server and client.

### Server (`server/package.json`)

-   `npm start`: Starts the server in production mode using `node server.js`.
-   `npm run dev`: Starts the server in development mode using `nodemon server.js`, which automatically restarts the server on file changes.
-   `npm test`: (Currently prints an error message and exits) Placeholder for future test scripts.

### Client (`client/package.json`)

-   `npm run dev`: Starts the Vite development server for the React application.
-   `npm run build`: Builds the client application for production.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run preview`: Serves the production build locally for preview.

## Project Structure

```
.
├── client/         # Contains the React frontend application
│   ├── public/     # Static assets for the client
│   ├── src/        # Client-side source code (components, pages, etc.)
│   ├── package.json  # Client dependencies and scripts
│   └── ...         # Other client configuration files (vite.config.js, etc.)
│
├── server/         # Contains the Node.js/Express backend application
│   ├── Routes/     # API route definitions
│   ├── models/     # Mongoose data models
│   ├── package.json  # Server dependencies and scripts
│   ├── server.js   # Main server entry point
│   └── ...         # Other server files (.env.example, etc.)
│
└── README.md       # This setup guide
```
