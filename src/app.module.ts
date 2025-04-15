import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('MSSQL_HOST'),
        port: configService.get('MSSQL_PORT'),
        username: configService.get('MSSQL_USERNAME'),
        password: configService.get('MSSQL_PASSWORD'),
        database: configService.get('MSSQL_DB_NAME'),
        //entities: [__dirname + '/**/*.entity{.ts, .js}'],
        autoLoadEntities: true,
        synchronize: false, //usar solo para entorno de desarrollo
        //logging: ['query', 'error'], //usar solo en desarrollo para ver las consultas
        options: {
          enableArithAbort: true,
          trustServerCertificate: true,
          connectTimeout: Number(
            configService.get('SQLSERVER_CONNECTION_TIMEOUT'),
          ),
          requestTimeout: Number(
            configService.get('SQLSERVER_REQUEST_TIMEOUT'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
