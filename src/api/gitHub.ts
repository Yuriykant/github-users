import { GITHUB_API_TOKEN } from '../constants/env';

const TOKEN = GITHUB_API_TOKEN;

export const GITHUB_API = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};
