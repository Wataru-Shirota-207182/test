// src/components/AddTodoForm.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TODO } from '../graphql/mutations';
import { GET_TODOS } from '../graphql/queries';

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({ 
        variables: { 
          createTodoInput: { 
            title: title.trim(),
            description: description.trim() || undefined
          } 
        } 
      });
      setTitle('');
      setDescription('');
      setError(null);
    } catch (err) {
      setError('Error creating todo: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add New TODO</h3>
      <div>
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required // HTML5の必須入力属性
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>
          Add Todo
        </button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
};

export default AddTodoForm;