import { getAch } from "../../artHold.js";
var art = getAch();
import { getArt } from "../../artHold.js";
var arts = getArt();

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var init;
var bypass;
function ready() {
    init = "true";
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    // Example commented code to set initial state in localStorage
    /*
    localStorage.setItem("has-axe", 'false');
    localStorage.setItem("has-shovel", 'false');
    localStorage.setItem("has-can", 'false');
    localStorage.setItem("has-rose-seeds", 'false');
    localStorage.setItem("has-daisy-seeds", 'false');*/
    
    checkHave();
    // Get the current path from localStorage and update it if necessary.
    var path = localStorage.getItem("path");
    if ((path.substring(path.substring(0, path.lastIndexOf(" ")).lastIndexOf(" "), path.lastIndexOf(" ")) == " ../bookshelf/bookshelf.html")){
        localStorage.setItem("path", path.substring(0, path.lastIndexOf(" ")));
    }
    else if (!(path.substring(path.lastIndexOf(" ")) == " ../bookshelf/bookshelf.html")){
        path = path + " ../bookshelf/bookshelf.html"
        localStorage.setItem("path",path);
    }

    // Set up the 'back' button click event to go back to the previous page.
    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {bypass = "false", init = "false";});

    var key = document.getElementsByClassName("key-button")[0];
    if (localStorage.getItem("has-key") == "true") {
        bypass = "true";
        take(key, "key");
    } else {
        key.addEventListener('click', function tk() {
            key.removeEventListener('click', tk);
            take(key, "key");
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeKey(){
}

function take(button, name) {
    if (localStorage.getItem("free") < 9) {
        // Mark the item as invisible and add it to the inventory if it is not already present.
        document.getElementsByClassName(name + "-del")[0].classList.add("invis");
        if (!(localStorage.getItem("has-" + name) == "true")) {
            getIte(name);
            initItems();
        }
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

// Function to remove an item from the inventory.
function put(button, name) {
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name || bypass == "true") {
        // Make the item visible again and update the pot status if necessary.
        document.getElementsByClassName(name + "-del")[0].classList.remove("invis");
        if (!(bypass == "true")) {
            removeIte(localStorage.getItem("selected"));
            initItems();
        }
        bypass = false;
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });
    } else {
        // Set up the button to add the item back to the inventory if conditions are not met.
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

function checkHave() {
    var tems = [];
    for (var i = 1; i < 9; i++) {
        if (!(localStorage.getItem("spot" + i) == 0)) {
            tems.push(localStorage.getItem("spot" + i));
        }
    }
    for (let tem in tems) {
        if (localStorage.getItem("has-" + tems[tem]) == "true") {
            getIte(tems[tem]);
        }
    }
}

// Function to initialize the inventory items.
function initItems() {
    for (let j = 1; j < 9; j++) {
        const spot = document.getElementById("spot" + j);
        spot.innerHTML = "";
        let newSpot = spot.cloneNode(true);
        spot.parentNode.replaceChild(newSpot, spot);

        if (localStorage.getItem("has-award-" + j) == "true") {
            document.getElementById("award" + j).innerHTML = art[j];
        }
    }
    // Recursively initialize items.
    initItemsMeat(1);
}

// Helper function to initialize each item in the inventory.
function initItemsMeat(i) {
    if (i < localStorage.getItem("free")) {
        var nam = localStorage.getItem("spot" + i);
        var spot = document.getElementById("spot" + i);
        spot.innerHTML = arts[nam];
        spot.addEventListener('click', function() { select(i); });
        sleep(10).then(() => { initItemsMeat(i + 1); });
    }
}

// Function to add an item to the next free slot in the inventory.
function getIte(name) {
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    spot.innerHTML = arts[name];
    localStorage.setItem("spot" + free, name);
    localStorage.setItem("has-" + name, "true");
    localStorage.setItem("free", parseInt(free) + 1);
}

// Function to remove an item from the inventory and adjust the remaining items.
function removeIte(spot) {
    var addArray = [];
    var name = localStorage.getItem("spot" + spot);
    localStorage.setItem("has-" + name, "false");
    for (var i = parseInt(spot) + 1; i < localStorage.getItem("free"); i++) {
        addArray.push(localStorage.getItem("spot" + i));

        if (localStorage.getItem("spot" + i) == name) {
            localStorage.setItem("has-" + name, "true");
        }
    }
    localStorage.setItem("free", spot);
    for (var j = localStorage.getItem("free"); j<9; j++){
        localStorage.setItem("spot" + j, 0);
    }
    for (let ind in addArray) {
        getIte(addArray[ind]);
    }
    select(spot);
}

// Function to handle the selection of an item.
   function select(item) {
    localStorage.setItem("selected", -1);
    var sel = false;
    if (document.getElementById("spot" + item).classList.contains("selected")) {
        sel = true;
    }
    var ite;
    for (let i = 1; i < 9; i++) {
        ite = document.getElementById("spot" + i);
        if (ite.classList.contains("selected")) {
            ite.classList.remove("selected");
        }
    }
    if (!sel) {
        localStorage.setItem("selected", item);
        document.getElementById("spot" + item).classList.add("selected");
    }
}  

// Function to add an event listener for selecting an item.
function addList(item) {
    item.addEventListener('click', function() { select(item); });
}

// Function to navigate to the previous page.
function goBack() {
    var prev = "";
    var path = localStorage.getItem("path");
    var lastSpace = path.lastIndexOf(" ");

    path = path.substring(0, lastSpace);
    lastSpace = path.lastIndexOf(" ");

    prev = path.substring(lastSpace + 1);
    localStorage.setItem("path", path.substring(0, lastSpace));
    window.location.href = prev;
}