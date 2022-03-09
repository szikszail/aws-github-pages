#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsGithubPagesStack } from '../lib/aws-github-pages-stack';
import { domain, account, repositoriesWithPages } from '../settings.json';

const app = new cdk.App();
new AwsGithubPagesStack(app, 'AwsGithubPagesStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  domain: domain,
  github_account: account,
  github_repositories: repositoriesWithPages,
});