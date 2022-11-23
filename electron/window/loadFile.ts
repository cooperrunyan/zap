import { join } from 'path';
import { BrowserWindow } from 'electron';

export const loadFile = (win: BrowserWindow) => {
  if (process.env.NODE_ENV === 'development') win.loadURL(`http://localhost:${process.env.PORT || 3000}?id=${win.id}`);
  else
    win.loadFile(join(__dirname, `../client/index.html`), {
      query: { id: String(win.id) }
    });
};
