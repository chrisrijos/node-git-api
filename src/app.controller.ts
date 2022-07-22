import { Controller, Get } from '@nestjs/common';
import { GithubService } from './services/github.service';


@Controller()
export class AppController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/getPullRequests')
  getRepoMetadata() {
    return this.githubService.getRepoMetadata() 
  }
}
