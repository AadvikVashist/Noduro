// const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

let firstnameVal = localStorage.getItem('firstname');
let lastnameVal = localStorage.getItem('lastname');
let displaynameVal = localStorage.getItem('displayname');
let darkmodeVal = localStorage.getItem('darkmode');

if (firstnameVal != null) {
    document.getElementById('firstname').value = firstnameVal;
}
if (lastnameVal != null) {
    document.getElementById('lastname').value = lastnameVal;
}
if (displaynameVal != null) {
    document.getElementById('displayname').value = displaynameVal;
}
if (darkmodeVal != null) {
    document.getElementById('darkmode').value = darkmodeVal;
}

document.getElementById('buttons').addEventListener('click', async () => {
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const displayname = document.getElementById('displayname');
    const darkmode = document.getElementById('darkmode');
    localStorage.setItem('firstname', firstname.value);
    localStorage.setItem('lastname', lastname.value);
    localStorage.setItem('displayname', displayname.value);
    localStorage.setItem('darkmode', darkmode.value);
})
function myFunction() {
var x = document.getElementById("password");
if (x.type === "password") {
  x.type = "text";
} else {
  x.type = "password";
}
}
$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });