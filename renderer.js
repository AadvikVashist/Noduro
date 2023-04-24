//Actually change the text of the button to reflect the current Dark/Light/System mode

let firstnameVal = localStorage.getItem('firstname');

if (firstnameVal != null) {
    document.getElementById('welcome').innerHTML = "Welcome back, "  + firstnameVal;
    if (document.getElementById('sign_in') != null) {
    document.getElementById('sign_in').remove();
    }
}




// document.getElementById('toggle-mode').addEventListener('click', async () => {
//   const isDarkMode = await window.darkMode.toggle()
//   document.getElementById('toggle-mode').innerHTML = isDarkMode ? 'Dark' : 'Light'
// })

// document.getElementById('reset-to-system').addEventListener('click', async () => {
//   await window.darkMode.system()
//   document.getElementById('toggle-mode').innerHTML = 'System'
// })

// window.onscroll = function() {myFunction()};
// // Get the header
// var header = document.getElementById("page_header");
// // Get the offset position of the navbar
// var sticky = header.offsetTop;
// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }