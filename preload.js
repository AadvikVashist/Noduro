const { contextBridge, ipcRenderer } = require("electron");
let darkmodeVal = localStorage.getItem("darkmode");

contextBridge.exposeInMainWorld("darkMode", {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    system: () => ipcRenderer.invoke("dark-mode:system"),
    dark: () => ipcRenderer.invoke("dark-mode:dark"),
    light: () => ipcRenderer.invoke("dark-mode:light"),
});
contextBridge.exposeInMainWorld("firebase", {
    sign_up: async (email, password) => {
        console.log("sign up request in preload");
        ipcRenderer.invoke("firebase:sign_up", email, password)
        console.log("sign up request in progress");
        ipcRenderer.on('user', (event, user) => {
            if (user[0]) {
                console.log("user request retrieved");
                return user[1];
            }
            else {
                console.log("user request failed");
                return user[1];
            }
        });
    },

    sign_in: async (email, password) => {
        ipcRenderer.invoke("firebase:sign_in", email, password);
        ipcRenderer.on('user', (event, user) => {
            if (user[0]) {
                console.log("user request retrieved");
                console.log(JSON.stringify(user[1]));
                const string = JSON.stringify(user[1]);
                sessionStorage.setItem("user", string);
            } else {
                console.log("user request failed");
                reject(JSON.stringify(user[1]));
            }
        });
    },
    google_sign_in: async () => {
        ipcRenderer.invoke("firebase:google_sign_in");
        ipcRenderer.on('user', (event, user) => {
            if (user[9]) {
                console.log("user request retrieved");
                return user;
            }
            else {
                console.log("user request failed");
                return user;
            }
        });
    },
    get_current_user: async () => {
        return new Promise((resolve, reject) => {
            ipcRenderer.invoke('firebase:get_current_user');
            ipcRenderer.on('user', (event, user) => {
                if (user[0]) {
                    console.log('current user found');
                    const string = JSON.stringify(user[1]);
                    sessionStorage.setItem('current_user', string);
                    resolve(user[1]);
                } else {
                    console.log('no current user');
                    reject(JSON.stringify(user[1]));
                }
            });
        });
        },
            sign_out: async () => {
                ipcRenderer.invoke("firebase:sign_out");
                ipcRenderer.on('sign_out', (event, user) => {
                    if (user[0]) {
                        console.log("signed out");
                    } else {
                        console.log("sign out failed");
                    }
                });
            },
});

// Code that forces the system mode rather than a default of white. Reflects user preference, but open to change.
const fs = require("fs");
const { Session } = require("inspector");
const path = require("path");
var files = fs.readdirSync("./lessons/");
var lessons = [];
// console.log(files);
for (var i in files) {
    var p = fs.readdirSync(path.join("./lessons/", i));
    // console.log(path.join("./lessons/", i, p[0]));
    lessons.push(path.join("./lessons/", i, p[0]));

    // for (var ap in p) {
    //     // if (ap.includes(".png") || ap.includes(".jpg")) {
    //     lessons.push(path.join("./lessons/", i, ap));
    //     // }
    //     console.log(ap);
    // }
}
localStorage.setItem("files", JSON.stringify(files));
localStorage.setItem("lessons", JSON.stringify(lessons));
