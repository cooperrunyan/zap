import 'xterm/css/xterm.css';
import './style/base.scss';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Settings } from '../electron/settings';
import { linkHandler } from './linkHandler';
import { transformSettings } from './terminal';

const DEL = '\x7F';
const ENTER = '\r';

const id = new URL(location.href).searchParams.get('id');

let currentLineLength = 0;

const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon(linkHandler);

const terminal = new Terminal(transformSettings(window.electron.api.settings.get()));

const parent = document.querySelector('#parent') as HTMLDivElement;
const app = document.querySelector('.App') as HTMLDivElement;
const appBar = document.querySelector('.AppBar') as HTMLDivElement;
const appContent = document.querySelector('.AppContent') as HTMLDivElement;

terminal.loadAddon(fitAddon);
terminal.loadAddon(webLinksAddon);

terminal.open(document.getElementById('terminal')!);

terminal.onData((str) => {
  if (str === ENTER) currentLineLength = 0;
  window.electron.api.emit(`x-stdin-${id}`, str);
});

window.electron.api.on(`x-stdout-${id}`, (stdout: string) => {
  currentLineLength += stdout.length;
  terminal.write(stdout);
});

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

window.addEventListener('resize', resize);

function init(settings: Settings) {
  console.log('init');
  terminal.options = transformSettings(settings);
  parent.style.padding = settings.window.style.padding;
  resize();
  terminal.focus();

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

function resize() {
  fitAddon.fit();
  window.electron.api.emit(`x-term-resize-${id}`, String(terminal.cols), String(terminal.rows));
}

window.electron.api.settings.onChange(init);
