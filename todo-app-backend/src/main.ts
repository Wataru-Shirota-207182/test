// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// ValidationPipe は app.module.ts でグローバルに設定したのでここでは不要

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORSを有効にする (フロントエンドからのアクセスを許可)
  app.enableCors();
  await app.listen(3000).catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
bootstrap();
