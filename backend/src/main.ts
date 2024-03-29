import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: process.env.NODE_ENV === 'development',
  });
  app.enableCors();
  app.use(graphqlUploadExpress({ 
    maxFileSize: 5242880, // 5 MB
    maxFiles: 1,
  }));
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
