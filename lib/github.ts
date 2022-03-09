import assert = require("assert");
import { domain, repositories, account } from "../settings.json";
import { Octokit } from "@octokit/core";

const github_access_token = process.env.GITHUB_ACCESS_TOKEN;

assert(github_access_token, 'GitHub Access Token must be set!');
assert(domain, 'Domain must be set!');
assert(account, 'GitHub Account must be set!');
assert(Array.isArray(repositories) && repositories.length, 'GitHub Repositories must be set!');

const octokit = new Octokit({
  auth: github_access_token,
});

export async function getPagesSettings(repository: string): Promise<any> {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/pages', {
      owner: account,
      repo: repository,
    });
    if (response.status >= 400) {
      return null;
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function setPageDomain(repository: string): Promise<any> {
  try {
    const response = await octokit.request('PUT /repos/{owner}/{repo}/pages', {
      owner: account,
      repo: repository,
      cname: `${repository}.${domain}`,
      public: true,
      https_enforced: true,
    });
    if (response.status >= 400) {
      return null;
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function setRepositoryDomain(repository: string): Promise<any> {
  try {
    const response = await octokit.request('PATCH /repos/{owner}/{repo}', {
      owner: account,
      repo: repository,
      homepage: `${repository}.${domain}`,
    });
    if (response.status >= 400) {
      return null;
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getBranches(repository: string): Promise<any> {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
      owner: account,
      repo: repository,
    });
    if (response.status >= 400) {
      return null;
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
