import { createTerminal } from './terminal';

import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { WebglAddon } from 'xterm-addon-webgl';
import { linkHandler } from './linkHandler';

const DEL = '\x7F';
const ENTER = '\r';

const id = new URL(location.href).searchParams.get('id');

export const start = (settings: ReturnType<typeof window.electron.api.settings.get>) => {
  let currentLineLength = 0;

  const fitAddon = new FitAddon();
  const webGlAddon = new WebglAddon(true);
  const webLinksAddon = new WebLinksAddon(linkHandler);

  const terminal = createTerminal(settings);
  const parent = document.querySelector('#parent') as HTMLDivElement;

  parent.innerHTML = '<div id="terminal"></div>';

  terminal.onData((str) => {
    if (str === ENTER) currentLineLength = 0;
    else if (str === DEL) currentLineLength--;
    else currentLineLength++;

    window.electron.api.emit(`x-stdin-${id}`, str);
  });
  terminal.open(document.getElementById('terminal')!);

  terminal.loadAddon(fitAddon);
  // terminal.loadAddon(webGlAddon);
  terminal.loadAddon(webLinksAddon);

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

  resize();

  terminal.attachCustomKeyEventHandler((e) => {
    if (e.key === 'Backspace' && e.metaKey && e.type === 'keydown') {
      let send = '';

      for (let i = 0; i < currentLineLength; i++) send += DEL;

      window.electron.api.emit(`x-stdin-${id}`, send);
      currentLineLength = 0;

      return false;
    }

    return true;
  });

  return () => {
    window.electron.api.off(`x-stdout-${id}`);
    window.removeEventListener('resize', resize);
  };
};
