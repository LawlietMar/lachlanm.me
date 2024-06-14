// A dictionary (object) containing various items represented as HTML strings.
var art = {};
import { getArt } from "../../artHold.js";
var arts = getArt();

// Check if the document is still loading, and set up an event listener to initialize once loading is complete.
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

var init;
// Function to set up the initial state and event listeners.
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
    if ((path.substring(path.substring(0, path.lastIndexOf(" ")).lastIndexOf(" "), path.lastIndexOf(" ")) == " ../shed/shed.html")){
        localStorage.setItem("path", path.substring(0, path.lastIndexOf(" ")));
    }
    else if (!(path.substring(path.lastIndexOf(" ")) == " ../shed/shed.html")){
        path = path + " ../shed/shed.html"
        localStorage.setItem("path",path);
    }

    // Set up the 'back' button click event to go back to the previous page.
    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    // Set up event listeners for the axe button, or directly take the item if already owned.
    var axeBut = document.getElementsByClassName("axe-button")[0];
    if (localStorage.getItem("has-axe") == "true") {
        take(axeBut, "axe");
    } else {
        axeBut.addEventListener('click', function tk() {
            axeBut.removeEventListener('click', tk);
            take(axeBut, "axe");
        });
    }

    // Set up event listeners for the shovel button, or directly take the item if already owned.
    var shovelBut = document.getElementsByClassName("shovel-button")[0];
    if (localStorage.getItem("has-shovel") == "true") {
        take(shovelBut, "shovel");
    } else {
        shovelBut.addEventListener('click', function tk() {
            shovelBut.removeEventListener('click', tk);
            take(shovelBut, "shovel");
        });
    }

    // Set up event listeners for the can button, or directly take the item if already owned.
    var canBut = document.getElementsByClassName("can-button")[0];
    if (localStorage.getItem("has-can") == "true") {
        take(canBut, "can");
    } else {
        canBut.addEventListener('click', function tk() {
            document.getElementById("behind-can").classList.remove("invis");
            canBut.removeEventListener('click', tk);
            take(canBut, "can");
        });
    }

    // Set up event listeners for the rose seeds button, or directly take the item if already owned.
    var roseBut = document.getElementsByClassName("rose-seeds")[0];
    if (localStorage.getItem("has-rose-seeds") == "true") {
        take(roseBut, "rose-seeds");
    } else {
        roseBut.addEventListener('click', function tk() {
            roseBut.removeEventListener('click', tk);
            take(roseBut, "rose-seeds");
        });
    }

    // Set up event listeners for the daisy seeds button, or directly take the item if already owned.
    var daisyBut = document.getElementsByClassName("daisy-seeds")[0];
    if (localStorage.getItem("has-daisy-seeds") == "true") {
        take(daisyBut, "daisy-seeds");
    } else {
        daisyBut.addEventListener('click', function tk() {
            daisyBut.removeEventListener('click', tk);
            take(daisyBut, "daisy-seeds");
        });
    }
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => { rainInc(); rainfInc(); init = "false";});
}

// Function to take an item and add it to inventory if there is space.
function take(button, name) {
    if (localStorage.getItem("free") < 9 || init == "true") {
        console.log(5);
        document.getElementsByClassName(name + "-del")[0].classList.add("invis");
        if (name == "can") {
            document.getElementById("behind-can").classList.remove("invis");
        }
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
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name) {
        document.getElementsByClassName(name + "-del")[0].classList.remove("invis");
        if (name == "can") {
            document.getElementById("behind-can").classList.add("invis");
        }
        removeIte(localStorage.getItem("selected"));
        initItems();
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });
    } else {
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

// Variables for rain animation state
var raina = 0;
var rainb = 23;

// Arrays containing rain animation frames
var rainsa = [
    "                                                                                                                                                                                                                   ",
    "                                                                               .                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                       .                                                                                                                           ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                  .                                                                                                                ",
    "                                                                                                                                                                                                                   ",
    "                                                                                   .                                                                                                                               ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                               .                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                   .                                                                                                                               ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                         .                                                                                                                         ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                             .                                                                                                                                     ",
    "                                                                                                    .                                                                                                              ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                               .                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                  ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   "
];

var rainsb = [
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                      l                                                                                                            ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                     l                                                                                                             ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                  ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                               l                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                  ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   "
];

// Function to animate the first set of rain
function rainInc() {
    var cur;
    for (var i = 0; i < 47; i++) {
        cur = document.getElementById(i);
        cur.innerHTML = rainsa[(47 + i - raina) % 47];
    }

    raina = raina + 2;
    if (raina > 46) {
        raina = raina - 47;
    }
    // Recursively call to continue the rain animation.
    sleep(50).then(() => { rainInc(); });
}

// Function to animate the second set of rain
function rainfInc() {
    var cur;
    for (var i = 48; i < 95; i++) {
        cur = document.getElementById(i);
        cur.innerHTML = rainsb[(47 + i - rainb) % 47];
    }

    rainb = rainb + 3;
    if (rainb > 46) {
        rainb = rainb - 47;
    }
    // Recursively call to continue the rain animation.
    sleep(50).then(() => { rainfInc(); });
}

// Utility function to sleep for a given number of milliseconds.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkHave(){
    var tems = [];
    for (var i = 1; i < 9; i++){
        if (!(localStorage.getItem("spot" + i) == 0)){
            tems.push(localStorage.getItem("spot" + i));
        }
    }
    for (let tem in tems){
        if (localStorage.getItem("has-" + tems[tem]) == "true"){
            getIte(tems[tem]);
        }
    }
}

// Function to initialize and reset items in the inventory.
function initItems() {
    for (let j = 1; j < 9; j++) {
        const spot = document.getElementById("spot" + j);
        spot.innerHTML = "";
        let newSpot = spot.cloneNode(true);
        spot.parentNode.replaceChild(newSpot, spot);

        if (localStorage.getItem("has-award-" + j) == "true"){
            document.getElementById("award"+j).innerHTML = art[j];
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

// Function to add an item to the next free spot in the inventory.
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

// Function to handle going back to the previous page.
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