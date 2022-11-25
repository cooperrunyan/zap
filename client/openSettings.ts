import { TerminalComponent } from "./TerminalComponent";
import settingsSchema from '../settings-schema.json'

const terminalParent = document.querySelector('#parent')! as HTMLDivElement;
const settingsElement = document.querySelector('.settings')! as HTMLDivElement;
const settingsContentElement = document.querySelector('.settings .mainContent')! as HTMLDivElement;
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

for (const [key, section] of Object.entries(settingsSchema.properties)) {  
  settingsContentElement.insertAdjacentHTML('beforeend', htmlForSection(section, key))
}

function htmlForSection(section: any, key: string): string {
  return !section.properties ? htmlForItem(section, key) : `<div class="section">
  <div class="title">
    <h2>${section.title}</h2>
    <p>${section.description}</p>
  </div>
  <div class="content">
    ${Object.entries(section.properties).map(([k, s]) => htmlForItem(s, key + '.' + k)).join('\n')} 
  </div>
</div>`
}


type ItemType = 'array' | 'boolean' | 'null' | 'integer' | 'number' | 'object' | 'string'

function htmlForItem(item: any, key: string): string {
  const type: ItemType = item.type

  if (type === 'boolean') return `<label class="item" for="${key}">
    <h6>${item.title}</h2>
    <div class="checkbox-item-content">
      <input id="${key}" type="checkbox" ${item.default === 'true' ? 'checked' : ''}} />
      <label for="${key}">
        <div class="content">
          <code>*</code>
        </div>
      </label>
      <p>${item.description}</p>
    </div>
  </label>
`

  return `<label class="item" for="${key}">
  <h6>${item.title}</h2>
  <p>${item.description}</p>
  ${
    item.enum ? enumInput(item, key) :
    type === 'string' ? stringInput(item, key) : 
    type === 'number' || type === 'integer' ? numberInput(item, key, type === 'integer') : 
    type === 'array' ? arrayInput(item, key) : ''
  }
</label>
`
}

function stringInput(item: any, key: string) {
  return `<div class="input">
    <input id=${key} placeholder="${item.default}" value="${item.default}"/>
  </div>` 
}

function numberInput(item: any, key: string, isInt: boolean) {
  return `<div class="input number">
    <input id="${key}" ${isInt ? 'step="1"' : '' } type="number" placeholder="${item.default}" value="${item.default}"/>
  </div>`
}

function arrayInput(item: any, key: string) {
  return 'ARRAY INPUT'
}

function enumInput(item: any, key: string) {
  return 'ENUM INPUT'
}
