import { contextBridge, ipcRenderer } from 'electron';
import { defaultSettings } from './defaultSettings';
import { SettingsManager } from './settings';

import open from 'open';

declare global {
  interface Window {
    electron: {
      api: typeof api;
    };
  }
}

const settings = new SettingsManager();

const api = {
  emit: (channel: string, message: string, ...data: any[]) => {
    ipcRenderer.send(channel, message, ...data);
  },

  on: (channel: string, callback: (...data: any[]) => void) => {
    return ipcRenderer.on(channel, (_, ...data) => callback(...data));
  },

  off: (channel: string) => {
    return ipcRenderer.removeAllListeners(channel);
  },

  settings: {
    onChange: (f: () => any) => settings.onChange(f),
    get: () => settings.getSettings(),
    set: (val: ReturnType<typeof defaultSettings>) => settings.setSettings(val)
  },

  openUrl: (url: string) => open(url)
};
contextBridge.exposeInMainWorld('electron', { api });
