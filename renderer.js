//Actually change the text of the button to reflect the current Dark/Light/System mode

let firstnameVal = localStorage.getItem("firstname");

if (firstnameVal.length == 0) {
    document.getElementById("welcome").innerHTML = "Welcome to Noduro";
    document.getElementById("sign_in").innerHTML =
        "<a class = 'sign_in' href= './sign_up/sign_up.html'> Sign up </a> to Noduro to get started";
} else {
    document.getElementById("welcome").innerHTML =
        "Welcome back, " + firstnameVal;
    document.getElementById("sign_in").innerHTML =
        "<a class = 'sign_in' href= './login/login.html'> Sign In </a> to Noduro";
}

// window.onload = function(a) {
// if(localStorage.getItem("visitedhome").includes("1")) {
// document.getElementById("paged_header").style = "transition: none";
// document.getElementById("paged_header").classList.remove("filler_header");
// document.getElementById("paged_header").classList.add("page_header");
// }
// };

// function reset_scroll(){
//     console.log("reset_called")
//     localStorage.setItem("scrolled_in_index", false);
// }
const header = document.querySelector(".page_header");


window.onload = function (e) {
    console.log("onload called");
    if(localStorage.getItem("scrolled_in_index").includes("true")){
        header.classList.remove("page_header_invis");
        header.classList.add("page_header");

    }
    else{
        header.classList.remove("page_header");
        header.classList.add("page_header_invis");
    }
}
window.onscroll = function (e){
    localStorage.removeItem("hasScrolled");
    console.log("scroll called")
    if (localStorage.getItem("scrolled_in_index").includes("false")) {
        header.classList.remove("page_header_invis");
        header.classList.add("page_header");
        localStorage.setItem("scrolled_in_index", "true");
        console.log("first scroll")
    }

}
// Get the header element

// // Add an event listener to the window object to detect scrolling
// window.addEventListener("scroll", () => {
//     // Check if the user has scrolled past the top of the page
//     if (window.scrollY > 0) {
//         // Add the "visible" class to the header element
//         header.classList.remove("invis");

//         // Store a flag in localStorage to indicate that the user has scrolled
//         localStorage.setItem("hasScrolled", true);
//     } else {
//         // Remove the "visible" class from the header element
//         header.classList.add("invis");

//         // Remove the flag from localStorage
//         localStorage.removeItem("hasScrolled");
//     }
// });

// // Check if the user has scrolled past the top of the page on page load
// if (window.scrollY > 0 || localStorage.getItem("hasScrolled")) {
//     // Add the "visible" class to the header element
//     header.classList.remove("invis");

//     // Store a flag in localStorage to indicate that the user has scrolled
//     localStorage.setItem("hasScrolled", true);
// }


function addElement(image_source, name) {
    var list = document.getElementById("thumbnail_list");
    var entry = document.createElement("li");
    // create a new div element
    var elem = document.createElement(name);
    elem.setAttribute("src", image_source);
    // elem.setAttribute("height", "768");
    // elem.setAttribute("width", "1024");
    // elem.setAttribute("alt", "Flower");
    document.getElementById("placehere");

    entry.appendChild(elem);
    // add list element
    list.appendChild(entry);
}
