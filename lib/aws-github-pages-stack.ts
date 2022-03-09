import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as r53 from 'aws-cdk-lib/aws-route53';
import assert = require('assert');

export interface AwsGithubPagesStackProps extends StackProps {
  domain: string;
  github_account: string;
  github_repositories: string[];
}

export class AwsGithubPagesStack extends Stack {
  constructor(scope: Construct, id: string, props: AwsGithubPagesStackProps) {
    super(scope, id, props);

    assert(props.domain, 'Domain must be set!');
    assert(props.github_account, 'GitHub Account must be set!');
    assert(Array.isArray(props.github_repositories) && props.github_repositories.length, 'GitHub Repositories must be set!');

    const zone = r53.HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domain,
    });

    for (const repository of props.github_repositories) {
      new r53.CnameRecord(this, `${repository}Record`, {
        domainName: `${props.github_account}.github.io`,
        zone,
        recordName: repository,
      });
    }
  }
}
