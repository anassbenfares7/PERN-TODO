# PERN Todo Application

A full-stack todo application built with the PERN stack (PostgreSQL, Express, React, Node.js). This project demonstrates a complete CRUD application with a modern backend and responsive frontend.

## 🎯 Features

- ✅ **Create Todos** - Add new todo items with descriptions
- ✅ **Read Todos** - View all todos in a clean table format
- ✅ **Update Todos** - Edit todo descriptions with a modal interface
- ✅ **Delete Todos** - Remove todos with instant UI updates
- ✅ **Real-time Sync** - Automatic page refresh after adding todos
- ✅ **Responsive Design** - Bootstrap-powered responsive UI
- ✅ **Modern Stack** - Vite + React + Express + Prisma

## 🏗️ Tech Stack

### Frontend

- **React 19** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling for rapid development
- **Bootstrap 5** - Responsive CSS framework
- **ESLint** - Code quality and linting

### Backend

- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **Prisma** - Next-generation ORM for Node.js
- **PostgreSQL** - Relational database
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
PERN-TODO/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputTodo.jsx       # Add todo form component
│   │   │   ├── ListTodo.jsx        # Display todos table component
│   │   │   └── EditTodo.jsx        # Edit todo modal component
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   ├── App.css                 # App styles
│   │   └── index.css               # Global styles
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint rules
│   ├── package.json                # Frontend dependencies
│   └── index.html                  # HTML template
│
├── server/                          # Express backend
│   ├── prisma/
│   │   └── schema.prisma           # Prisma ORM schema
│   ├── index.js                    # Express server & API routes
│   ├── db.js                       # Database connection setup
│   ├── database.sql                # SQL schema reference
│   ├── prisma.config.js            # Prisma configuration
│   ├── package.json                # Backend dependencies
│   └── .env                        # Environment variables
│
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** (v12 or higher) - locally installed or running via Docker

### Installation

#### 1. Clone the repository

```bash
cd PERN-TODO
```

#### 2. Install Backend Dependencies

```bash
cd server
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Database Setup

#### 1. Create PostgreSQL Database

```bash
psql -U postgres
CREATE DATABASE perntodo;
\q
```

#### 2. Set Environment Variables

Create a `.env` file in the `server/` directory:

```
DATABASE_URL="postgresql://[username]:[password]@localhost:5432/perntodo"
PORT=5000
```

Replace `[username]` and `[password]` with your PostgreSQL credentials.

#### 3. Run Database Schema

```bash
cd server
psql -U postgres -d perntodo -f database.sql
```

Or use Prisma migrations (if schema.prisma is configured):

```bash
npx prisma migrate dev
```

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will typically run on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd client
npm run build
```

#### Start Backend

```bash
cd server
npm start
```

## 📡 API Documentation

Base URL: `http://localhost:5000`

### Endpoints

#### Create Todo

```http
POST /todos
Content-Type: application/json

{
  "description": "Buy groceries"
}
```

**Response:** `201 Created`

```json
{
  "todo_id": 1,
  "description": "Buy groceries"
}
```

#### Get All Todos

```http
GET /todos
```

**Response:** `200 OK`

```json
[
  {
    "todo_id": 1,
    "description": "Buy groceries"
  },
  {
    "todo_id": 2,
    "description": "Complete project"
  }
]
```

#### Get Single Todo

```http
GET /todos/:id
```

**Response:** `200 OK`

```json
{
  "todo_id": 1,
  "description": "Buy groceries"
}
```

#### Update Todo

```http
PUT /todos/:id
Content-Type: application/json

{
  "description": "Buy groceries and cook dinner"
}
```

**Response:** `200 OK`

```json
"Todo was updated"
```

#### Delete Todo

```http
DELETE /todos/:id
```

**Response:** `200 OK`

```json
"Todo was deleted"
```

## 🎨 Frontend Components

### InputTodo.jsx

Renders the header and input form for adding new todos.

- **Features:** Form submission, description input, validation
- **API Call:** `POST /todos`
- **Styling:** Bootstrap form controls, centered layout

### ListTodo.jsx

Displays all todos in a table with action buttons.

- **Features:** Fetch todos on mount, delete functionality, edit modal integration
- **API Call:** `GET /todos`, `DELETE /todos/:id`
- **State Management:** `useState` hook for todos array
- **Lifecycle:** `useEffect` hook for initial data fetch

### EditTodo.jsx

Modal component for editing existing todo descriptions.

- **Features:** Bootstrap modal, form submission, reset functionality
- **API Call:** `PUT /todos/:id`
- **State Management:** Local description state with reset capability

## 🗄️ Database Schema

### Todo Table

```sql
CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);
```

| Column        | Type         | Constraint  | Description                         |
| ------------- | ------------ | ----------- | ----------------------------------- |
| `todo_id`     | SERIAL       | PRIMARY KEY | Auto-incrementing unique identifier |
| `description` | VARCHAR(255) | NOT NULL    | Todo description text               |

## 🔧 Available Scripts

### Backend

- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon
- `npm test` - Run tests (not yet configured)

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 📝 Development Notes

### Code Style

- Frontend uses React Hooks and functional components
- Backend uses async/await for promise handling
- ESLint configured for code quality

### Error Handling

- Try-catch blocks on all async operations
- Consistent error responses (500 Server Error)
- Browser console logs for debugging

### CORS Configuration

- Enabled for all origins in development
- Backend running on port 5000
- Frontend can make requests to backend API

## 🐛 Troubleshooting

### Database Connection Failed

- Verify PostgreSQL is running
- Check `.env` DATABASE_URL is correct
- Ensure `perntodo` database exists

### Port Already in Use

- Backend: Change `PORT` in `.env` or kill process on 5000
- Frontend: Vite will suggest alternate port

### CORS Errors

- Ensure backend is running on correct port
- Verify frontend API calls use correct base URL

### Todos Not Appearing

- Check browser console for fetch errors
- Verify database has data: `SELECT * FROM todo;`
- Clear browser cache and reload

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Bootstrap 5](https://getbootstrap.com)

## 📄 License

ISC License

## 👤 Author

Created as a full-stack learning project

---

Happy coding! 🚀
