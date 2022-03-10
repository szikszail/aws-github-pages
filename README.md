# aws-github-pages

This project sets custom domains for GitHub Pages of the repositories, including creating them in AWS Route53.

## Prerequisites

1. AWS Account
2. A Hosted Zone in AWS for the domain you chose to use

## Usage

1. Fork this repository
2. Set the following **Secrets** in your the forked GitHub repository ([Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)):
   1. `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to an access key of your AWS account
   2. `AWS_REGION` to an AWS region you chose to use
   3. `GH_ACCESS_TOKEN` to a GitHub Personal Access Token with `repo` scope set
3. Update `settings.json` with your account name and domain to use (*repositories should be empty or ignored, the scripts will overwrite it*) 
4. **IMPORTANT** Update stack name in `bin/aws-github-pages.ts` to make it unique
5. Run the `Deploy` action when you wish, which will:
   1. Read all your repositories and collect all **public** and **owned** ones that have **GitHub Pages** enabled or has `gh-pages` branch
   2. Deploy the necessary `CNAME` records to the domain's hosted zone in AWS
      <br>(i.e. `CNAME {repository-name}.{domain}` to `{account}.github.io`)
   1. Updates the repositories:
      1. Enables pages if it is not enabled yet and there is a `gh-pages` branch
      2. Sets custom domain for the pages
      3. Waits for HTTPS certificate for the custom domain and enabled **HTTPS enforced**
      4. Sets home page for the repository
