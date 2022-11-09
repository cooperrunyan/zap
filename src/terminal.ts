import { Terminal } from 'xterm';

const settings = window.electron.api.settings.get();

export const terminal = new Terminal({
  rendererType: 'dom',
  cursorBlink: settings.cursor.blink,
  cursorStyle: settings.cursor.style as any,
  cursorWidth: settings.cursor.width,
  fontFamily: settings.font.family,
  fontSize: settings.font.size,
  fontWeight: settings.font.weight as any,
  fontWeightBold: settings.font.weightBold as any,
  letterSpacing: settings.font.letterSpacing,
  lineHeight: settings.font.lineHeight,
  windowsMode: settings.os === 'win32',
  theme: {
    background: settings.theme.backgroundColor,
    black: settings.theme.black,
    blue: settings.theme.blue,
    brightBlack: settings.theme.lightBlack,
    brightBlue: settings.theme.lightBlue,
    brightCyan: settings.theme.lightCyan,
    brightGreen: settings.theme.lightGreen,
    brightMagenta: settings.theme.lightMagenta,
    brightRed: settings.theme.lightRed,
    brightWhite: settings.theme.lightWhite,
    brightYellow: settings.theme.lightYellow,
    cursor: settings.cursor.color,
    cursorAccent: settings.cursor.accentColor,
    cyan: settings.theme.cyan,
    foreground: settings.theme.foregroundColor,
    green: settings.theme.green,
    red: settings.theme.red,
    magenta: settings.theme.magenta,
    selection: settings.theme.selectionColor,
    white: settings.theme.white,
    yellow: settings.theme.yellow
  }
});
