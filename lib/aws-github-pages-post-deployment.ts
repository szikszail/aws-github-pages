import { repositories, account } from "../settings.json";
import { setPageDomain, setRepositoryDomain } from "./github";


(async () => {
  for (const repository of repositories) {
    await processRepository(repository);
  }
})();

async function processRepository(repository: string): Promise<void> {
  console.log(`Processing ${account}/${repository}...`);
  await setPageDomain(repository);
  await setRepositoryDomain(repository);
}