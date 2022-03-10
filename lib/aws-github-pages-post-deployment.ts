import { repositories, account } from "../settings.json";
import { enablePages, hasPagesEnabled, setPageDomain, setRepositoryDomain } from "./github";


(async () => {
  for (const repository of repositories) {
    await processRepository(repository);
  }
})();

async function processRepository(repository: string): Promise<void> {
  const repo = `${account}/${repository}`;
  console.log(`Processing ${repo}...`);
  if (!await hasPagesEnabled(repository)) {
    console.log(`...enabling pages for ${repo}`);
    await enablePages(repository);
  }
  console.log(`...adding page domain for ${repo}`);
  await setPageDomain(repository);
  console.log(`...adding repository domain for ${repo}`);
  await setRepositoryDomain(repository);
}