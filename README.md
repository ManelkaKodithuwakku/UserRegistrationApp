# Todo App

A simple User Registration application using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system allows users to register, login, and view their profiles. JWT (JSON Web Tokens) are used to maintain user authentication.

## Setting up the Project and MongoDB

1. **Clone the project:**

   ```bash
   git clone https://github.com/ManelkaKodithuwakku/UserRegistrationApp.git
   ```

2. Add a `.env` file with the following required fields to set up MongoDB:

   ```env
   DB_URI=mongodb://127.0.0.1:27017/userDB
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

## Install Dependencies

Dependencies are installed by default when the application is generated. If changes are made to `package.json`, install the dependencies with:

```bash
npm install
```

## Running the Application

```bash
npm start
```