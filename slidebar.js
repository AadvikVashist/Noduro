var files = JSON.parse(localStorage.getItem("files"));
var lessons = JSON.parse(localStorage.getItem("lessons"));

for (index = 0; index < files.length; index++) {
    add_element(lessons[index], files[index]);
}

function add_element(image_source, name) {
    console.log(image_source);
    var list = document.getElementById("scrolling-div");
    var entry = document.createElement("div");
    entry.setAttribute("class", "card");
    entry.setAttribute("id", name);
    // create a new div element
    var image = document.createElement("img");
    image.setAttribute("class", "image");

    image.setAttribute("alt", name);
    image.src = image_source;
    // elem.setAttribute("height", "768");
    // elem.setAttribute("width", "1024");
    entry.appendChild(image);
    // add list element
    list.appendChild(entry);
}