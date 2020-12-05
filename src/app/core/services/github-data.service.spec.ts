import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GithubDataService } from './github-data.service';

describe('GithubDataService', () => {
  let githubDataService: GithubDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ GithubDataService, HttpClientTestingModule ],
    });
    githubDataService = TestBed.inject(GithubDataService);
  });

  // describe('filterForkedRepos()', () => {
  //   it ('should filter forked repos', () => {
  //
  //   });
  // });
});
