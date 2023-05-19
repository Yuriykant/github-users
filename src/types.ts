export interface GithubUsers {
  //UsersApi
  id: number;
  login: string;
  avatar_url: string;
}
export interface GithubUser {
  html_url: string;
  avatar_url: string;
  name: string;
  login: string;
  followers?: number;
  following?: number;
}
export interface GithubRepo {
  id: number;
  html_url: string;
  name: string;
  description: string;
}
