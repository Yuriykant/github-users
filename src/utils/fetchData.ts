import { GITHUB_API } from '../api/gitHub';

export async function fetchData(url: string) {
  const response = await fetch(url, GITHUB_API);
  return await response.json();
}
