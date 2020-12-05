import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GithubDataService } from './github-data.service';
import { Branch, RepositoryResponse } from '../../shared/interfaces';

const repositoriesMock: RepositoryResponse[] = require('../../../mocks/repositories-mock.json');
const branchesMock: Branch[] = require('../../../mocks/branches-mock.json');

describe('GithubDataService', () => {
  let githubDataService: GithubDataService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ GithubDataService ],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', [ 'get' ]);
    githubDataService = new GithubDataService(httpClientSpy as any);
  });

  describe('getUsersRepositoriesWithBranches()', () => {
    it('should return only owned repos with branches', () => {
      httpClientSpy.get.and.returnValue(of(repositoriesMock));
      console.log(repositoriesMock)

      githubDataService.getUsersRepositoriesWithBranches('nieznamjs').subscribe(data => {
        console.log(data);
        expect(data).toBeTruthy()
      });
    });
  });
});
