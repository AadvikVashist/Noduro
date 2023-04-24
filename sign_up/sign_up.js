// const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
const confirm_password = document.querySelector("#confirm_password");

toggleConfirmPassword.addEventListener("click", function () {
	// toggle the type attribute
	const type = password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);
    confirm_password.setAttribute("type", type);
	// toggle the icon
	toggleConfirmPassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye");
});
togglePassword.addEventListener("click", function () {
	// toggle the type attribute
	const type = confirm_password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);
    confirm_password.setAttribute("type", type);
	// toggle the icon
	toggleConfirmPassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye");
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
