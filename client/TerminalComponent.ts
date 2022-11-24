import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

import { transformSettings } from './transformSettings';
import { Settings } from '../electron/settings/SettingsManager';

import { Terminal } from 'xterm';

export class TerminalComponent {
  static components: TerminalComponent[] = [];

  private fitAddon!: FitAddon;
  private webLinksAddon!: WebLinksAddon;
  private terminal!: Terminal;

  private terminalId!: string;

  constructor(private parent: HTMLDivElement, private windowId: string, private terminalDir?: string) {
    TerminalComponent.components.push(this);
    this.setup();
  }

  async setup() {
    this.terminal = new Terminal(transformSettings(window.electron.api.settings.get()));
    this.terminalId = await window.electron.api.fetchTerminal(this.windowId, this.terminalDir);

    this.fitAddon = new FitAddon();
    this.webLinksAddon = new WebLinksAddon((_, url) => window.electron.api.openUrl(url));

    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(this.webLinksAddon);

    this.terminal.attachCustomKeyEventHandler((e) => this.customKeyEventHandler(e));

    this.attach();
  }

  attach() {
    this.parent.insertAdjacentHTML('beforeend', `<div class="terminal-wrapper" id="${this.terminalId}"></div>`);

    this.terminal.open(document.getElementById(this.terminalId)!);

    this.terminal.onData((str: string) => {
      window.electron.api.emit(`x-stdin-${this.terminalId}`, str);
    });

    window.electron.api.on(`x-stdout-${this.terminalId}`, (stdout: string) => {
      this.terminal.write(stdout);
    });

    window.addEventListener('resize', () => this.resize());

    window.electron.api.settings.onChange((settings: Settings) => this.init(settings));
  }

  init(settings: Settings) {
    this.terminal.options = transformSettings(settings);
    this.parent.style.padding = settings.window.style.padding;
    this.resize();
    this.terminal.focus();
  }

  private customKeyEventHandler(e: KeyboardEvent) {
    if (e.metaKey && e.type === 'keydown') {
      if (e.key === 'Backspace') {
        window.electron.api.emit(`x-stdin-${this.terminalId}`, '\x15');
        return false;
      }
      if (e.key === 'ArrowLeft') {
        window.electron.api.emit(`x-stdin-${this.terminalId}`, '\x01');
        return false;
      }
      if (e.key === 'ArrowRight') {
        window.electron.api.emit(`x-stdin-${this.terminalId}`, '\x05');
        return false;
      }
    }

    return true;
  }

  public resize() {
    this.fitAddon.fit();
    window.electron.api.emit(
      `x-term-resize-${this.terminalId}`,
      String(this.terminal.cols),
      String(this.terminal.rows)
    );
  }
}
