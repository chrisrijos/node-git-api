import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { AppController } from '../app.controller';
import { GithubService } from '../services/github.service';

describe('AppController', () => {
  let appController: AppController;
  let githubService: GithubService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [GithubService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('fetch open pull requests', () => {
    it('should return the value', async () => {
    })
  });
});
