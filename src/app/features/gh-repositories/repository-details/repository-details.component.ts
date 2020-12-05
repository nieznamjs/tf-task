import { Component, Input, OnInit } from '@angular/core';

import { RepositoryWithBranches } from '../../../shared/interfaces';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit {

  @Input() public repositoryDetails!: RepositoryWithBranches;

  constructor() { }

  ngOnInit(): void {
  }

}
