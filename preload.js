const { contextBridge, ipcRenderer } = require('electron')
let darkmodeVal = localStorage.getItem('darkmode');

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
  dark: () => ipcRenderer.invoke('dark-mode:dark'),
  light: () => ipcRenderer.invoke('dark-mode:light')
})
// Code that forces the system mode rather than a default of white. Reflects user preference, but open to change. 

