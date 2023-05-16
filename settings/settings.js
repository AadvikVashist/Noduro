let dark_color =
    "linear-gradient(90deg, var(--theme-not-selected) 0%, var(--theme-half-selected) 33.33%, var(--theme-selected) 66.66%, var(--theme-selected) 100%)";
let light_color =
    "linear-gradient(90deg, var(--theme-selected) 0%, var(--theme-selected) 33.33%, var(--theme-half-selected) 66.66%, var(--theme-not-selected) 100%)";
let system_color =
    "linear-gradient(90deg, var(--theme-not-selected) 0%, var(--theme-selected) 33.33%, var(--theme-selected) 66.66%, var(--theme-not-selected) 100%)";

const commonResolutions = [
    [1280, 720],    // 720p
    [1366, 768],    // WXGA
    [1600, 900],    // HD+
    [1920, 1080],   // 1080p (Full HD)
    [2048, 1080],   // 2K (DCI)
    [2560, 1440],   // 1440p (QHD)
    [2560, 1600],   // 1600p (WQXGA)
    [3440, 1440],   // UWQHD (Ultra-Wide QHD)
    [3840, 1600],   // 1600p Ultrawide
    [3840, 2160],   // 4K (Ultra HD)
    [5120, 2880],   // 5K (Ultra HD+)
    [7680, 4320]    // 8K (Full Ultra HD)
    ];
    
//DEFAULT VALUES

localStorage.removeItem("settings");

if (localStorage.getItem("settings") == null) {
    var settings = {
        visual : {
            darkmode: "System",
        },
        video : {
            resolution : [1920, 1080],
            flipVideo : true,
            lowLight : 10,
            autofocus: true,
        },
        audio : {
            master_volume : 100,
            sound_effects_volume : 70,
            teacher_volume : 60,
            urgent_volume : 50,

        }
    };
} else {
    var settings = JSON.parse(localStorage.getItem("settings"));
}

if (settings.darkmode != null) {
    if (settings.darkmode == "Dark") {
        document.getElementById("toggle-button-3").classList.add("active");
        window.darkMode.dark();
        document.getElementById("triple-button").style.backgroundImage =
            dark_color;
    } else if (settings.darkmode == "Light") {
        document.getElementById("toggle-button-1").classList.add("active");
        window.darkMode.light();
        document.getElementById("triple-button").style.backgroundImage =
            light_color;
    } else {
        document.getElementById("toggle-button-2").classList.add("active");
        window.darkMode.system();
        document.getElementById("triple-button").style.backgroundImage =
            system_color;
    }
} else {
    document.getElementById("toggle-button-2").classList.add("active");
    window.darkMode.system();
    document.getElementById("triple-button").style.backgroundImage =
        system_color;
}

var theme_val = null;
var triStateToggleButtons = document.querySelectorAll(".theme-button button");
function activateButton(button) {
    var id = button.getAttribute("id");
    button.classList.add("active");
    if (id == "toggle-button-3") {
        theme_val = "Dark";
        window.darkMode.dark();
        document.getElementById("triple-button").style.backgroundImage =
            dark_color;
    } else if (id == "toggle-button-1") {
        theme_val = "Light";
        window.darkMode.light();
        document.getElementById("triple-button").style.backgroundImage =
            light_color;
    } else {
        theme_val = "System";
        window.darkMode.system();
        document.getElementById("triple-button").style.backgroundImage =
            system_color;
    }
}

function deactivateButtons(buttons) {
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
}

triStateToggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        deactivateButtons(triStateToggleButtons);
        activateButton(button);
    });
});





const videoElement = document.getElementById("camera_test");

const flipVideo = document.getElementById("flipVideo");
if (settings.video.autofocus == true) document.getElementById("focus").checked = true;

if (settings.video.lowLight == -1) document.getElementById("lowLightCheckbox").checked = false;
else document.getElementById("lowLightSlider").value = settings.video.lowLight; document.getElementById("lowLightSlider").classList.add('show'); document.getElementById("lowLightCheckbox").checked = true;

document.getElementById("mainVolumeSlider").value = settings.audio.master_volume;
document.getElementById("sfxSlider").value = settings.audio.sound_effects_volume;
document.getElementById("teacherVolume").value = settings.audio.teacher_volume;
document.getElementById("urgentVolume").value = settings.audio.urgent_volume;
// Check if the browser supports getUserMedia API

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = function () {
        videoElement.play();

        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();

        // Retrieve the supported resolutions
        const res_width = capabilities.width.max;
        const res_height = capabilities.height.max;
        function populateDropdown(res_width,res_height,element) {
            const resolutions = commonResolutions.filter(([width, height]) => width <= res_width && height <= res_height);
            const dropdown = document.getElementById(element);
            const selection = settings.video.resolution[0] +"x"+ settings.video.resolution[1];
            resolutions.forEach(([width, height]) => {
                const option = document.createElement('option');
                option.value = `${width}x${height}`;
                option.text = `${width}x${height}`; //(${width * height} pixels)
                dropdown.appendChild(option);
            });
            for (var i = 0; i < dropdown.options.length; i++) {
                // Check if the value of the current option matches the desired value
                if (dropdown.options[i].value === selection) {
                  // If so, set the selectedIndex property to the index of the current option
                    dropdown.selectedIndex = i;
                    break; // Exit the loop
                }
            }
        }

        populateDropdown(res_width,res_height,'resolution');
        // Populate the dropdown with the supported resolutions

        };
    })
    .catch(function (error) {
    console.error('Error accessing the webcam:', error);
});


// Function to flip the video horizontally
function flip() {
    videoElement.style.transform = flipVideo.checked ? "scaleX(-1)" : "scaleX(1)";
}

flipVideo.addEventListener("change", flip);

//animate box to appear
const lowLightCheckbox = document.getElementById('lowLightCheckbox');
const lowLightSlider = document.getElementById('lowLightSlider');
lowLightCheckbox.addEventListener('change', function () {
  if (lowLightCheckbox.checked) {
    lowLightSlider.classList.add('show');
  } else {
    lowLightSlider.classList.remove('show');
  }
});



var isPageDirty = false;
function setDirty() {
  isPageDirty = true;
}

// Function to set the page dirty flag when changes are made

// Attach event listener to detect changes on inputs, selects, and textareas
var formElements = document.querySelectorAll('.option');
for (var i = 0; i < formElements.length; i++) {
  formElements[i].addEventListener('change', setDirty);
}
/*
var theme_val

document.getElementById("resolution").selectedIndex
const flipVideo = document.getElementById("flipVideo");
document.getElementById("focus").checked
document.getElementById("lowLightSlider").value = settings.video.lowLight

document.getElementById("mainVolumeSlider").value = settings.audio.master_volume;
document.getElementById("sfxSlider").value = settings.audio.sound_effects_volume;
document.getElementById("teacherVolume").value = settings.audio.teacher_volume;
document.getElementById("urgentVolume").value = settings.audio.urgent_volume;
*/

// document.getElementById("buttons").addEventListener("click", async () => {
// const firstname = document.getElementById("firstname");
// const lastname = document.getElementById("lastname");
// const displayname = document.getElementById("displayname");
// if (firstname.value.length == 0) {
//     localStorage.setItem("firstname", "");
// } else {
//     localStorage.setItem("firstname", firstname.value);
// }
// if (lastname.value.length == 0) {
//     localStorage.setItem("lastname", "");
// } else {
//     localStorage.setItem("lastname", lastname.value);
// }

// if (displayname.value.length == 0) {
//     localStorage.setItem("displayname", "");
// } else {
//     localStorage.setItem("displayname", displayname.value);
// }

//     if (theme_val != null) {
//     localStorage.setItem("darkmode", theme_val);
//     if (theme_val == "Dark") {
//         await window.darkMode.dark();
//         document.getElementById("triple-button").style.backgroundImage = dark_color;
//     } else if (theme_val == "Light") {
//         await window.darkMode.light();
//         document.getElementById("triple-button").style.backgroundImage = light_color;
//     } else {
//         await window.darkMode.system();
//         document.getElementById("triple-button").style.backgroundImage = system_color;
//     }
//     }
// });

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
