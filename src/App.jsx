import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import EditModal from './components/EditModal.jsx';
import FilterBar from './components/FilterBar.jsx';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      // Normalize old string todos to objects
      return JSON.parse(saved).map(todo =>
        typeof todo === 'string'
          ? { text: todo, completed: false, createdAt: new Date().toLocaleString(), updatedAt: null }
          : todo
      );
    }
    return [];
  });

  const [todoInput, setTodoInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | completed

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!todoInput.trim()) return;
    const now = new Date().toLocaleString();

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        text: todoInput,
        updatedAt: now
      };
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: todoInput, completed: false, createdAt: now, updatedAt: null }]);
    }
    setTodoInput('');
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setTodoInput(todos[index].text);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    updatedTodos[index].updatedAt = new Date().toLocaleString();
    setTodos(updatedTodos);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTodoInput('');
    setEditIndex(null);
  };

  // Filtered and searched todos
  const filteredTodos = todos.filter(todo => {
    const text = todo.text || ''; // fallback for safety
    const matchesSearch = text.toLowerCase().includes(search.toLowerCase());
    if (filter === 'active') return !todo.completed && matchesSearch;
    if (filter === 'completed') return todo.completed && matchesSearch;
    return matchesSearch; // all
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todo App</h2>

      <div className="card p-3 shadow-sm mb-3">
        <TodoForm
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          handleAddTodo={handleAddTodo}
          editIndex={editIndex}
        />
        <FilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
        <TodoList
          todos={filteredTodos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleToggleComplete={handleToggleComplete}
        />
      </div>

      {showModal && (
        <EditModal
          show={showModal}
          handleClose={handleModalClose}
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          handleUpdate={handleAddTodo}
        />
      )}
    </div>
  );
}

export default App;
