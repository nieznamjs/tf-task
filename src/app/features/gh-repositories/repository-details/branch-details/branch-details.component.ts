import { Component, Input } from '@angular/core';

import { Branch } from '../../../../shared/interfaces';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent {
  @Input() public branch!: Branch;
}
