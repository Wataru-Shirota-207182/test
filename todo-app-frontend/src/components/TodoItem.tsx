// src/components/TodoItem.tsx
import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, REMOVE_TODO } from '../graphql/mutations';
import { GET_TODOS } from '../graphql/queries';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const [updateTodo, { loading: updating }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onError: (err) => console.error('Error updating todo:', err.message),
  });

  const [removeTodo, { loading: removing }] = useMutation(REMOVE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
    onError: (err) => console.error('Error removing todo:', err.message),
  });

  const handleToggleCompleted = () => {
    console.log('Toggling completed state:', !todo.completed);
    updateTodo({
      variables: {
        updateTodoInput: {
          id: todo.id,
          completed: !todo.completed,
        },
      },
    }).catch((error) => {
      console.error('Error in handleToggleCompleted:', error);
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      console.log('--- handleDelete ---');
      console.log('Deleting todo with ID:', todo.id, 'Type:', typeof todo.id);

      removeTodo({ variables: { id: todo.id } });
    }
  };

  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #eee',
      opacity: updating || removing ? 0.5 : 1,
    }}>
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleCompleted}
          disabled={updating}
          style={{ marginRight: '10px' }}
        />
        {todo.title}
        {todo.description && <em style={{ marginLeft: '10px', color: '#777' }}> - {todo.description}</em>}
      </span>
      <button
        onClick={handleDelete}
        disabled={removing || updating}
        style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
      >
        {removing ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
}

export default TodoItem;
