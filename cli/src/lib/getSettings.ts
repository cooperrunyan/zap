import { defaultSettings as getDefaultSettings } from '../../../electron/defaultSettings.ts';
import { merge } from '../../../electron/merge.ts';
import { yaml } from '../../deps.ts';
import { getSettingsPath } from './getSettingsPath.ts';

export const defaultSettings = getDefaultSettings(Deno.build.os);

export async function getSettings() {
  try {
    const path = await getSettingsPath();
    if (!path) return { settings: defaultSettings, customSettings: {}, defaultSettings };

    const customSettings = yaml.parse(await Deno.readTextFile(path));

    return {
      settings: merge(JSON.parse(JSON.stringify(customSettings)) as any, defaultSettings),
      customSettings,
      defaultSettings
    };
  } catch {
    return { settings: defaultSettings, customSettings: {}, defaultSettings };
  }
}
