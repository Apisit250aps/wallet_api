# WALLET API

## API Documentation

### Overview

This API provides endpoints for user registration and login. It supports JSON requests and responses.

### Base URL

```bash
http://localhost:3000/
```

#### Auth API

**User Registration**

**POST `/auth/register`**

Register a new user.

**Request**

- **Headers**:

  - `Content-Type: application/json`
- **Body**:

  ```json
  {
      "username": "string",
      "password": "string"
  }
  ```

**Response**

- **Success (201 Created):**

```json
{
  "newUser": {
    "username": "string",
    "password": "string"
  }
}
```

- **Error (409 Conflict):**

```json
{
  "error": "Username already exists"
}
```

- **Error (500 Internal Server Error):**

```json
{
  "error": "Server error message"
}
```

**Example Request**

```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "password": "password123"}'
```

**User Login**

**POST `/auth/login`**

Authenticate a user and obtain a JWT token.

**Request**

- **Headers**:
  - `Content-Type: application/json`
  
- **Body:**
    ```json
    {
    "username": "string",
    "password": "string"
    }
    ```
**Response**
- **Success (200 OK):**
    ```json
    {
    "token": "jwt-token-string"
    }
    ```

- **Error (401 Unauthorized):**
    ```json
    {
    "error": "Invalid username or password"
    }
    ```
- **Error (500 Internal Server Error):**
    ```json
    {
    "error": "Server error message"
    }
    ```

**Example Request**
```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"username": "existinguser", "password": "password123"}'
```


**Set Profile Name**

**PUT `/user/set/profile`**

Update the user's profile name.

**Request**
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body:**
    ```json
    {
        "fname": "string",
        "lname": "string"
    }
    ```
    ***Note:** The Authorization header must include a valid JWT token.*

**Response**


- **Success (200 OK):**
    ```json
    {
    "message": "Profile name updated successfully",
    "user": {
        "_id": "user-id",
        "fname": "string",
        "lname": "string",
        "username": "string",
        "password": "hashed-password"
    }
    }
    ```
- **Error (400 Bad Request):**
    ```json
    {
        "error": "User ID is required"
    }
    ```

- **Error (404 Not Found):**
    ```json
    {
    "error": "User not found"
    }
    ```

- **Error (500 Internal Server Error):**
    ```json
    {
        "error": "An error occurred while updating the profile name"
    }
    ```

**Example Request**
```bash
curl -X PUT http://localhost:3000/user/set/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"fname": "John", "lname": "Doe"}'
```