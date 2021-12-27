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

  const domainWhitelist: string[] = [];

  if (process.env.NODE_ENV === NodeEnvs.development) {
    domainWhitelist.push(undefined);
    domainWhitelist.push('http://localhost/');

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

  const corsOptions = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    origin: function (origin: string, callback: Function) {
      if (domainWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
