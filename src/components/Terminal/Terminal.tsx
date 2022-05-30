import React, { useEffect, useRef } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import style from './Terminal.module.scss';

export const Terminal: React.FC = () => {
  const term = useRef<XTerm>(null);
  const fitAddon = new FitAddon();
  const settings = window.electron.api.settings.get();
  const parent = useRef<HTMLDivElement>(null);

  const resize = () => {
    fitAddon.fit();
    const { cols, rows } = term.current!.terminal;
    window.electron.api.emit('x-term-resize', String(cols), String(rows));
  };

  useEffect(() => {
    parent.current!.style.padding = settings.window.style.padding;
    resize();

    window.electron.api.on('x-stdout', (stdout: string) => {
      term.current!.terminal.write(stdout);
    });
    window.addEventListener('resize', resize);

    return () => {
      window.electron.api.off('x-stdout');
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={style.parent} ref={parent}>
      <XTerm
        addons={[fitAddon]}
        ref={term}
        onData={(str) => window.electron.api.emit('x-stdin', str)}
        options={{
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
          // minimumContrastRatio: 5,
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
        }}
      />
    </div>
  );
};

const recieve = (str: string) =>
  console.log(`recieved "${str}", code: "${str.split('').map((char) => char.charCodeAt(0))}"`);
