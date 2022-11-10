import 'xterm/css/xterm.css';
import './style/base.scss';

import { terminal } from './terminal';

import { FitAddon } from 'xterm-addon-fit';

const fitAddon = new FitAddon();
const settings = window.electron.api.settings.get();

terminal.onData((str) => window.electron.api.emit(`x-stdin-${id}`, str));
terminal.open(document.getElementById('terminal')!);
terminal.loadAddon(fitAddon);

const id = new URL(location.href).searchParams.get('id');

const resize = () => {
  fitAddon.fit();
  const { cols, rows } = terminal;
  window.electron.api.emit(`x-term-resize-${id}`, String(cols), String(rows));
};

(document.querySelector('#parent') as any)!.style.padding = settings.window.style.padding;
resize();

window.electron.api.on(`x-stdout-${id}`, (stdout: string) => {
  terminal.write(stdout);
});
window.addEventListener('resize', resize);

window.addEventListener('beforeunload', () => {
  window.electron.api.off(`x-stdout-${id}`);
  window.removeEventListener('resize', resize);
});

if (!settings.window.useNativeAppBar) {
  const app = document.querySelector('.App') as HTMLDivElement;
  app.insertAdjacentHTML(
    'afterbegin',
    `<div class="AppBar" style="color: ${
      settings.theme.foregroundColor
    }; font-family: ${settings.font.family.replaceAll('"', "'")};">${settings.window.showTitle ? 'Zap' : ''}</div>`
  );
} else {
  const appContent = document.querySelector('.AppContent') as HTMLDivElement;
  appContent.classList.add('native');
}
