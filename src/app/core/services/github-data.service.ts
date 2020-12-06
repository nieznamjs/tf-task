import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';

import { RepositoryWithBranches, Branch, RepositoryResponse, Repository } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GithubDataService {
  public readonly githubApiUrl = 'https://api.github.com';
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  public readonly errorResponse$ = new BehaviorSubject<HttpErrorResponse | null>(null);

  constructor(private http: HttpClient) { }

  public getUsersRepositoriesWithBranches(username: string): Observable<RepositoryWithBranches[]> {
    this.isLoading$.next(true);

    return this.http.get<RepositoryResponse[]>(`${this.githubApiUrl}/users/${username}/repos`)
      .pipe(
        map(this.filterForkedRepos),
        mergeMap((filteredRepos: RepositoryResponse[]) => {
          this.errorResponse$.next(null);
          const mappedAndFilteredRepos: Repository[] = filteredRepos.map(repo => this.mapRepository(repo));

          return forkJoin(
            mappedAndFilteredRepos.map(repo => {
              return this.getBranches(repo.branchesUrl).pipe(
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
      branchesUrl: repositoryResponse.branches_url.split('{/')[0],
    };
  }

  private filterForkedRepos(repos: RepositoryResponse[]): RepositoryResponse[] {
    return repos.filter(repo => !repo.fork);
  }

  private getBranches(branchesUrl: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(branchesUrl);
  }
}
