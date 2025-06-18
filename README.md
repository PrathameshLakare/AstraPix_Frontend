# AstraPix

AstraPix is a full-stack photo album and sharing platform. Create albums, upload and organize images, share albums with friends, and comment or favorite your favorite moments.  
Built with a modern React frontend, Node.js/Express backend, MongoDB, and Google OAuth authentication.

---

## 🚀 Demo

[Live Demo](https://astra-pix-frontend.vercel.app)

---

## Quick Start

```sh
git clone https://github.com/PrathameshLakare/AstraPix_Frontend.git
cd astrapix-frontend
npm install
npm start
```

---

## Technologies

- React JS
- React Router
- Context API / Redux (if used)
- Node.js
- Express
- MongoDB
- JWT & Google OAuth
- Cloudinary (for image storage)
- Bootstrap / Tailwind CSS

---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:  
[Loom Video Link](https://www.youtube.com/watch?v=0vCQZDOyhOo)

## Features

### Albums & Images

- Create, edit, and delete photo albums
- Upload images to albums (with tags, person, and size info)
- View and search images by tags
- Mark images as favorite
- Add and view comments on images
- Delete images

### Sharing

- Share albums with other users by email
- View albums shared with you

### User & Authentication

- Google OAuth login
- View and update your profile
- Secure JWT-based authentication

---

## 📚 API Endpoints

### Authentication

- `GET /auth/google`  
  Redirects to Google OAuth login.

- `GET /auth/google/callback`  
  Handles Google OAuth callback and sets JWT cookie.  
  **Sample Response:**

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "60f1b2c3d4e5f6a7b8c9d0e1",
      "email": "john@example.com",
      "name": "John Doe",
      "profilePic": "https://cloudinary.com/profile.jpg"
    }
  }
  ```

- `POST /logout`  
  Logs out the user by clearing the JWT cookie.  
  **Sample Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### User

- `GET /user/profile/google`  
  Returns the authenticated user's profile.  
  **Sample Response:**
  ```json
  {
    "_id": "60f1b2c3d4e5f6a7b8c9d0e1",
    "email": "john@example.com",
    "name": "John Doe",
    "profilePic": "https://cloudinary.com/profile.jpg"
  }
  ```

### Albums

- `POST /albums`  
  Create a new album.  
  **Sample Request:**

  ```json
  {
    "name": "Vacation 2025",
    "description": "Trip to the mountains"
  }
  ```

  **Sample Response:**

  ```json
  {
    "_id": "70f1b2c3d4e5f6a7b8c9d0e1",
    "name": "Vacation 2025",
    "description": "Trip to the mountains",
    "owner": "60f1b2c3d4e5f6a7b8c9d0e1",
    "sharedWith": [],
    "createdAt": "2025-06-16T12:00:00.000Z"
  }
  ```

- `GET /albums`  
  List albums owned by the authenticated user.  
  **Sample Response:**

  ```json
  [
    {
      "_id": "70f1b2c3d4e5f6a7b8c9d0e1",
      "name": "Vacation 2025",
      "description": "Trip to the mountains"
    }
  ]
  ```

- `GET /albums/shared`  
  List albums shared with the authenticated user.  
  **Sample Response:**

  ```json
  [
    {
      "_id": "80f1b2c3d4e5f6a7b8c9d0e2",
      "name": "Family",
      "description": "Family photos",
      "owner": {
        "_id": "60f1b2c3d4e5f6a7b8c9d0e2",
        "name": "Jane Doe"
      }
    }
  ]
  ```

- `PUT /albums/:albumId`  
  Update album details.  
  **Sample Request:**

  ```json
  {
    "name": "Updated Album Name",
    "description": "Updated description"
  }
  ```

  **Sample Response:**

  ```json
  {
    "_id": "70f1b2c3d4e5f6a7b8c9d0e1",
    "name": "Updated Album Name",
    "description": "Updated description"
  }
  ```

- `DELETE /albums/:albumId`  
  Delete an album.  
  **Sample Response:**

  ```json
  {
    "message": "Album deleted successfully"
  }
  ```

- `POST /albums/:albumId/share`  
  Share an album with other users by email.  
  **Sample Request:**

  ```json
  {
    "emails": ["friend@example.com"]
  }
  ```

  **Sample Response:**

  ```json
  {
    "message": "Album shared successfully"
  }
  ```

- `GET /albums/:albumId`  
  Get details of a specific album.  
  **Sample Response:**
  ```json
  {
    "_id": "70f1b2c3d4e5f6a7b8c9d0e1",
    "name": "Vacation 2025",
    "description": "Trip to the mountains",
    "owner": "60f1b2c3d4e5f6a7b8c9d0e1",
    "sharedWith": [],
    "images": []
  }
  ```

### Images

- `POST /albums/:albumId/images`  
  Upload an image to an album.  
  **Sample Response:**

  ```json
  {
    "_id": "90f1b2c3d4e5f6a7b8c9d0e3",
    "album": "70f1b2c3d4e5f6a7b8c9d0e1",
    "url": "https://cloudinary.com/image.jpg",
    "tags": ["mountain", "nature"],
    "person": "John Doe",
    "favorite": false,
    "comments": [],
    "size": 204800,
    "createdAt": "2025-06-16T12:10:00.000Z"
  }
  ```

- `GET /albums/:albumId/images`  
  List images in an album (optionally filter by tags).  
  **Sample Response:**

  ```json
  [
    {
      "_id": "90f1b2c3d4e5f6a7b8c9d0e3",
      "url": "https://cloudinary.com/image.jpg",
      "tags": ["mountain", "nature"],
      "favorite": false
    }
  ]
  ```

- `PUT /albums/:albumId/images/:imageId/favorite`  
  Toggle favorite status for an image.  
  **Sample Response:**

  ```json
  {
    "message": "Image marked as favorite",
    "favorite": true
  }
  ```

- `PUT /albums/:albumId/images/:imageId/comments`  
  Add a comment to an image.  
  **Sample Request:**

  ```json
  {
    "comment": "Beautiful view!"
  }
  ```

  **Sample Response:**

  ```json
  {
    "message": "Comment added",
    "comments": [
      {
        "user": "60f1b2c3d4e5f6a7b8c9d0e1",
        "text": "Beautiful view!",
        "createdAt": "2025-06-16T12:15:00.000Z"
      }
    ]
  }
  ```

- `DELETE /albums/:albumId/images/:imageId`  
  Delete an image from an album.  
  **Sample Response:**
  ```json
  {
    "message": "Image deleted successfully"
  }
  ```

---

## Contact

For bugs or feature requests, please reach out to [your-email@example.com](mailto:your-email@example.com)
