// const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function () {
	// toggle the type attribute
	const type = password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);
	// toggle the icon
	this.classList.toggle("bi-eye");
});

// prevent form submit
const form = document.querySelector("form");
form.addEventListener('sign_in',function(e){
	e.preventDefault();
});

const passwordInput = document.getElementById('password');
// add an event listener to the input field
passwordInput.addEventListener('input', () => {
    // get the current input value
    const inputValue = passwordInput.value;
    // define a regular expression that matches spaces
    const spaceRegex = /\s/;
    // if the input value contains a space, remove it
    if (spaceRegex.test(inputValue)) {
        passwordInput.value = inputValue.replace(spaceRegex, '');
    }
});

// let firstnameVal = localStorage.getItem('firstname');
// let lastnameVal = localStorage.getItem('lastname');
// let displaynameVal = localStorage.getItem('displayname');
// let darkmodeVal = localStorage.getItem('darkmode');

// if (firstnameVal != null) {
//     document.getElementById('firstname').value = firstnameVal;
// }
// if (lastnameVal != null) {
//     document.getElementById('lastname').value = lastnameVal;
// }
// if (displaynameVal != null) {
//     document.getElementById('displayname').value = displaynameVal;
// }
// if (darkmodeVal != null) {
//     document.getElementById('darkmode').value = darkmodeVal;
// }

// document.getElementById('buttons').addEventListener('click', async () => {
//     const firstname = document.getElementById('firstname');
//     const lastname = document.getElementById('lastname');
//     const displayname = document.getElementById('displayname');
//     const darkmode = document.getElementById('darkmode');
//     localStorage.setItem('firstname', firstname.value);
//     localStorage.setItem('lastname', lastname.value);
//     localStorage.setItem('displayname', displayname.value);
//     localStorage.setItem('darkmode', darkmode.value);
// })

