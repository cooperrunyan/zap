import { join } from 'path';
import { SettingsManager } from './settings';

const settings = new SettingsManager().getSettings();

export const win: Electron.BrowserWindowConstructorOptions = {
  title: 'Zap',
  tabbingIdentifier: 'Zap',
  icon: `../assets/icon${settings.dark ? '/dark/' : '/'}icon.${settings.os === 'win32' ? 'ico' : 'icns'}`,
  backgroundColor: settings.theme.backgroundColor,
  width: settings.window.dimensions.initialWidth,
  height: settings.window.dimensions.initialHeight,
  frame: settings.window.useNativeAppBar,
  titleBarStyle: settings.window.useNativeAppBar ? 'default' : 'hiddenInset',
  acceptFirstMouse: settings.window.acceptFirstMouse,
  alwaysOnTop: settings.window.remainOnTop,
  center: settings.window.position.center,
  closable: settings.window.can.close,
  enableLargerThanScreen: settings.window.can.beLargerThanScreen,
  hasShadow: settings.window.style.showShadow,
  maxHeight: settings.window.dimensions.maxHeight,
  maxWidth: settings.window.dimensions.maxWidth,
  movable: settings.window.can.move,
  maximizable: settings.window.can.maximize,
  minimizable: settings.window.can.minimize,
  minHeight: settings.window.dimensions.minHeight,
  minWidth: settings.window.dimensions.minWidth,
  opacity: settings.window.style.opacity,
  paintWhenInitiallyHidden: settings.window.paintWhenInitiallyHidden,
  show: settings.window.showInitially,
  vibrancy: settings.window.style.vibrancy,
  x: settings.window.position.initial.x,
  y: settings.window.position.initial.y,
  resizable: settings.window.can.resize,
  fullscreenable: settings.window.can.maximize,
  trafficLightPosition: {
    x: 12,
    y: 12
  },
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
    webSecurity: true
  }
};
