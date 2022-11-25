import { TerminalComponent } from "./TerminalComponent";

const terminalParent = document.querySelector('#parent')! as HTMLDivElement;
const settingsElement = document.querySelector('.settings')! as HTMLDivElement;
const closeSettingsButton = document.querySelector('.close-settings')! as HTMLButtonElement


closeSettingsButton.addEventListener('click', e => {
  e.preventDefault()
  closeSettings()
})

export function openSettings() {
  terminalParent.style.opacity = '0'
  terminalParent.style.pointerEvents = 'none'
  settingsElement.style.opacity = '1'
  settingsElement.style.pointerEvents = 'unset' 
  settingsElement.focus()
}

function closeSettings() {
  terminalParent.style.opacity = '1'
  terminalParent.style.pointerEvents = 'unset'
  settingsElement.style.opacity = '0'
  settingsElement.style.pointerEvents = 'none' 
  settingsElement.blur()
  TerminalComponent.components[0]?.focus()
}
