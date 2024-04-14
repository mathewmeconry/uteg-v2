import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { BaseModule } from './base/base.module';
import { AuthModule } from './auth/auth.module';
import { EGTModule } from './egt/egt.module';
import * as path from 'path';
import { Upload } from './scalars/upload.scalar';

@Module({
  providers: [Upload],
  imports: [
    BaseModule,
    AuthModule,
    EGTModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
        subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
        'subscriptions-transport-ws': {
          onConnect: (context: any) => {
            return context;
          },
          path: '/graphql',
        },
      },
      sortSchema: true,
      playground: process.env.NODE_ENV === 'development',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
      },
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get('PERSISTENT_STORAGE_PATH'),
          serveRoot: '/static',
          serveStaticOptions: {
            fallthrough: true,
            index: false,
            redirect: false,
          },
        },
        {
          rootPath: path.join(__dirname, '..', 'frontend'),
          serveStaticOptions: {
            fallthrough: true,
            redirect: true,
          },
        },
      ],
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
