import { FitAddon } from 'xterm-addon-fit';
import { createTerminal } from './terminal';

export const start = (settings: ReturnType<typeof window.electron.api.settings.get>) => {
  const fitAddon = new FitAddon();
  const terminal = createTerminal(settings);
  const parent = document.querySelector('#parent') as HTMLDivElement;

  parent.innerHTML = '<div id="terminal"></div>';

  terminal.onData((str) => window.electron.api.emit(`x-stdin-${id}`, str));
  terminal.open(document.getElementById('terminal')!);
  terminal.loadAddon(fitAddon);

  const id = new URL(location.href).searchParams.get('id');

  const resize = () => {
    fitAddon.fit();
    const { cols, rows } = terminal;
    window.electron.api.emit(`x-term-resize-${id}`, String(cols), String(rows));
  };

  parent.style.padding = settings.window.style.padding;

  window.electron.api.on(`x-stdout-${id}`, (stdout: string) => {
    terminal.write(stdout);
  });
  window.addEventListener('resize', resize);

  const appBar = document.querySelector('.AppBar') as HTMLDivElement;
  const appContent = document.querySelector('.AppContent') as HTMLDivElement;

  appBar.style.color = settings.theme.foregroundColor;
  appBar.style.fontFamily = settings.font.family.replaceAll('"', "'");
  appBar.innerText = settings.window.showTitle ? 'Zap' : '';

  if (settings.window.useNativeAppBar) {
    appBar.style.display = 'none';
    appContent.classList.add('native');
  } else {
    appContent.classList.remove('native');
    appBar.style.display = '';
  }

  resize();

  return () => {
    window.electron.api.off(`x-stdout-${id}`);
    window.removeEventListener('resize', resize);
  };
};
