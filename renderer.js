//Actually change the text of the button to reflect the current Dark/Light/System mode


let firstnameVal = localStorage.getItem("firstname");

if (firstnameVal.length == 0) {
    document.getElementById("welcome").innerHTML = "Welcome to Noduro";
    document.getElementById("sign_in").innerHTML =
        "<a class = 'sign_in_link' href= './sign_up/sign_up.html'> Sign up </a> to Noduro to get started";
        "Welcome back, " + firstnameVal;
} else {
    document.getElementById("welcome").innerHTML = "Welcome back, " + firstnameVal;
    document.getElementById("sign_in").innerHTML =
        "<a class = 'sign_in_link' href= './login/login.html'> Sign In </a> to Noduro";
}

//HEADER ONLY LOADS ONCE
let header = document.getElementById("global_h");



if (Date.now()  - parseInt(sessionStorage.getItem('global_header_anim')) > 4000){
  header.classList.remove("global_header_anim_b4");
}
else if (sessionStorage.getItem('global_header_anim') == null && header.classList.contains("global_header_anim_b4")) {
  window.addEventListener('scroll', function() {
    // Run your code here that should only be executed the first time the user scrolls
  header.classList.add("global_header_anim");
  }, { once: true });
  sessionStorage.setItem('global_header_anim',  Date.now());
  setTimeout(function() {
  header.classList.remove("global_header_anim_b4");

  }, 4000);
  
}

let element = document.querySelector('.animation');

  //MAIN DIV ANIM ONLY ONCE
// console.log((Date.now()  - parseInt(sessionStorage.getItem('index_animation'))));
if (Date.now()  - parseInt(sessionStorage.getItem('index_animation')) < 2000){
  element.classList.remove('animation');
}


window.addEventListener('unload', function() {
  sessionStorage.setItem('index_animation',  Date.now());
  console.log("set");

});