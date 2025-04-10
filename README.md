# JWT Auth API with Node.js, Express & MongoDB

This is a simple user authentication system built with **Node.js**, **Express**, **MongoDB**, and **JWT (JSON Web Token)**. It allows users to register, login, and access a protected route (user profile) after authentication.

## Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment variables
- password-validator for secure password rules

## Installation

1. **Clone the repo**
  - git clone https://github.com/samarthb05/UserLogin.git
    
2. **Install dependencies**
   - npm install
  
3. **Create a .env file**
   - MONGO_URL=
   - JWT_SECRET=

4. **Run the server**
   - node index.js

## How it Works

- Passwords are hashed using bcrypt before saving.

- On login, a JWT token is issued and returned.

- Protected routes validate the token using middleware.

- The token is valid for 2 hours.

## Dependencies
- express
- mongoose
- jsonwebtoken
- bcrypt
- dotenv
- password-validator




**Thank you!**






