import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { GithubDataService } from '../../core/services/github-data.service';
import { RepositoryWithBranches } from '../../shared/interfaces';

@Component({
  selector: 'app-gh-repositories',
  templateUrl: './gh-repositories.component.html',
  styleUrls: ['./gh-repositories.component.scss']
})
export class GhRepositoriesComponent implements OnInit {

  public repositories?: RepositoryWithBranches[];
  public isLoading$!: Observable<boolean>;
  public errorResponse$!: Observable<HttpErrorResponse | null>;

  constructor(private githubDataService: GithubDataService) {}

  public ngOnInit(): void {
    this.isLoading$ = this.githubDataService.isLoading$;
    this.errorResponse$ = this.githubDataService.errorResponse$;
  }

  public onFormSubmit(username: string): void {
    this.githubDataService.getUsersRepositoriesWithBranches(username)
      .pipe(take(1))
      .subscribe(repositories => {
        this.repositories = repositories;
      });
  }
}
