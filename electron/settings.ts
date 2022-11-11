import * as fs from 'fs-extra';
import * as yaml from 'yaml';

import { platform } from 'os';
import { defaultSettings } from './defaultSettings';
import { merge } from './merge';
import { theme } from './themes/getTheme';

type Settings = ReturnType<typeof defaultSettings>;

export class SettingsManager {
  settingsPath = `${process.env.HOME}/.zaprc.yml`;

  constructor() {
    this.getSettings();
  }

  onChange(f: () => any) {
    fs.watchFile(this.settingsPath, {}, () => {
      f();
    });
  }

  getSettings(): Settings {
    fs.ensureFileSync(this.settingsPath);
    const customSettings = yaml.parse(fs.readFileSync(this.settingsPath, 'utf-8')) || {};

    const merged = merge(customSettings, defaultSettings(platform()) as any) as Settings;

    merged.compositeTheme = merge(merged.themeOverrides as any, theme(merged.theme) as any) as any;

    return merged;
  }

  setSettings(val: Partial<Settings>) {
    fs.writeFileSync(this.settingsPath, yaml.stringify(val));
  }
}
