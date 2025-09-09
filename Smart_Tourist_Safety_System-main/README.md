Smart Tourist Backend

The Smart Tourist Backend is a RESTful API built with Node.js, Express, and MongoDB.
It powers the Smart Tourist application, handling authentication, user management, and data storage.

Features

User authentication (JWT-based)

Secure password hashing with bcryptjs

MongoDB integration with Mongoose

Environment variable management using dotenv

Developer-friendly auto-reload with Nodemon

REST API for future frontend integration

Tech Stack

Node.js (Runtime)

Express.js (Web framework)

MongoDB + Mongoose (Database)

dotenv (Environment variables)

Nodemon (Dev server auto-reload)

Project Structure

smart-tourist-backend/
├── server.js # Entry point
├── package.json # Dependencies and scripts
├── .env # Environment variables (ignored by git)
├── models/ # Mongoose models
├── routes/ # Express routes
├── controllers/ # Route logic
└── middleware/ # Custom middlewares

Installation & Setup

Clone the repo:

git clone https://github.com/ABDULRAHEEM775/smart_tourist_safety_system.git
cd smart-tourist-backend


Install dependencies:

npm install


Set up environment variables:
Create a .env file in the root directory:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key


Run the server:

Development mode (with auto-reload):

npm run dev


Production mode:

npm start

API Endpoints (sample)
Method	Endpoint	Description
GET	/	Test route
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login a user

(Expand this section as you add more routes)

Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

License

This project is licensed under the MIT License – see the LICENSE file for details.

Author

Your Name – GitHub: https://github.com/ABDULRAHEEM775
