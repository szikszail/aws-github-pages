import { getBranches } from "./github";
import * as settings from "../settings.json";
import { writeFileSync } from "fs";
import { join } from "path";

(async () => {
  const repositoriesWithPages = [];
  for (const repository of settings.repositories) {
    console.log(`Processing ${settings.account}/${repository}...`);
    if (await hasGitHubPagesBranch(repository)) {
      repositoriesWithPages.push(repository);
    }
  }
  const newSettings = {
    ...settings,
    repositoriesWithPages,
  };
  console.log('Writing results to settings.json:', newSettings);
  writeFileSync(join(__dirname, '..', 'settings.json'), JSON.stringify(newSettings, null, 2), { encoding: 'utf8' });
})();

async function hasGitHubPagesBranch(repository: string): Promise<boolean> {
  const branches = await getBranches(repository);
  return branches.find((b: any) => b.name === 'gh-pages');
}
