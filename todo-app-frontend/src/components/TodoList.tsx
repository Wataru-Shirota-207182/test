// src/components/TodoList.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries'; // GraphQLクエリ
import { Todo } from '../types'; // 型定義
import TodoItem from './TodoItem'; // TodoItemコンポーネントをインポート

// refreshTrigger は refetchQueries で代替できるため、必須ではなくなる
// interface TodoListProps {
//   refreshTrigger: number;
// }

function TodoList(/*{ refreshTrigger }: TodoListProps*/) { // propsは一旦空に
  const { loading, error, data /*, refetch */ } = useQuery<{ todos: Todo[] }>(GET_TODOS, {
    // pollInterval: 5000, // オプション: 5秒ごとにデータをポーリングする場合
  });

  // refreshTrigger が変更されたら refetch する代わりに、
  // AddTodoForm や TodoItem で refetchQueries を使うことでリストが更新される

  // React.useEffect(() => {
  //   if (refreshTrigger > 0) { // refreshTriggerが0より大きい場合にのみrefetch（初期ロード時の二重フェッチを避ける意図など）
  //     refetch();
  //   }
  // }, [refreshTrigger, refetch]);

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error loading todos: {error.message}</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>TODO List</h2>
      {data?.todos && data.todos.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {data.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              // onUpdate や onDelete は TodoItem 内部で refetchQueries するので不要に
            />
          ))}
        </ul>
      ) : (
        <p>No todos yet. Add some!</p>
      )}
    </div>
  );
}

export default TodoList;