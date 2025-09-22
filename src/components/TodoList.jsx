import React from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineUndo } from 'react-icons/ai';

function TodoList({ todos, handleEdit, handleDelete, handleToggleComplete }) {
  return (
    <ul className="list-group">
      {todos.length === 0 && <p className="text-center text-muted mt-2">No todos found!</p>}
      {todos.map((todo, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
        >
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </div>
          <div className="text-muted small">
            Created: {todo.createdAt} {todo.updatedAt ? `| Updated: ${todo.updatedAt}` : ''}
          </div>
          <div className="mt-2 mt-md-0 d-flex gap-2">
            <button className="btn btn-outline-warning btn-sm" onClick={() => handleEdit(index)}>
              <AiOutlineEdit />
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(index)}>
              <AiOutlineDelete />
            </button>
            <button className="btn btn-outline-success btn-sm" onClick={() => handleToggleComplete(index)}>
              {todo.completed ? <AiOutlineUndo /> : <AiOutlineCheck />}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
