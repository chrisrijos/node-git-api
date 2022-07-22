import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { GithubService } from '../services/github.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpService],
      controllers: [AppController],
      providers: [GithubService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return something', async () => {
      let repoMetadata = await appController.getRepoMetadata()
      expect(repoMetadata).toBeDefined()
    });
  });
});
