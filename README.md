# 📝 TODO API

A simple REST API built with raw Node.js for managing todo items.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```
   PORT=5000
   ```

3. **Start the server**
   ```bash
   node index.js
   ```

4. **Server runs on**: `http://localhost:5000`

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/todos` | Get all todos |
| `GET` | `/api/todos/:id` | Get single todo |
| `POST` | `/api/create-todo` | Create new todo |
| `PUT` | `/api/update-todo/:id` | Update todo |
| `DELETE` | `/api/delete-todo/:id` | Delete todo |

## 🧪 Example Usage

### Create Todo
```bash
POST /api/create-todo
{
  "title": "Learn Node.js",
  "completed": false
}
```

### Update Todo
```bash
PUT /api/update-todo/1234567890
{
  "completed": true
}
```

## 📦 Tech Stack

- **Node.js** - Runtime
- **HTTP Module** - Server
- **URL Module** - Routing
- **dotenv** - Environment variables

## 📁 Project Structure

```
├── index.js          # Main server file
├── package.json      # Dependencies
├── .env              # Environment variables
└── README.md         # This file
```

## 🎯 Features

- ✅ Create todos
- ✅ Read all/single todos  
- ✅ Update todos
- ✅ Delete todos
- ✅ Error handling
- ✅ JSON responses

---

*Built with ❤️ using raw Node.js* 