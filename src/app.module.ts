import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GithubService } from './services/github.service';
import 'dotenv/config';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [GithubService],
})
export class AppModule {}
