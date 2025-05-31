// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { PrismaService } from '../prisma/prisma.service'; // PrismaServiceの正しいパス

@Module({
  providers: [TodoResolver, TodoService, PrismaService], // このモジュールで提供するプロバイダ(サービスやリゾルバ)
  // このモジュールから他のモジュールにエクスポートするものがあれば exports: [] に記述
})
export class TodoModule {}
