import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { GhRepositoriesComponent } from './gh-repositories.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { BranchDetailsComponent } from './repository-details/branch-details/branch-details.component';

@NgModule({
  declarations: [ GhRepositoriesComponent, SearchBarComponent, RepositoryDetailsComponent, BranchDetailsComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    GhRepositoriesComponent,
  ],
})
export class GhRepositoriesModule { }
