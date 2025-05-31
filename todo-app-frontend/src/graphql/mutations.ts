// src/graphql/mutations.ts
import { gql } from '@apollo/client';
export const CREATE_TODO = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) { id title description completed }
  }
`;
export const UPDATE_TODO = gql`
  mutation UpdateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $updateTodoInput) { id title description completed }
  }
`;
export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) { id title }
  }
`;
