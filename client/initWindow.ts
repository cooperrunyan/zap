import { Settings } from '../electron/settings/SettingsManager';

export function initWindow(settings: Settings) {
  const app = document.querySelector('.App') as HTMLDivElement;
  const appBar = document.querySelector('.AppBar') as HTMLDivElement;
  const appContent = document.querySelector('.AppContent') as HTMLDivElement;
 
  app.style.background = settings.color.background;
  appBar.style.color = settings.color.foreground;
  appBar.style.fontFamily = settings.font.family.replaceAll('"', "'");
  appBar.innerText = settings.window.showTitle ? 'Zap' : '';

  if (settings.window.useNativeAppBar) {
    appBar.style.display = 'none';
    appContent.classList.add('native');
  } else {
    appContent.classList.remove('native');
    appBar.style.display = '';
  }
}
