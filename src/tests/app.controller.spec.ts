import { HttpService } from '@nestjs/axios';
jest.mock('@nestjs/axios')

import { TestingModule, Test } from '@nestjs/testing';
import { equal } from 'assert';
import axios from 'axios';
import { assert } from 'console';
import { AppController } from '../app.controller';
import { GithubService } from '../services/github.service';
jest.mock('../services/github.service')

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
