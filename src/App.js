import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editId, setEditId] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle task input change
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Add or edit task
  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    
    if (editId) {
      setTasks(
        tasks.map(task =>
          task.id === editId ? { ...task, text: taskInput } : task
        )
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    }
    setTaskInput('');
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Edit task
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setTaskInput(taskToEdit.text);
    setEditId(id);
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>{editId ? 'Update' : 'Add'}</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(task.id)}>
              {task.text}
            </span>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

