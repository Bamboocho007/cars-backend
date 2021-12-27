import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NodeEnvs } from './constants/node-envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  if (process.env.NODE_ENV === NodeEnvs.development) {
    const config = new DocumentBuilder()
      .setTitle('Cars project')
      .setDescription('The cars API')
      .setVersion('1.0')
      .addTag('cars')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log('App opened on ', 'http://localhost:' + process.env.PORT + '/');
    console.log(
      'Swagger opened on ',
      'http://localhost:' + process.env.PORT + '/api/',
    );
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
