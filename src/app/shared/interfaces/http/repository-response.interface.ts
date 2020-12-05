export interface RepositoryResponse {
  fork: boolean;
  name: string;
  owner: {
    login: string;
  };
  branches_url: string;
}
