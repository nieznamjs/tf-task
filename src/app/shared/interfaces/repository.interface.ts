export interface Repository {
  fork: boolean;
  name: string;
  owner: {
    login: string;
  };
  branches_url: string;
}
