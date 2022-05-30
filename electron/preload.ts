import { ipcRenderer, contextBridge } from 'electron';
import { defaultSettings, SettingsManager } from './settings';

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
    get: () => settings.getSettings(),
    set: (val: ReturnType<typeof defaultSettings>) => settings.setSettings(val)
  }
};
contextBridge.exposeInMainWorld('electron', { api });
