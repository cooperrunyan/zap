import * as fs from 'fs-extra';
import { platform } from 'os';
import * as yaml from 'yaml';
import { defaultSettings } from './defaultSettings';
import { merge } from './merge';

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

    return merge(customSettings, defaultSettings(platform()) as any) as Settings;
  }

  setSettings(val: Partial<Settings>) {
    fs.writeFileSync(this.settingsPath, yaml.stringify(val));
  }
}
