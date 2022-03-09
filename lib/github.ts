import assert = require("assert");
import { domain, account } from "../settings.json";
import { Octokit } from "@octokit/rest";

const github_access_token = process.env.GITHUB_ACCESS_TOKEN;

assert(github_access_token, 'GitHub Access Token must be set!');
assert(domain, 'Domain must be set!');
assert(account, 'GitHub Account must be set!');

const octokit = new Octokit({
  auth: github_access_token,
})

async function handleOctokitRestRequest(request: Promise<any>): Promise<any> {
  try {
    const response = await request;
    if (response.status >= 400) {
      console.error(response);
      return null;
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getPublicRepositories(): Promise<any> {
  return await handleOctokitRestRequest(octokit.rest.repos.listForUser({
    username: account,
    per_page: 100,
    type: "owner",
  }));
}

export async function getPagesSettings(repository: string): Promise<any> {
  return await handleOctokitRestRequest(octokit.rest.repos.getPages({
    owner: account,
    repo: repository,
  }));
}

export async function setPageDomain(repository: string): Promise<any> {
  return await handleOctokitRestRequest(octokit.rest.repos.updateInformationAboutPagesSite({
    owner: account,
    repo: repository,
    cname: `${repository}.${domain}`,
    public: true,
    https_enforced: true,
  }));
}

export async function setRepositoryDomain(repository: string): Promise<any> {
  return await handleOctokitRestRequest(octokit.rest.repos.update({
    owner: account,
    repo: repository,
    homepage: `${repository}.${domain}`,
  }));
}

export async function getBranches(repository: string): Promise<any> {
  return await handleOctokitRestRequest(octokit.rest.repos.listBranches({
    owner: account,
    repo: repository,
  }));
}
