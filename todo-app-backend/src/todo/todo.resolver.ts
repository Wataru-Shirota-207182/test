// src/todo/todo.resolver.ts
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo) // このリゾルバがどのGraphQLタイプを主に扱うかを指定 (この場合はTodoタイプ)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {} // TodoServiceをDI

  // --- Mutations (データの作成、更新、削除) ---
  @Mutation(() => Todo, { name: 'createTodo' }) // 'createTodo'という名前のミューテーションを定義
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput, // 引数名を指定
  ): Promise<Todo> {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Promise<Todo> {
    return this.todoService.updateTodo(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo, { name: 'removeTodo' })
  async removeTodo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
    return this.todoService.removeTodo(id);
  }

  // --- Queries (データの取得) ---
  @Query(() => [Todo], { name: 'todos' }) // 'todos'という名前のクエリを定義 (Todoの配列を返す)
  async findAllTodos(): Promise<Todo[]> {
    return this.todoService.findAllTodos();
  }

  @Query(() => Todo, { name: 'todo', nullable: true }) // 'todo'という名前のクエリを定義 (単一のTodoまたはnullを返す)
  async findOneTodo(@Args('id', { type: () => ID }) id: string): Promise<Todo | null> {
    return this.todoService.findOneTodo(id);
  }
}
