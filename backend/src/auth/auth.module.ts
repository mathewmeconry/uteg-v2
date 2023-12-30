import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './auth.controller';
import { RoleGuard } from './guards/role.guard';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserLink } from './user/userLink.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user/user.resolver';
import { JudgetokenResolver } from './judgetoken/judgetoken.resolver';
import { JudgetokenService } from './judgetoken/judgetoken.service';
import { Judgetoken } from './judgetoken/judgetoken.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, UserLink, Judgetoken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        global: true,
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  exports: [UserService, JudgetokenService, AuthService, RoleGuard],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    RoleGuard,
    UserService,
    UserResolver,
    JudgetokenResolver,
    JudgetokenService,
    AuthService,
  ],
})
export class AuthModule {}
