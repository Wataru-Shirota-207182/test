// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {
  const [refreshTodoList, setRefreshTodoList] = useState(0);

  const handleTodoChange = () => {
    // TODOが変更された際にリストを再取得するためのトリガーを更新
    setRefreshTodoList(prev => prev + 1);
  };

  return (
    <div className="App">
      <h1>My TODO App</h1>
      <AddTodoForm onTodoAdded={handleTodoChange} />
      <hr />
      <TodoList refreshTrigger={refreshTodoList} />
    </div>
  );
}
export default App;