import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GithubDataService } from '../../core/services/github-data.service';
import { RepositoryWithBranches } from '../../shared/interfaces';

@Component({
  selector: 'app-gh-repositories',
  templateUrl: './gh-repositories.component.html',
  styleUrls: ['./gh-repositories.component.scss']
})
export class GhRepositoriesComponent implements OnInit {

  public repositories$?: Observable<RepositoryWithBranches[]>;
  public isLoading$!: Observable<boolean>;
  public error?: HttpErrorResponse;

  constructor(private githubDataService: GithubDataService) {}

  public ngOnInit(): void {
    this.isLoading$ = this.githubDataService.isLoading$;
  }

  public onFormSubmit(username: string): void {
    this.repositories$ = this.githubDataService.getUsersRepositoriesWithBranches(username);
  }
}
