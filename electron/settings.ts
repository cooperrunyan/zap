import * as fs from 'fs-extra';
import * as yaml from 'yaml';

import { platform } from 'os';
import { defaultSettings } from './defaultSettings';
import { merge } from './merge';
import { theme } from './themes/getTheme';

export type Settings = ReturnType<typeof defaultSettings>;

export class SettingsManager {
  settingsPath = `${process.env.HOME}/.zaprc.yml`;

  constructor() {
    this.getSettings();
  }

  onChange(f: (settings: Settings) => any) {
    f(this.getSettings());
    fs.watchFile(this.settingsPath, {}, () => {
      f(this.getSettings());
    });
  }

  getSettings(): Settings {
    fs.ensureFileSync(this.settingsPath);
    const customSettings = yaml.parse(fs.readFileSync(this.settingsPath, 'utf-8')) || {};

    const defaultSettingsObj = defaultSettings(platform()) as any;

    const color = merge(
      customSettings.color || {},
      theme(customSettings.theme || defaultSettingsObj.theme) || defaultSettingsObj.color
    );
    const merged = merge(customSettings, defaultSettingsObj) as any;

    merged.color = color;

    return merged;
  }

  setSettings(val: Partial<Settings>) {
    fs.writeFileSync(this.settingsPath, yaml.stringify(val));
  }
}

export const initialSettings = new SettingsManager().getSettings();
