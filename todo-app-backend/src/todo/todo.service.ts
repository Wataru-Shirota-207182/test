// src/todo/todo.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException, // BadRequestException をインポート
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './todo.model'; // GraphQLのTodoモデル
// もしPrismaが生成する型と区別したい場合はエイリアスを使う
// import { Todo as PrismaTodo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(createTodoInput: CreateTodoInput): Promise<Todo> {
    const result = await this.prisma.todo.create({
      data: createTodoInput,
    });
    return {
      ...result,
      id: result.id.toString(),
    };
  }

  async findAllTodos(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany();
    return todos.map((todo) => ({
      ...todo,
      id: todo.id.toString(),
    }));
  }

  async findOneTodo(id: string): Promise<Todo> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    const todo = await this.prisma.todo.findUnique({
      where: { id: numericId },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found.`);
    }

    return {
      ...todo,
      id: todo.id.toString(),
    };
  }

  async updateTodo(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    await this.findOneTodo(id);

    const { id: inputId, ...dataToUpdate } = updateTodoInput;
    if (inputId !== undefined && inputId !== id) {
      throw new BadRequestException('ID in input data does not match ID in URL/path.');
    }

    const result = await this.prisma.todo.update({
      where: { id: numericId },
      data: dataToUpdate,
    });

    return {
      ...result,
      id: result.id.toString(),
    };
  }

  async removeTodo(id: string): Promise<Todo> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format. ID must be a number.');
    }

    await this.findOneTodo(id);

    const result = await this.prisma.todo.delete({
      where: { id: numericId },
    });

    return {
      ...result,
      id: result.id.toString(),
    };
  }
}
