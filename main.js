const {
    session,
    app,
    protocol,
    shell,
    BrowserWindow,
    ipcMain,
    nativeTheme,
    dialog,
} = require("electron");
const path = require("path");
const url = require("url");

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
const analytics = require("firebase/analytics");
const firebase = require("firebase/app");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

const firebaseConfig = {
    apiKey: "AIzaSyDB6ZzWpHF3da9XgrgkQEWoehKdcYSQClI",
    authDomain: "noduro-29c67.firebaseapp.com",
    projectId: "noduro-29c67",
    storageBucket: "noduro-29c67.appspot.com",
    messagingSenderId: "619458371418",
    appId: "1:619458371418:web:56cba5ef57cd3d7a87dd63",
    measurementId: "G-ZY59G5CRXR",
};

function initializeFirebase() {
    const firebaseapp = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(firebaseapp);
    const analytics = null;
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    return { firebaseapp, auth, analytics, googleProvider, facebookProvider };
}

// let childWindow = null;
// function signInWithGoogle(auth,provider) {
//     // check if child window already exists
//     if (childWindow) {
//         childWindow.focus()
//         return
//       }
//       // create the child window
//       childWindow = new BrowserWindow({
//         width: 600,
//         height: 400,
//         parent: mainWindow, // set the parent window
//         modal: true, // make the child window modal
//         webPreferences: {
//           nodeIntegration: true // enable node integration in the child window
//         }
//       })
//       // load a custom URL in the child window
//       ichildWindow.once("ready-to-show", () => {
//         childWindow.show();
//     });
//     childWindow.loadFile('./src/firebase/index.html')

//       // handle window close event
//       childWindow.on('closed', () => {
//         childWindow = null
//       })
  
// }  



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

    //Firebase
    const {
        firebaseapp,
        auth: firebaseAuth,
        analytics: firebaseAnalytics,
        googleProvider: GoogleAuthProvider,
        facebookProvider: FacebookAuthProvider,
    } = initializeFirebase();

//     ipcMain.handle("firebase:sign_up", (event, email, password) => {
//         createUserWithEmailAndPassword(firebaseAuth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 event.sender.send("sign_up", [true, user]);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//                 event.sender.send("sign_up", [false, error]);
//             });
//     });

//     ipcMain.handle("firebase:sign_in", (event, email, password) => {
//         setPersistence(firebaseAuth, browserLocalPersistence)
//             .then(() => {
//                 // Existing and future Auth states are now persisted in the current
//                 // session only. Closing the window would clear any existing state even
//                 // if a user forgets to sign out.
//                 // ...
//                 // New sign-in will be persisted with session persistence.
//                 signInWithEmailAndPassword(firebaseAuth, email, password)
//                     .then((userCredential) => {
//                         // Signed in
//                         const user = userCredential.user;
//                         event.sender.send("sign_in", [true, user.toJSON()]);
//                         // ...
//                     })
//                     .catch((error) => {
//                         const errorCode = error.code;
//                         const errorMessage = error.message;
//                         event.sender.send("sign_in", [false, error.toJSON()]);
//                     });
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 event.sender.send("sign_in", error);
//             })
//         });

//     ipcMain.handle("firebase:google_sign_in", (event) => {
//         // signInWithGoogle(firebaseAuth, GoogleAuthProvider)
//         session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//             details.requestHeaders['Origin'] = 'https://<YOUR_AUTH_DOMAIN>';
//             callback({ cancel: false, requestHeaders: details.requestHeaders });
//           });
//           fsignInWithRedirect(firebaseAuth, GoogleAuthProvider)
//             .then((result) => {
//                 // Accounts successfully linked.
//                 const credential =
//                     GoogleAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;
//                 const user = result.user;
//                 event.sender.send("sign_in", [true, user]);
//                 // ...
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // The email of the user's account used.
//                 const email = error.customData.email;
//                 // The AuthCredential type that was used.
//                 // ...
//                 event.sender.send("sign_in", [false, error]);
//             });
//     });

    ipcMain.handle("firebase:get_current_user", (event) => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                event.sender.send("user", [true, user.uid])
              // ...
            } else {
                event.sender.send("user", [false, "not_signed_in"])
              // User is signed out
              // ...
            }
        });
    });

//     ipcMain.handle("firebase:set_persistence", (event, email, password) => {
//         setPersistence(firebaseAuth, browserLocalPersistence)
//             .then(() => {
//                 // Existing and future Auth states are now persisted in the current
//                 // session only. Closing the window would clear any existing state even
//                 // if a user forgets to sign out.
//                 // ...
//                 // New sign-in will be persisted with session persistence.
//                 return signInWithEmailAndPassword(auth, email, password);
//             })
//             .catch((error) => {
//                 // Handle Errors here.
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//             });
//     });

//     ipcMain.handle("firebase:sign_out", (event) => {
//         signOut(firebaseAuth)
//             .then(() => {
//                 event.sender.send("sign_out", true)
//                 // Sign-out successful.
//             })
//             .catch((error) => {
//                 event.sender.send("sign_out", false)
//                 // An error happened.
//             });
//     });
};
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
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
