// src/todo/todo.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  // ここを確実に以下のように修正してください
  @Field(() => String, { nullable: true }) // 型を明示的に String とし、nullable: true を設定
  description: string | null; // 型を string | null に変更

  @Field()
  completed: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
