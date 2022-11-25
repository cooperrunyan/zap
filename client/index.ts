import { initWindow } from './initWindow';
import { TerminalComponent } from './TerminalComponent';
import { Settings } from '../electron/settings/SettingsManager';
import { params } from './params'
import { openSettings } from './openSettings';

import 'xterm/css/xterm.css';
import './style/base.scss';

window.electron.api.settings.onChange((settings: Settings) => initWindow(settings));

const parent = document.querySelector('#parent')! as HTMLDivElement;

new TerminalComponent(parent, params.windowId, params.dir ? params.dir : undefined);

if (params.openSettingsInitially) openSettings()

window.addEventListener('keydown', (e) => {
  if (e.metaKey && e.key === ',') openSettings()
})
