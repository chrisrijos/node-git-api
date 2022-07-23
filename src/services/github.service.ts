import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GithubService {
  GITHUB_API_ENDPOINT = process.env.GITHUB_API_ENDPOINT;
  TOKEN = process.env.TOKEN;
  config: AxiosRequestConfig;
  prList: PullRequestMetadata[];
  username: string;
  repository: string;

  constructor(private readonly httpService: HttpService) { 
    this.config = {
      baseURL: `${this.GITHUB_API_ENDPOINT}`,
      headers: {
        'Authorization': this.TOKEN
      }
    };
  }

  async getRepoMetadata(username: string, repository: string): Promise<PullRequestMetadata[]> {
    const resolvedPullRequests = await this.getGithubData(username, repository);

    const mappedPullRequests = resolvedPullRequests
      .map(pr => Object.assign({}, pr, {commit_count: pr.commit_count['data'].length}));

    return mappedPullRequests;
  }

  /* Retrieves open PR's for a given username/repository */
  private async getGithubData(username: string, repository: string): Promise<PullRequestMetadata[]> {
    /* Query by State for open Pr's explicitly labeled challenge instructions */
    const githubData = await this.httpService.axiosRef
      .get(`${this.GITHUB_API_ENDPOINT}/repos/${username}/${repository}/pulls?state=open`, this.config)

    this.prList = githubData.data.map(async (pr: PullRequestMetadata) => { 
      /* set timeout to avoid rate limit blocks */
      setTimeout(() => {}, 1000);
      return {
        id: pr.id,
        title: pr.title,
        author: pr.base.user.login,
        number: pr.number,
        commit_count: await this.getCommitData(pr.number, username, repository)
      }
    });

    return Promise.all(this.prList)
  } 

  private async getCommitData(pullRequestId: number, username: string, repository: string) {
    return await this.httpService.axiosRef
      .get(`${this.GITHUB_API_ENDPOINT}/repos/${username}/${repository}/pulls/${pullRequestId}/commits`, this.config);
  }

}