const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

// Code that forces the system mode rather than a default of white. Reflects user preference, but open to change. 
ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})