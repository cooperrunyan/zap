import { Settings } from '../electron/settings/SettingsManager';

export function initWindow(settings: Settings) {
  const appBar = document.querySelector('.AppBar') as HTMLDivElement;
  const appContent = document.querySelector('.AppContent') as HTMLDivElement;

  appBar.innerText = settings.window.showTitle ? 'Zap' : '';

  if (settings.window.useNativeAppBar) {
    appBar.style.display = 'none';
    appContent.classList.add('native');
  } else {
    appContent.classList.remove('native');
    appBar.style.display = '';
  }

  for (const [k, v] of Object.entries(settings.color)) {
    document.documentElement.style.setProperty(`--${k}`, v);
  }

  document.documentElement.style.setProperty('--font-family', settings.font.family.replaceAll('"', "'"));
}
