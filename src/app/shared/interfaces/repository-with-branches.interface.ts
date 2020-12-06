import { Branch } from './http';
import { Repository } from './repository.interface';

export interface RepositoryWithBranches extends Repository {
  branches: Branch[];
}
