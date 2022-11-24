import { initWindow } from './initWindow'
import { TerminalComponent } from './TerminalComponent'
import { Settings } from '../electron/settings/SettingsManager'

import 'xterm/css/xterm.css'
import './style/base.scss'

const windowId = new URL(location.href).searchParams.get('windowId')!;
let dir = new URL(location.href).searchParams.get('dir');

dir = dir === 'undefined' ? '' : dir

window.electron.api.settings.onChange((settings: Settings) => initWindow(settings));

const parent = document.querySelector('#parent')! as HTMLDivElement;

new TerminalComponent(parent, windowId, dir ? dir : undefined)
