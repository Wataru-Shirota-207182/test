// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service'; // これから作成
import { TodoModule } from './todo/todo.module'; // これから作成
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // 開発中にGraphQL Playgroundを有効に
    }),
    TodoModule, // 後で作成
  ],
  controllers: [],
  providers: [
    PrismaService, // 後で作成
    {
      provide: APP_PIPE, // グローバルバリデーションパイプの適用
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
