const { contextBridge, ipcRenderer } = require("electron");
let darkmodeVal = localStorage.getItem("darkmode");
const fs = require("fs");
const path = require("path");

contextBridge.exposeInMainWorld("darkMode", {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    system: () => ipcRenderer.invoke("dark-mode:system"),
    dark: () => ipcRenderer.invoke("dark-mode:dark"),
    light: () => ipcRenderer.invoke("dark-mode:light"),
});

contextBridge.exposeInMainWorld("firebase", {
    delete_local_accounts: () => {
        try {
            ipcRenderer.invoke("firebase:delete_local")
            return true;
        }
        catch{
            console.log("Error deleting local accounts");
            return false;
        }
    }
});
contextBridge.exposeInMainWorld("noduro", {
    readJSONFile: (filePath) => {
        try {
            const data = fs.readFileSync(path.join(__dirname + filePath), 'utf-8');
            const jsonObject = JSON.parse(data);
            return jsonObject;
        } catch (error) {
            throw new Error('File does not exist');
        }
    },
    writeJSONFile: (filePath,content) => {
        try {
            fs.writeFileSync(path.join(__dirname + filePath), content);
            console.log('Object saved as JSON:', filePath);
        } catch (error) {
            console.error('Error saving object as JSON:', error);
        }
    }
});



// Code that forces the system mode rather than a default of white. Reflects user preference, but open to change.

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
