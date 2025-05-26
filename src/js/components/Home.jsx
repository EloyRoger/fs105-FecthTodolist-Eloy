import React, {useEffect, useState} from "react";
//create your first component
const Home = () => {
	const [state, setState] = useState({name: "", todos: []});
  const [newTodo, setNewTodo] = useState("");
	const getTodos = async () => {
		try{
		const response = await fetch('https://playground.4geeks.com/todo/users/eloy');
		const data = await response.json();
		console.log(data);
			setState(data)
		}catch(err){
			console.log(err)
		}
	}
  const createTodo = async () => {
  try {
    const response = await fetch("https://playground.4geeks.com/todo/todos/eloy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
        label: newTodo,
        }),
    });
    console.log(response);
    if(response.status === 201){
      setNewTodo("");
      getTodos();
    }
  } catch (err) {
    console.error("Error al hacer POST:", err);
  }
};
  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch (`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: "DELETE"
      });
    if(response.status === 204){
      getTodos();
    }
    } catch (err) {
    }
  };
const deleteAll = async () => {
try {
  for (const todo of state.todos) {
  const response = await fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
    method: "DELETE"
  });
}
getTodos();
} catch (err) {
 console.log(err)
}
};
	useEffect(()=>{
		getTodos()
	},[]);
	return (
    <div className="list">
      <div>
        <h1>LISTA</h1>
            <form>
								<input
                  className="input-styles"
                  type="text"
                  placeholder="Escribe una tarea..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
						</form>
          <div className="buttons-top">
            <button
              className="btnAdd"
              onClick={createTodo}>agregar</button>
            <button
              className="btnDelete"
              onClick={deleteAll}>eliminar</button>
          </div>
      </div>
         	  {state.todos.map((todo)=>
              <p key={todo.id}>
                {todo.label}
                <button
                  className="button-bot"
                  onClick={() => deleteTodo(todo.id)}> X
                </button>
              </p>
        	  )}
        </div>
	);
};
export default Home;