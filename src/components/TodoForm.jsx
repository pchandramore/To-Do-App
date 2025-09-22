import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

function TodoForm({ todoInput, setTodoInput, handleAddTodo, editIndex }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter your todo"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAddTodo}>
        {editIndex !== null ? 'Update' : <AiOutlinePlus />}
      </button>
    </div>
  );
}

export default TodoForm;
