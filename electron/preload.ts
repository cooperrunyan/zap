import { BrowserWindow, contextBridge, ipcRenderer } from 'electron';
import { defaultSettings } from './settings/defaultSettings';
import { Settings, SettingsManager } from './settings/SettingsManager';

import { createTerminal } from './terminal/createTerminal';

import open from 'open';
import { getWindowFromId } from './window/getWindowFromId';

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
    onChange: (f: (settings: Settings) => any) => settings.onChange(f),
    get: () => settings.getSettings(),
    set: (val: ReturnType<typeof defaultSettings>) => settings.setSettings(val)
  },

  openUrl: (url: string) => open(url),

  fetchTerminal: (windowId: string, dir?: string) => {
    return ipcRenderer.invoke(`x-request-terminal-win${windowId}`, windowId, dir) 
  }
};

contextBridge.exposeInMainWorld('electron', { api });
