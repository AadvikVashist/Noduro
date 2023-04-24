const { app, protocol, shell, BrowserWindow, ipcMain, nativeTheme, dialog  } = require('electron')
const path = require('path')
const url = require('url')
let mainWindow
// https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app REMEBER THIS FO PACKAGING
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('noduro', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('noduro')
} 
//The window
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        nativeWindowOpen: true
      }
  })
  mainWindow.webContents.openDevTools()



  mainWindow.loadFile('index.html')
  //Change the css style based on the system preference
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  }) 
  ipcMain.handle('dark-mode:light', () => {
    nativeTheme.themeSource = 'light'
    
  })
  ipcMain.handle('dark-mode:dark', () => {
    nativeTheme.themeSource = 'dark'
    
  })
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

}
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
    // the commandLine is array of strings in which last element is deep link url
    // the url str ends with /
    dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop().slice(0, -1)}`)
  })

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow()
    protocol.registerFileProtocol('noduro', (request, callback) => {
      const filePath = url.fileURLToPath('file://' + request.url.slice('noduro://'.length))
      callback(filePath)
    })
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
    
  })
}


app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})