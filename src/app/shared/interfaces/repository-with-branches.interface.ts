import { Branch } from './branch.interface';
import { Repository } from './repository.interface';

export interface RepositoryWithBranches extends Repository {
  branches: Branch[];
}
