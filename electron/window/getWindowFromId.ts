import { BrowserWindow } from 'electron';

export function getWindowFromId(id: string) {
  return BrowserWindow.getAllWindows().filter((win) => win.id === +id)[0];
}
