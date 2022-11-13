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
      background: settings.color.background,
      black: settings.color.black,
      blue: settings.color.blue,
      brightBlack: settings.color.lightBlack,
      brightBlue: settings.color.lightBlue,
      brightCyan: settings.color.lightCyan,
      brightGreen: settings.color.lightGreen,
      brightMagenta: settings.color.lightMagenta,
      brightRed: settings.color.lightRed,
      brightWhite: settings.color.lightWhite,
      brightYellow: settings.color.lightYellow,
      cursor: settings.cursor.color,
      cursorAccent: settings.cursor.accentColor,
      cyan: settings.color.cyan,
      foreground: settings.color.foreground,
      green: settings.color.green,
      red: settings.color.red,
      magenta: settings.color.magenta,
      selection: settings.color.selection,
      white: settings.color.white,
      yellow: settings.color.yellow
    }
  });
