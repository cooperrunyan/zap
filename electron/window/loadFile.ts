import { join } from 'path';
import { BrowserWindow } from 'electron';

export const loadFile = (win: BrowserWindow, dir?: string) => {
  if (process.env.NODE_ENV === 'development')
    win.loadURL(`http://localhost:${process.env.PORT || 3000}?windowId=${win.id}&dir=${dir}`);
  else
    win.loadFile(join(__dirname, `../../client/index.html`), {
      query: {
        windowId: String(win.id),
        dir: String(dir)
      }
    });
};
