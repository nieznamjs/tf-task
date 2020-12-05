import { Repository } from './repository.interface';
import { Branch } from './branch.interface';

export interface RepositoryWithBranches extends Repository {
  branches: Branch[];
}
