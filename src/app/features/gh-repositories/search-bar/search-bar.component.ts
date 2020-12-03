import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsService } from '../../../core/services/forms.service';
import { GithubDataService } from '../../../core/services/github-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private githubDataService: GithubDataService,
    public formsService: FormsService,
  ) {}

  public ngOnInit(): void {
    this.form = this.createForm();
  }

  public submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const { username } = this.form.getRawValue();

    this.githubDataService.getUsersRepositories(username)
      .subscribe(data => {
        console.log(data)
      });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: [ null, Validators.required ],
    });
  }
}
