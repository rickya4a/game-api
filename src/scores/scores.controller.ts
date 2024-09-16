import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async submitScore(@Body() body: { score: number }, @Request() req) {
    const { score } = body;
    const userId = req.user.userId;
    return this.scoresService.submitScore(userId, score);
  }

  @Get('/leaderboard')
  async getLeaderboard() {
    return this.scoresService.getLeaderboard();
  }
}
