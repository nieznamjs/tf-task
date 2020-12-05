import { TestBed } from '@angular/core/testing';

import { GithubDataService } from './github-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
