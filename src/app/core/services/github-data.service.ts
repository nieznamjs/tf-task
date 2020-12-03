import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { GithubRepositoryTypes } from '../../shared/constants/github-repository-types';
import { Repository } from '../../shared/interfaces/repository.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubDataService {

  private githubApiUrl = 'https://api.github.com';
  public isLoading = false;
  public error?: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  public getUsersRepositories(username: string): Observable<Repository[]> {
    this.isLoading = true;

    const params = new HttpParams()
      .set('type', GithubRepositoryTypes.owner);

    return this.http.get<Repository[]>(`${this.githubApiUrl}/users/${username}/repos`, { params })
      .pipe(
        map(repos => repos.filter(repo => !repo.fork)),
        mergeMap(filteredRepos => {
          console.log(filteredRepos)
          return filteredRepos.map(repo => this.getBranches(repo.branches_url));
        }),
        catchError(err => {
          this.error = err;

          return of(err);
        }),
        finalize(() => this.isLoading = false)
      );
  }

  private getBranches(branchesUrl: string): any {
    return this.http.get(branchesUrl);
  }
}
