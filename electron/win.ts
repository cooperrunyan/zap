import { join } from 'path';
import { initialSettings as settings } from './settings';

export const win: Electron.BrowserWindowConstructorOptions = {
  show: false,
  title: 'Zap',
  tabbingIdentifier: 'Zap',
  icon: `../resources/icon.${settings.os === 'win32' ? 'ico' : 'icns'}`,
  backgroundColor: settings.color.background,
  frame: settings.window.useNativeAppBar,
  titleBarStyle: settings.window.useNativeAppBar ? 'default' : 'hiddenInset',
  acceptFirstMouse: settings.window.acceptFirstMouse,
  closable: true,
  enableLargerThanScreen: false,
  hasShadow: settings.window.style.showShadow,
  maxHeight: undefined,
  maxWidth: undefined,
  minHeight: 180,
  minWidth: 350,
  movable: true,
  maximizable: true,
  minimizable: true,
  paintWhenInitiallyHidden: true,
  vibrancy: settings.window.style.vibrancy || undefined,
  resizable: true,
  fullscreenable: true,
  trafficLightPosition: {
    x: 12,
    y: 12
  },
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
    webSecurity: true,
    webgl: true,
    nodeIntegration: true
  }
};
