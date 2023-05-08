// const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
// const {ipcMain} = require('electron')

let firstnameVal = localStorage.getItem("firstname");
let lastnameVal = localStorage.getItem("lastname");
let displaynameVal = localStorage.getItem("displayname");
let darkmodeVal = localStorage.getItem("darkmode");

// if (firstnameVal != null) {
//     document.getElementById("firstname").value = firstnameVal;
// }
// if (lastnameVal != null) {
//     document.getElementById("lastname").value = lastnameVal;
// }
// if (displaynameVal != null) {
//     document.getElementById("displayname").value = displaynameVal;
// }
if (darkmodeVal != null) {
    document.getElementById("darkmode").value = darkmodeVal;

    if (darkmodeVal == "Dark") {
        window.darkMode.dark();
    } else if (darkmodeVal == "Light") {
        window.darkMode.light();
    } else {
        window.darkMode.system();
    }
}

document.getElementById("dark_button").addEventListener("click", async () => {
    window.darkMode.dark();
});
document.getElementById("light_button").addEventListener("click", async () => {
    window.darkMode.light();
});
document.getElementById("system_button").addEventListener("click", async () => {
    window.darkMode.system();
});


document.getElementById("buttons").addEventListener("click", async () => {
    // const firstname = document.getElementById("firstname");
    // const lastname = document.getElementById("lastname");
    // const displayname = document.getElementById("displayname");
    const darkmode = document.getElementById("darkmode");
    // if (firstname.value.length == 0) {
    //     localStorage.setItem("firstname", "");
    // }
    // else{
    //     localStorage.setItem("firstname", firstname.value);
    
    // if (lastname.value.length == 0) {
    //     localStorage.setItem("lastname", "");
    // }
    // else{
    //     localStorage.setItem("lastname", lastname.value);
    // }

    // if (displayname.value.length == 0) {
    //     localStorage.setItem("displayname", "");
    // }
    // else{
    //     localStorage.setItem("displayname", displayname.value);
    // }

    localStorage.setItem("darkmode", darkmode.value);


    if (darkmode.value == "Dark") {
        await window.darkMode.dark();
    } else if (darkmode.value == "Light") {
        await window.darkMode.light();
    } else {
        await window.darkMode.system();
    }
});

