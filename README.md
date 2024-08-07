# Rhesa's App

## Overview

This project is a web application built with React, Express, and PostgreSQL, using Prisma as an ORM for database management. The application provides functionality for user authentication, database management, and a responsive user interface.

## Technologies Used

- **Backend**: Express, Prisma, PostgreSQL
- **Frontend**: React
- **Database**: PostgreSQL
- **ORM**: Prisma

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL database setup
- Prisma CLI installed

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Navigate to the `backend` directory and install dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Setup environment variables:**

    Create a `.env` file in the `backend` directory with the following content:

    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    FACEBOOK_APP_ID=your_facebook_app_id
    FACEBOOK_APP_SECRET=your_facebook_app_secret
    PORT=5000
    ```

4. **Initialize Prisma and create the database schema:**

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Start the backend server:**

    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the `frontend` directory and install dependencies:**

    ```bash
    cd frontend
    npm install
    ```

2. **Setup environment variables:**

    Create a `.env` file in the `frontend` directory with the following content:

    ```env
    VITE_BASE_API=http://localhost:5000
    ```

3. **Start the React development server:**

    ```bash
    npm run dev
    ```

## API Endpoints

### Authentication

- **POST /auth/register**
  - Registers a new user.
  - Request Body: `{ "username": "string", "email": "string", "password": "string", "confirmPassword": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /auth/login**
  - Authenticates a user and provides a JWT token.
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`

- **GET /auth/google**
  - Redirects to Google OAuth for authentication.

- **GET /auth/facebook**
  - Redirects to Facebook OAuth for authentication.

### User Management

- **GET /users**
  - Retrieves a list of users.
  - Response: `[ { "id": "uuid", "email": "string", "createdAt": "date", "loginCount": "number", "lastLogoutAt": "date" } ]`

## Database Schema

### `User`

- **id**: UUID (Primary Key)
- **email**: String (Unique)
- **username**: String
- **passwordHash**: String
- **loginCount**: Integer
- **googleId**: String (Optional)
- **facebookId**: String (Optional)
- **authType**: String (Comma-separated list)
- **createdAt**: DateTime
- **updatedAt**: DateTime
- **lastLogoutAt**: DateTime (Optional)

## Frontend Components

- **Register**: Form for user registration.
- **Login**: Form for user login.
- **AuthenticatedLayout**: Layout component with sidebar and header for authenticated users.
- **UserList**: Displays a list of users.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact [your-email@example.com](mailto:rhesadav48@gmail.com).

