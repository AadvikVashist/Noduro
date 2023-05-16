const { contextBridge, ipcRenderer } = require("electron");
let darkmodeVal = localStorage.getItem("darkmode");

contextBridge.exposeInMainWorld("darkMode", {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    system: () => ipcRenderer.invoke("dark-mode:system"),
    dark: () => ipcRenderer.invoke("dark-mode:dark"),
    light: () => ipcRenderer.invoke("dark-mode:light"),
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
