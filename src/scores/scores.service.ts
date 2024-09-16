import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async submitScore(userId: number, scoreValue: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const score = this.scoresRepository.create({ score: scoreValue, user });
    return this.scoresRepository.save(score);
  }

  async getLeaderboard() {
    return this.scoresRepository.find({
      order: { score: 'DESC' },
      take: 10,
      relations: ['user'],
    });
  }
}
