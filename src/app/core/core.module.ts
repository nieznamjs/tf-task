import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { GhRepositoriesModule } from '../features/gh-repositories/gh-repositories.module';

const featureModules = [ GhRepositoriesModule ];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...featureModules,
  ],
  exports: [ ...featureModules ],
})
export class CoreModule { }
