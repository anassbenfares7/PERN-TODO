import { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // Delete todo function
  const deleteTodo = async id => {
    try {
      // REMOVED 'const response = ' to fix the unused variable error
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      // Update UI state by filtering out the deleted todo
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Get todos function
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table table-bordered table-striped align-middle mt-5 mb-0 w-75 m-auto" >
        <thead className="table-light text-uppercase fs-7 fw-semibold text-secondary">
          <tr>
            <th scope="col">Description</th>
            <th scope="col" class="pe-4" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td class="ps-4 py-3">{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
