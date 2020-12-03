import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GhRepositoriesComponent } from './gh-repositories.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ GhRepositoriesComponent, SearchBarComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    GhRepositoriesComponent,
  ],
})
export class GhRepositoriesModule { }
