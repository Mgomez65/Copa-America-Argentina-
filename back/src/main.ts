import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173', 
    credentials: true, 
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addTag('endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
