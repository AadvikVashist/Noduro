
let firstnameVal = localStorage.getItem("firstname");
let lastnameVal = localStorage.getItem("lastname");
let displaynameVal = localStorage.getItem("displayname");
let darkmodeVal = localStorage.getItem("darkmode");
let dark_color = "linear-gradient(90deg, var(--theme-not-selected) 0%, var(--theme-half-selected) 33.33%, var(--theme-selected) 66.66%, var(--theme-selected) 100%)";
let light_color = "linear-gradient(90deg, var(--theme-selected) 0%, var(--theme-selected) 33.33%, var(--theme-half-selected) 66.66%, var(--theme-not-selected) 100%)";;
let system_color = "linear-gradient(90deg, var(--theme-not-selected) 0%, var(--theme-selected) 33.33%, var(--theme-selected) 66.66%, var(--theme-not-selected) 100%)";;

if (firstnameVal != null) {
    document.getElementById("firstname").value = firstnameVal;
}
if (lastnameVal != null) {
    document.getElementById("lastname").value = lastnameVal;
}
if (displaynameVal != null) {
    document.getElementById("displayname").value = displaynameVal;
}
if (darkmodeVal != null) {
    if (darkmodeVal == "Dark") {
        document.getElementById("toggle-button-3").classList.add("active");
        window.darkMode.dark();
        document.getElementById("triple-button").style.backgroundImage = dark_color;
    } else if (darkmodeVal == "Light") {
        document.getElementById("toggle-button-1").classList.add("active");
        window.darkMode.light();
        document.getElementById("triple-button").style.backgroundImage = light_color;
    } else {
        document.getElementById("toggle-button-2").classList.add("active");
        window.darkMode.system();
        document.getElementById("triple-button").style.backgroundImage = system_color;
            
    }
}
var theme_val = null;
function activateButton(button) {
    var id = button.getAttribute("id");
    button.classList.add("active");
    if (id == "toggle-button-3") {
        theme_val = "Dark";
        window.darkMode.dark();
        document.getElementById("triple-button").style.backgroundImage = dark_color;
    } else if (id == "toggle-button-1") {
        theme_val = "Light";
        window.darkMode.light();
        document.getElementById("triple-button").style.backgroundImage = light_color;
    } else {
        theme_val = "System";
        window.darkMode.system();
        document.getElementById("triple-button").style.backgroundImage = system_color;
    }

}

function deactivateButtons(buttons) {
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
}
var triStateToggleButtons = document.querySelectorAll(".theme-button button");
triStateToggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        deactivateButtons(triStateToggleButtons);
        activateButton(button);
    });
});

document.getElementById("buttons").addEventListener("click", async () => {
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const displayname = document.getElementById("displayname");
    if (firstname.value.length == 0) {
        localStorage.setItem("firstname", "");
    } else {
        localStorage.setItem("firstname", firstname.value);
    }
    if (lastname.value.length == 0) {
        localStorage.setItem("lastname", "");
    } else {
        localStorage.setItem("lastname", lastname.value);
    }

    if (displayname.value.length == 0) {
        localStorage.setItem("displayname", "");
    } else {
        localStorage.setItem("displayname", displayname.value);
    }

    if (theme_val != null) {
    localStorage.setItem("darkmode", theme_val);
    if (theme_val == "Dark") {
        await window.darkMode.dark();
        document.getElementById("triple-button").style.backgroundImage = dark_color;
    } else if (theme_val == "Light") {
        await window.darkMode.light();
        document.getElementById("triple-button").style.backgroundImage = light_color;
    } else {
        await window.darkMode.system();
        document.getElementById("triple-button").style.backgroundImage = system_color;
    }
    }
});

// document.getElementById("buttons").addEventListener("click", async () => {
//     const firstname = document.getElementById("firstname");
//     const lastname = document.getElementById("lastname");
//     const displayname = document.getElementById("displayname");
//     const darkmode = document.getElementById("darkmode");
//     localStorage.setItem("firstname", firstname.value);
//     localStorage.setItem("lastname", lastname.value);
//     localStorage.setItem("displayname", displayname.value);
//     localStorage.setItem("darkmode", darkmode.value);
//     if (darkmode.value == "Dark") {
//         await window.darkMode.dark();
//     } else if (darkmode.value == "Light") {
//         await window.darkMode.light();
//     } else {
//         await window.darkMode.system();
//     }
// });
