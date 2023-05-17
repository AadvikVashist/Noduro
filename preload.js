const { contextBridge, ipcRenderer } = require("electron");
let darkmodeVal = localStorage.getItem("darkmode");
const fs = require("fs");
const path = require("path");


async function sign_in(email,password,user_signing_in){
    console.log("sign in request sent to preload");
    const user = await ipcRenderer.invoke("firebase:email_sign_in", email, password,user_signing_in);
    if (user[0]) {
        console.log("user signed in");
        localStorage.setItem("email", email);
        user[1] = JSON.parse(user[1]);
    } else {
        console.log("user sign in failed");
    }
    return user;
}

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
    },
    get_last_login: async (duration) => {
        const email = localStorage.getItem("email");
        if (email == null) {
            return true;
        }
        else{
            var login_string = await ipcRenderer.invoke("firebase:get_last_login", email)
            var last_login = parseInt(login_string);
            // console.log((Date.now() - last_login)/1000);
            if (Date.now() - last_login > duration*1000) {
                const signing_out = await ipcRenderer.invoke("firebase:email_sign_out", email);
                return true;
            }
            else{
                return false;
            }
        }
    },
    check_user_local: async () => {
        const email = localStorage.getItem("email");
        console.log("check user request sent to preload");
        const user =  await ipcRenderer.invoke("firebase:check_user_persist", email);
        const signed_in = await sign_in(email, user[1], false)
        if (signed_in[0] == true) {
            const user_info = await ipcRenderer.invoke("firebase:get_current_user_information", signed_in[1]);
            localStorage.setItem("first_name", user_info[1].first_name);
            return user_info;
        }
        else {
            return signed_in;
        }
    },
    email_sign_up: async (email, password, first_name, last_name, date_of_birth) => {
        console.log("sign up request sent to preload");
        const user = await ipcRenderer.invoke("firebase:email_sign_up", email, password, first_name, last_name, date_of_birth);
        console.log("sign up request in progress");
        
        if (user[0]) {
            localStorage.setItem("email", email);
            console.log("user signed up");
            user[1] = JSON.parse(user[1]);
        } else {
            console.log("user sign up failed");
        }
        return user;
    },
    email_sign_in: async (email, password) => {
        return await sign_in(email, password,true);
    },
    get_current_user: async( ) => {
        console.log("get user request sent to preload");
        const user = await ipcRenderer.invoke("firebase:get_current_user");
        if (user[0]) {
            console.log("user found");
            user[1] = JSON.parse(user[1]);
        } else {
            console.log("user not found");
        }
        return user;

    },
    get_current_user_information: () => {
        console.log("get user information sent to preload");
        ipcRenderer.invoke("firebase:get_current_user_information");
        console.log("get user information in progress");
        ipcRenderer.on("user_information", (event, user) => {
            if (user[0]) {
                console.log("user information found");
                return user[1];
            } else {
                console.log("user information not found");
                return user[1];
            }
        });
    },
    email_sign_out: () => {
        console.log("sign out request sent to preload");
        ipcRenderer.invoke("firebase:email_sign_out");
        console.log("sign out request in progress");
        ipcRenderer.on("sign_out", (event, user) => {
            if (user[0]) {
                console.log("user signed out");
                return user[1];
            } else {
                console.log("user sign out failed");
                return user[1];
            }
        });
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
    let image = null;
    for (const file of p) {
        const ext = path.extname(file).toLowerCase();
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif") {
            image = file;
            break; // stop searching after the first image is found
        }
    }

    // console.log(path.join("./lessons/", i, p[0]));
    lessons.push(path.join("./lessons/", i, image));

    // for (var ap in p) {
    //     // if (ap.includes(".png") || ap.includes(".jpg")) {
    //     lessons.push(path.join("./lessons/", i, ap));
    //     // }
    //     console.log(ap);
    // }
}
localStorage.setItem("files", JSON.stringify(files));
localStorage.setItem("lessons", JSON.stringify(lessons));


contextBridge.exposeInMainWorld("noduro_api", {
    start_video: (args, callback) => {
        ipcRenderer.send("start-python-script", args);
        const net = require('net');

        const client = net.connect({ port: 5000 }, () => {
            console.log('connected to server!');
        });

        client.on('data', (data) => {
            update_camera(`data:video/mp4;base64,${data.toString('base64')}`);
        });

        client.on('end', () => {
            console.log('disconnected from server');
        });
    }
});