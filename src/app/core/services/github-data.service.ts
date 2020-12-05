import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of, throwError } from 'rxjs';

import { GithubRepositoryTypes } from '../../shared/constants';
import { RepositoryWithBranches, Branch, RepositoryResponse, Repository } from '../../shared/interfaces';

import * as mockedRepositories from '../../../mocks/repositories-mock.json';

@Injectable({
  providedIn: 'root',
})
export class GithubDataService {
  private githubApiUrl = 'https://api.github.com';

  public isLoading$ = new BehaviorSubject<boolean>(false);
  public errorResponse$ = new BehaviorSubject<HttpErrorResponse | null>(null);

  constructor(private http: HttpClient) { }

  public getUsersRepositoriesWithBranches(username: string): Observable<RepositoryWithBranches[]> {
    this.isLoading$.next(true);

    const params = new HttpParams()
      .set('type', GithubRepositoryTypes.owner);

    // this.isLoading$.next(false);
    // return of(mockedRepositories.default);

    return this.http.get<RepositoryResponse[]>(`${this.githubApiUrl}/users/${username}/repos`, { params })
      .pipe(
        map(this.filterForkedRepos),
        mergeMap((filteredRepos: RepositoryResponse[]) => {
          const mappedAndFilteredRepos: Repository[] = filteredRepos.map(repo => this.mapRepository(repo));

          return forkJoin(
            mappedAndFilteredRepos.map(repo => {
              const correctBranchesUrl = repo.branchesUrl.split('{/')[0];
              this.errorResponse$.next(null);

              return this.getBranches(correctBranchesUrl).pipe(
                map(branches => ({
                  ...repo,
                  branches,
                })),
              );
            }),
          );
        }),
        catchError(err => {
          this.errorResponse$.next(err);

          return throwError(err);
        }),
        finalize(() => this.isLoading$.next(false))
      );
  }

  private mapRepository(repositoryResponse: RepositoryResponse): Repository {
    return {
      fork: repositoryResponse.fork,
      name: repositoryResponse.name,
      owner: repositoryResponse.owner,
      branchesUrl: repositoryResponse.branches_url,
    };
  }

  private filterForkedRepos(repos: RepositoryResponse[]): RepositoryResponse[] {
    return repos.filter(repo => !repo.fork);
  }

  private getBranches(branchesUrl: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(branchesUrl);
  }
}
