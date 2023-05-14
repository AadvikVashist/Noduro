const {
    session,
    app,
    protocol,
    shell,
    BrowserWindow,
    ipcMain,
    nativeTheme,
    dialog,
    safeStorage,
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
const {spawn} = require("child_process");
const keytar = require('keytar')
let pythonProcess = null;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
var admin = require("firebase-admin");






const firebaseConfig = require("./src/firebase/firebaseConfig.json");
var serviceAccount = require("./src/firebase/firebaseAdmin.json");
const firestoreConfig = {credential: admin.credential.cert(serviceAccount)};


function initializeFirebase() {
    
    const firebaseapp = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(admin.initializeApp(firestoreConfig));
    const auth = getAuth(firebaseapp);
    const analytics = null;
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    return { firebaseapp, db, auth, analytics, googleProvider, facebookProvider };
}

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
        nodeIntegration: true,
        zoomToPageWidth: true,
        show: false,
        backgroundColor: "#2e2c29",
    });
    mainWindow.maximize();
    mainWindow.once("ready-to-show", () => {
        mainWindow.webContents.openDevTools();
        mainWindow.show();
    });

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
        db: firestore,
        auth: firebaseAuth,
        analytics: firebaseAnalytics,
        googleProvider: GoogleAuthProvider,
        facebookProvider: FacebookAuthProvider,
    } = initializeFirebase();


      // Add a new document in collection "cities" with ID 'LA'
    ipcMain.handle("firebase:get_last_login", async(event, email) => {
        return await keytar.getPassword('noduro_accounts', email + "_time");
    });

    ipcMain.handle("firebase:check_user_persist", async (event,email) => {
        try{
            const secret = await keytar.getPassword('noduro_accounts', email);
            return [true, secret];
        }
        catch(error){
            return [false, error];
        }
    });

    ipcMain.handle("firebase:email_sign_up", async (event, email, password, first_name, last_name, date_of_birth) => {
        try{
            const user_cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const userRef = await firestore.collection('users').doc(user_cred.user.uid).set({
                email_address: email,
                first_name: first_name,
                last_name: last_name,
                date_of_birth: date_of_birth,
            })
            await keytar.setPassword('noduro_accounts', email, password);
            await keytar.setPassword('noduro_accounts', email + "_time", Date.now().toString());

            const user = JSON.stringify(user_cred.user);
            return [true, user];
        }
        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            return [false, error];
        }
    });
    ipcMain.handle("firebase:email_sign_in", async (event, email, password,user_signing_in) => {
        try {
            await setPersistence(firebaseAuth, browserLocalPersistence);
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            keytar.setPassword('noduro_accounts', email, password);
            if (user_signing_in){
            await keytar.setPassword('noduro_accounts', email + "_time", Date.now().toString());
            }
            const user = JSON.stringify(userCredential.user);
            return [true, user];
        } catch (error) {
            return [false, error];
        }
    });
    ipcMain.handle("firebase:get_current_user", async (event) => {
        return new Promise((resolve) => {
            onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                const user_send = JSON.stringify(user);
                resolve([true, user_send]);
            } else {
                resolve([false, "user_not_found"]);
            }
        });
        });
    });
    ipcMain.handle("firebase:get_current_user_information", async (event,user) => {
        const userRef = await firestore.collection('users').doc(user.uid).get();
        if (userRef.exists) {
            // var x = {...user, ...userRef.data()}
            return [true, {...user, ...userRef.data()}];
        }
        else {
            return [false, "user_firestore_data_not_found"];
        }
    });
    ipcMain.handle("firebase:email_sign_out", async (event, email) => {
        try{ 
            signOut(firebaseAuth)
            keytar.deletePassword('noduro_accounts', email);
            return true;
        }
        catch(error){
            return error;
        }
        
    });

    ipcMain.on('start-python-script', async (event, arg) => {
        pythonProcess = spawn('python3', [path.join(__dirname, 'python/run.py')])
    });

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
    pythonProcess.kill();
    if (process.platform !== "darwin") {
        app.quit();
    }
});
