const {
    session,
    app,
    protocol,
    shell,
    BrowserWindow,
    ipcMain,
    nativeTheme,
    dialog,
    Notification,
    nativeImage
} = require("electron");
const path = require("path");
const url = require("url");
const keytar = require("keytar");
const {
    signOut,
    onAuthStateChanged,
    signInWithRedirect,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    browserLocalPersistence,
    setPersistence,
    GoogleAuthProvider,
    FacebookAuthProvider,
} = require("firebase/auth");
// const analytics = require("firebase/analytics");
const firebase = require("firebase/app");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
app.setName("Noduro");


function initializeFirebase() {
    const firebaseapp = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(firebaseapp);
    const analytics = null;
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    return { firebaseapp, auth, analytics, googleProvider, facebookProvider };
}


const iconPath = {
    darwin: path.join(__dirname, 'icon.icns'),
    win32: path.join(__dirname, 'icon.ico'),
    linux: path.join(__dirname, 'icon.png')
  };

let mainWindow;
// https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app REMEBER THIS FO PACKAGING
if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient("noduro", process.execPath, [
            path.resolve(process.argv[1]),
        ]);
    }
} else {
    app.setAsDefaultProtocolClient("noduro");
}
//The window
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
            nativeWindowOpen: true,
        },
        zoomToPageWidth: true,
        show: false,
        backgroundColor: "#2e2c29",
    });
    mainWindow.maximize();
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("index.html");

    // mainWindow.webContents.send('reset_scroll');
    //Change the css style based on the system preference
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = "light";
        } else {
            nativeTheme.themeSource = "dark";
        }
        return nativeTheme.shouldUseDarkColors;
    });
    ipcMain.handle("dark-mode:light", () => {
        nativeTheme.themeSource = "light";
    });
    ipcMain.handle("dark-mode:dark", () => {
        nativeTheme.themeSource = "dark";
    });
    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system";
    });

    ipcMain.handle('firebase:delete_local', async (event) => {
        try {
        const service = "noduro_accounts";
        const credentials = await keytar.findCredentials(service);
        const deletionPromises = credentials.map((credential) => {
            return keytar.deletePassword(service, credential.account);
          });
          await Promise.all(deletionPromises);
          return true;
        } catch (error) {
          console.error("Error deleting local accounts:", error);
          throw new Error("Failed to delete local accounts");
        }
      });
    //Firebase
    const {
        firebaseapp,
        auth: firebaseAuth,
        analytics: firebaseAnalytics,
        googleProvider: GoogleAuthProvider,
        facebookProvider: FacebookAuthProvider,
    } = initializeFirebase();


}
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} 
else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
        // the commandLine is array of strings in which last element is deep link url
        // the url str ends with /
        dialog.showErrorBox(
            "Welcome Back",
            `You arrived from: ${commandLine.pop().slice(0, -1)}`
        );
    });
    // Create mainWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
        const platform = process.platform;
        if (platform === 'darwin') var icon_img = iconPath.darwin;
        else if (platform === 'win32') var icon_img = iconPath.win32;
        else if (platform === 'linux') var icon_img = iconPath.linux;
        app.dock.setIcon(nativeImage.createFromPath(icon_img));
        createWindow();
        protocol.registerFileProtocol("noduro", (request, callback) => {
            const filePath = url.fileURLToPath(
                "file://" + request.url.slice("noduro://".length)
            );
            callback(filePath);
        });
        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });
}

app.on("open-url", (event, url) => {
    dialog.showErrorBox("Welcome Back", `You arrived from: ${url}`);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
