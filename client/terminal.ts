import { Terminal } from 'xterm';

export const createTerminal = (settings: ReturnType<typeof window.electron.api.settings.get>) =>
  new Terminal({
    rendererType: 'canvas',
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
      background: settings.compositeTheme.background,
      black: settings.compositeTheme.black,
      blue: settings.compositeTheme.blue,
      brightBlack: settings.compositeTheme.lightBlack,
      brightBlue: settings.compositeTheme.lightBlue,
      brightCyan: settings.compositeTheme.lightCyan,
      brightGreen: settings.compositeTheme.lightGreen,
      brightMagenta: settings.compositeTheme.lightMagenta,
      brightRed: settings.compositeTheme.lightRed,
      brightWhite: settings.compositeTheme.lightWhite,
      brightYellow: settings.compositeTheme.lightYellow,
      cursor: settings.cursor.color,
      cursorAccent: settings.cursor.accentColor,
      cyan: settings.compositeTheme.cyan,
      foreground: settings.compositeTheme.foreground,
      green: settings.compositeTheme.green,
      red: settings.compositeTheme.red,
      magenta: settings.compositeTheme.magenta,
      selection: settings.compositeTheme.selection,
      white: settings.compositeTheme.white,
      yellow: settings.compositeTheme.yellow
    }
  });
