import * as fs from 'fs-extra';
import * as yaml from 'yaml';
import { platform } from 'os';
import { defaultSettings } from './defaultSettings';
import { merge } from './merge';

type Settings = ReturnType<typeof defaultSettings>;

export class SettingsManager {
  settingsPath = `${process.env.HOME}/.zaprc.yml`;

  constructor() {
    this.getSettings();
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
