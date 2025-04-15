import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('POINT MARKETPLACE PRODUCTOS API')
    .setDescription('API Productos del marketplace para WhatsApp')
    .setVersion('1.0')
    .addTag('marketplace')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const dataSource = app.get(DataSource);
  if (!dataSource.isInitialized) {
    try {
      await dataSource.initialize();
      console.log('Conexion a bd exitosa');
    } catch (err) {
      console.error('error de conexin a bd: ', err);
      process.exit(1);
    }
  } else {
    console.log('conexion a db ya establecida');
  }

  await app.listen(configService.get('PORT') ?? 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
