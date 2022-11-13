import 'xterm/css/xterm.css';
import './style/base.scss';

import { start } from './start';

let settings = window.electron.api.settings.get();

start(settings);

window.electron.api.settings.onChange(() => {
  settings = window.electron.api.settings.get();
  start(settings);
});
