# Ebpearls Blogsite Assignment

Welcome to the Ebpearls Blogsite Assignment! This is a simple Node.js/Express backend for a blog platform, featuring user authentication, post management, and search functionality.

## Project Structure

```
src/
  app.js            # Main Express app setup
  server.js         # Server entry point
  config/db.js      # Database connection
  controllers/      # Business logic for each feature
    auth.controller.js
    post.controller.js
    search.controller.js
    user.controller.js
  middleware/       # Custom Express middlewares
    auth.middleware.js
    errorHandler.js
  models/           # Mongoose models
    post.model.js
    user.model.js
  routes/           # API route definitions
    auth.route.js
    post.route.js
    search.route.js
    user.route.js
  utils/            # Utility functions
    ApiError.js
    jwtHelper.js
```

## Controllers

- **auth.controller.js**: Handles user registration, login, and authentication logic.
- **post.controller.js**: Manages blog post creation, editing, deletion, and retrieval.
- **search.controller.js**: Provides search functionality for posts and users.
- **user.controller.js**: Manages user profile and related operations.

## Routes

- **auth.route.js**: `/api/auth` endpoints for login, signup, etc.
- **post.route.js**: `/api/posts` endpoints for creating, updating, deleting, and fetching posts.
- **search.route.js**: `/api/search` endpoints for searching posts and users.
- **user.route.js**: `/api/users` endpoints for user profile management.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure database in `src/config/db.js`.
3. Start the server:
   ```bash
   npm run dev
   ```

## Features

- User authentication (JWT)
- CRUD operations for blog posts
- Search functionality
- Error handling middleware

## Environment Variables (.env)

Create a `.env` file in the project root to store sensitive configuration values. Example variables:

```
PORT=8000                                  # Port number for the server
MONGODB_URI=your_mongo_connection_string   # MongoDB connection string
JWT_SECRET=your_jwt_secret                 # Secret key for JWT authentication
```

## Postman Collection

To make API testing easier, a Postman collection is provided (if not, you can easily create one by importing your API endpoints).

**How to use:**

1. Open Postman and click on "Import".
2. Select the provided Postman collection file (usually named `EbpearlsBlogsite.postman_collection.json` or similar).
3. Use the collection to test authentication, post management, user, and search endpoints.
4. Make sure to set your environment variables (like `JWT_TOKEN`) in Postman for authenticated requests.
