import { RepositoryResponse } from './http';

export interface Repository extends Omit<RepositoryResponse, 'branches_url'> {
  branchesUrl: string;
}
