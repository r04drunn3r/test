import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const addTask = (task) => {
    if (editTaskIndex !== null) {
      updateTask(tasks[editTaskIndex], task);
      setEditTaskIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTaskInput('');
  };

  const removeTask = (taskToRemove) => {
    setTasks(tasks.filter(task => task !== taskToRemove));
  };

  const updateTask = (oldTask, newTask) => {
    setTasks(tasks.map((task, index) => (index === editTaskIndex ? newTask : task)));
  };

  const startEditTask = (index) => {
    setTaskInput(tasks[index]);
    setEditTaskIndex(index);
  };

  const filteredTasks = tasks.filter(task => task.includes(filter));
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Task Management App
        </p>
        <input 
          type="text" 
          value={taskInput} 
          onChange={(e) => setTaskInput(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={() => addTask(taskInput)}>{editTaskIndex !== null ? 'Update Task' : 'Add Task'}</button>
        <input 
          type="text" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
          placeholder="Filter tasks" 
        />
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
        <ul>
          {sortedTasks.map((task, index) => (
            <li key={index}>
              {task} 
              <button onClick={() => removeTask(task)}>Remove</button>
              <button onClick={() => startEditTask(index)}>Edit</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
