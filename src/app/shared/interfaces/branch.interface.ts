export interface Branch {
  name: string;
  protected: boolean;
  commit: {
    sha: string;
    url: string;
  };
}
