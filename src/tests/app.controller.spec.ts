import { HttpService } from '@nestjs/axios';
import { TestingModule, Test } from '@nestjs/testing';
import axios from 'axios';
import { AppController } from '../app.controller';
import { GithubService } from '../services/github.service';

jest.mock('@nestjs/axios')
jest.mock('../services/github.service')

/*Basic mocks Tests/Mocks for challenge */
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

  describe('github api should return 200', () => {
    it('should return the value', async () => {
      let gitResponse = await axios.get('http://api.github.com/zen');
      expect(gitResponse.status).toEqual(200)
    })
  });

  describe('Github service is called', () => {
    it('should be called once', async () => {
      expect(GithubService).toBeCalledTimes(2)
    })
  });


});
