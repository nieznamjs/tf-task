import { of } from 'rxjs';

import { GithubDataService } from './github-data.service';
import { Branch, RepositoryResponse, RepositoryWithBranches } from '../../shared/interfaces';

const repositoriesMock: RepositoryResponse[] = require('../../../mocks/repositories.mock.json');
const branchesMock: Branch[] = require('../../../mocks/branches.mock.json');
const repositoriesWithBranchesMock: RepositoryWithBranches[] = require('../../../mocks/repositories-with-branches.mock.json');

describe('GithubDataService', () => {
  let githubDataService: GithubDataService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [ 'get' ]);
    githubDataService = new GithubDataService(httpClientSpy as any);
  });

  describe('getUsersRepositoriesWithBranches()', () => {
    it('should return only owned repos with branches', () => {
      const username = 'nieznamjs';

      httpClientSpy.get
       .withArgs(`${githubDataService.githubApiUrl}/users/${username}/repos`).and.returnValue(of(repositoriesMock))
       .withArgs('branches').and.returnValue(of(branchesMock));

      githubDataService.getUsersRepositoriesWithBranches(username).subscribe(data => {
        expect(data).toEqual(repositoriesWithBranchesMock);
      });
    });
  });
});
