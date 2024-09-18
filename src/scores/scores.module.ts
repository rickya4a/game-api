import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scores } from './score.entity';
import { Users } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scores, Users])],
  providers: [ScoresService],
  controllers: [ScoresController],
})
export class ScoresModule {}
