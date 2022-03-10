import { getBranches, getPagesSettings, getPublicRepositories, hasGitHubPagesBranch, hasPagesEnabled, isRepositoryEnabled } from "./github";
import * as settings from "../settings.json";
import { writeFileSync } from "fs";
import { join } from "path";

(async () => {
  const repositories = [];
  const publicRepositories = await getPublicRepositories();
  for (const { name: repository } of publicRepositories) {
    console.log(`Processing ${settings.account}/${repository}...`);
    const results = {
      enabled: await isRepositoryEnabled(repository),
      pagesEnabled: await hasPagesEnabled(repository),
      gitHubPagesBranch: !!await hasGitHubPagesBranch(repository),
    };
    console.log('...attributes:', results);
    if (results.enabled && (results.pagesEnabled || results.gitHubPagesBranch)) {
      repositories.push(repository);
    }
  }
  const newSettings = {
    ...settings,
    repositories,
  };
  console.log('Writing results to settings.json:', newSettings);
  writeFileSync(join(__dirname, '..', 'settings.json'), JSON.stringify(newSettings, null, 2), { encoding: 'utf8' });
})();
