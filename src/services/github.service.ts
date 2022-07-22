import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GithubService {
  GITHUB_API_ENDPOINT = process.env.GITHUB_API_ENDPOINT;
  TOKEN = process.env.TOKEN;
  USERNAME = process.env.USERNAME;
  REPOSITORY = process.env.REPOSITORY;
  config: AxiosRequestConfig;
  prList: PullRequestMetadata[];

  constructor(private readonly httpService: HttpService) { 
    this.config = {
      baseURL: `${this.GITHUB_API_ENDPOINT}`,
      headers: {
        'Authorization': this.TOKEN
      }
    };
  }

  async getRepoMetadata(): Promise<PullRequestMetadata[]> {
    let resolvedPullRequests = await this.getGithubData();

    let mappedPullRequests = resolvedPullRequests
      .map(pr => Object.assign({}, pr, {commit_count: pr.commit_count['data'].length}))

    return mappedPullRequests
  }

  private async getGithubData(): Promise<PullRequestMetadata[]> {
    const githubData = await this.httpService.axiosRef
      .get(`${this.GITHUB_API_ENDPOINT}/repos/${this.USERNAME}/${this.REPOSITORY}/pulls?state=open`, this.config)

    this.prList = githubData?.data.map(async (pr: PullRequestMetadata) => { 
      /* set timeout to avoid rate limit blocks */
      setTimeout(() => {}, 1000);
      return {
        id: pr.id,
        title: pr.title,
        author: pr.base.user.login,
        number: pr.number,
        commit_count: await this.getCommitData(pr.number)
      }
    });

    return Promise.all(this.prList)
  } 

  private async getCommitData(pullRequestId: number) {
    return await this.httpService.axiosRef
      .get(`${this.GITHUB_API_ENDPOINT}/repos/${this.USERNAME}/${this.REPOSITORY}/pulls/${pullRequestId}/commits`, this.config);
  }

}