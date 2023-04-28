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
