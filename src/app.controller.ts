import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './services/github.service';


@Controller()
export class AppController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/getPullRequests/:username/:repository')
  getRepoMetadata(
    @Param('username') username, 
    @Param('repository') repository
  ) {
    return this.githubService.getRepoMetadata(username, repository) 
  }
}
