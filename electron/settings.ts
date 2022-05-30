import * as fs from 'fs-extra';
import * as yaml from 'yaml';
import { platform } from 'os';

type Settings = ReturnType<typeof defaultSettings>;

export class SettingsManager {
  settingsPath = `${process.env.HOME}/.zaprc.yml`;

  constructor() {
    this.getSettings();
  }

  getSettings(): Settings {
    fs.ensureFileSync(this.settingsPath);
    const customSettings = yaml.parse(fs.readFileSync(this.settingsPath, 'utf-8')) || {};

    return merge(customSettings, defaultSettings() as any) as Settings;
  }

  setSettings(val: Partial<Settings>) {
    fs.writeFileSync(this.settingsPath, yaml.stringify(val));
  }
}

export function merge(x: Obj, master: Obj) {
  for (const [k, v] of Object.entries(master)) {
    if (x[k] === undefined) {
      x[k] = v;
      continue;
    }

    if (typeof v === 'object') {
      if (typeof x[k] === 'string') x[k] = v;
      else merge(x[k] as Obj, v as Obj);
    }
  }
  return x;
}

type Obj = { [key: string]: (string | boolean | number | any[]) | object };

export const defaultSettings = () => ({
  window: {
    style: {
      padding: '2px 6px 6px 14px',
      opacity: 1,
      showShadow: true,
      vibrancy: undefined
    },
    dimensions: {
      initialWidth: 1575,
      initialHeight: 775,
      minHeight: 190,
      minWidth: 370,
      maxWidth: undefined,
      maxHeight: undefined
    },
    position: {
      center: true,
      initial: {
        x: undefined,
        y: undefined
      }
    },

    can: {
      move: true,
      maximize: true,
      minimize: true,
      resize: true,
      close: true,
      beLargerThanScreen: false
    },

    useNativeAppBar: false,
    acceptFirstMouse: false,
    remainOnTop: false,
    paintWhenInitiallyHidden: true,
    showInitially: true
  },

  theme: {
    foregroundColor: '#ccd5e5',
    backgroundColor: '#000',
    selectionColor: '#1e2025',

    black: '#000',
    lightBlack: '#49525f',
    red: '#ff5562',
    lightRed: '#ff5562',
    green: '#8dcf5e',
    lightGreen: '#8dcf5e',
    blue: '#4da5ff',
    lightBlue: '#4da5ff',
    yellow: '#d09953',
    lightYellow: '#d09953',
    magenta: '#cf62ff',
    lightMagenta: '#cf62ff',
    cyan: '#46c3d9',
    lightCyan: '#46c3d9',
    white: '#abb2bf',
    lightWhite: '#fff'
  },

  cursor: {
    color: '#fff',
    accentColor: '#000',
    width: 1, // px (only when style is bar)
    style: 'bar', // bar, block, underline
    blink: true
  },

  shell: {
    name: 'zsh',
    shellArgs: ['--login']
  },

  font: {
    family: 'Consolas, "Roboto Mono", Menlo, monospace',
    size: 14,
    weight: 'normal', // valid css font-weight
    weightBold: 'bold', // valid css font-weight
    lineHeight: 1.2,
    letterSpacing: -0.01 // px
  },

  dark: true,
  os: platform()
});
