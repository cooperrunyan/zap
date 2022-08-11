import { exists } from '../../deps.ts';

export async function getSettingsPath() {
  const home = Deno.env.get('HOME') || '~';
  const possibleLocations = [
    `${home}/.zaprc`,
    `${home}/.zaprc.yml`,
    `${home}/.zaprc.yaml`,
    '/.zaprc',
    '/.zaprc.yml',
    '/.zaprc.yaml'
  ];

  if (await exists('./settings-path')) possibleLocations.push((await Deno.readTextFile('./settings-path')).trim());

  const searches: Promise<{ exists: boolean; path: string }>[] = [];

  for (const path of possibleLocations) {
    searches.push(new Promise(async (resolve) => resolve({ path, exists: await exists(path) })));
  }

  return (await Promise.all(searches)).filter((s) => s.exists)[0]?.path || null;
}
