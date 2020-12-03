import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GhRepositoriesModule } from '../features/gh-repositories/gh-repositories.module';

const featureModules = [ GhRepositoriesModule ];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...featureModules,
  ],
  exports: [
    ...featureModules,
  ],
})
export class CoreModule { }
