import { join } from 'path';
import { initialSettings as settings } from './settings';

export const win: Electron.BrowserWindowConstructorOptions = {
  show: false,
  title: 'Zap',
  tabbingIdentifier: 'Zap',
  icon: `../resources/icon.${settings.os === 'win32' ? 'ico' : 'icns'}`,
  backgroundColor: settings.color.background,
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
  maxHeight: settings.window.dimensions.maxHeight || undefined,
  maxWidth: settings.window.dimensions.maxWidth || undefined,
  movable: settings.window.can.move,
  maximizable: settings.window.can.maximize,
  minimizable: settings.window.can.minimize,
  minHeight: settings.window.dimensions.minHeight,
  minWidth: settings.window.dimensions.minWidth,
  opacity: settings.window.style.opacity,
  paintWhenInitiallyHidden: settings.window.paintWhenInitiallyHidden,
  vibrancy: settings.window.style.vibrancy || undefined,
  x: settings.window.position.initial.x || undefined,
  y: settings.window.position.initial.y || undefined,
  resizable: settings.window.can.resize,
  fullscreenable: settings.window.can.maximize,
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
