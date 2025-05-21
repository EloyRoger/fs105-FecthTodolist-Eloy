import { useState, useEffect } from 'react';
import '../../styles/index.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const apiUrl = 'https://playground.4geeks.com/todo/todos/miusuario';


  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (response.ok) return response.json();
        if (response.status === 404) createUser();
      })
      .then(data => data && setTodos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  
  const createUser = () => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([])
    });
  };


  const updateApi = (updatedTasks) => {
    fetch(apiUrl, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTasks)
    });
  };

 
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const updatedTasks = [...todos, { label: newTask, done: false }];
    setTodos(updatedTasks);
    updateApi(updatedTasks);
    setNewTask('');
  };


  const handleDelete = (index) => {
    const updatedTasks = todos.filter((_, i) => i !== index);
    setTodos(updatedTasks);
    updateApi(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>
      
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button>Agregar</button>
      </form>

      <div className="task-list">
        {todos.map((task, index) => (
          <div key={index} className="task-item">
            <p>{task.label}</p>
            <button onClick={() => handleDelete(index)}>X</button>
          </div>
        ))}
      </div>

      <p>Total tareas: {todos.length}</p>
    </div>
  );
}

export default Home;