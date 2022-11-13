import 'xterm/css/xterm.css';
import './style/base.scss';

import { start } from './start';

let settings = window.electron.api.settings.get();

console.log(settings);
start(settings);

window.electron.api.settings.onChange(() => {
  console.log('refresh');
  settings = window.electron.api.settings.get();
  start(settings);
});
