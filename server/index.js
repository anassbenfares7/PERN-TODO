const express = require("express");
const app = express();
const cors = require("cors");
const prisma = require("./db");

//middlewares
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// //create a todo
// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *",
//       [description]
//     );
//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// //get all todos
// app.get("/todos", async (req, res) => {
//   try {
//     const allTodos = await pool.query("SELECT * FROM todo");
//     res.json(allTodos.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// //get a todo 
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// //update a todo 
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updatedTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
//       [description, id]
//     );
//     res.json("Todo was updated");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// //delete a todo 
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id]);
//     res.json("Todo was deleted");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });



// ROUTES PRISMA //

// 1. Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    
    // PRISMA: Replaces INSERT INTO
    const newTodo = await prisma.todo.create({
      data: { description }
    });
    
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 2. Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await prisma.todo.findMany();
    
    res.json(allTodos); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 3. Get a specific todo 
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await prisma.todo.findUnique({
      where: { todo_id: parseInt(id) }
    });
    
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 4. Update a todo 
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    
    await prisma.todo.update({
      where: { todo_id: parseInt(id) },
      data: { description }
    });
    
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 5. Delete a todo 
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.todo.delete({
      where: { todo_id: parseInt(id) }
    });
    
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});