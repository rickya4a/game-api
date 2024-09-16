import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ScoresModule } from './scores/scores.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './scores/score.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'leaderboard',
      entities: [User, Score],
      synchronize: true,
    }),
    AuthModule,
    ScoresModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
