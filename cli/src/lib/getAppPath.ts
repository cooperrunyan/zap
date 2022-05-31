import { exists } from '../../deps.ts';

export async function getAppPath() {
  const isDev = Deno.env.get('ENV') === 'dev';

  if (isDev) return '../dist/mac-arm64/Zap.app/Contents/MacOS/Zap';

  const map = {
    linux: '../../zap',
    win: '../../Zap.exe',
    mac: '../../MacOS/Zap'
  } as const;

  const searches: { exists: Promise<boolean>; os: keyof typeof map }[] = [];

  for (const [os, path] of entries(map)) {
    searches.push({ os, exists: exists(path) });
  }

  await Promise.all(searches.map((search) => search.exists));

  for (const search of searches) {
    if (await search.exists) return search.os;
  }
}

type Entry<Obj extends object> = [keyof Obj, Obj[keyof Obj]];
const entries = (obj: object) => Object.entries(obj) as Entry<typeof obj>[];