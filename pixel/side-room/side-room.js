import { ready2 } from "../../aud.js";
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

var init;
function ready() {
    init = "true";
    setMoon();
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    
    checkHave();
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";});

    document.getElementsByClassName("lectern")[0].addEventListener('click', function(){
        localStorage.setItem("moon", parseInt(localStorage.getItem("moon")) + 1);
        if (localStorage.getItem("moon") == 6){
            localStorage.setItem("moon", 1);
        }
        setMoon();
    });

    var orbBut = document.getElementsByClassName("orb-but")[0];
    if (localStorage.getItem("has-orb1") == "true") {
        take(orbBut, "orb1");
    } else {
        orbBut.addEventListener('click', function tk() {
            orbBut.removeEventListener('click', tk);
            take(orbBut, "orb1");
        });
    }

    var oarBut = document.getElementsByClassName("oar-but")[0];
    if (localStorage.getItem("has-oar") == "true") {
        take(oarBut, "oar");
    } else {
        oarBut.addEventListener('click', function tk() {
            oarBut.removeEventListener('click', tk);
            take(oarBut, "oar");
        });
    }
}

function setMoon(){
    document.getElementsByClassName("conMoon")[0].innerHTML = `
    <img draggable="false" class="fore-art" src="side-room-art/statue`+ localStorage.getItem("moon") +`.png" alt="">
    `;
}

function take(button, name) {
    if ((localStorage.getItem("free") < 9 && (localStorage.getItem("spot" + localStorage.getItem("selected")) == "pickaxe") || name != "orb1") || init == "true") {
        if (name == "oar"){
            document.getElementsByClassName("foar-art")[0].classList.add("hide");
        }
        if (name == "orb1"){
            if (init != "true"){
                localStorage.setItem("balls", parseInt(localStorage.getItem("balls")) + 1);
                ready2();
            }
            document.getElementsByClassName("orbart")[0].innerHTML = `
                    <img draggable="false" class="main-art" src="side-room-art/main-no-stone.png" alt="">
                `;
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

    else{
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });
    }
}

// Function to remove an item from the inventory.
function put(button, name) {
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name) {
        if (name == "oar"){
            document.getElementsByClassName("foar-art")[0].classList.remove("hide");
        }
        if (name == "orb1"){
            localStorage.setItem("balls", parseInt(localStorage.getItem("balls")) - 1);
            document.getElementsByClassName("orbart")[0].innerHTML = `
                <img draggable="false" class="main-art" src="side-room-art/main-stone.png" alt="">
            `;
            ready2();
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

function initItems() {
    for (let j = 1; j < 9; j++) {
        const spot = document.getElementById("spot" + j);
        spot.innerHTML = `
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/border.png">
            <button tabindex="-1" class="item art item-art spot`+j+`"></button>
            `;
        let newSpot = spot.cloneNode(true);
        spot.parentNode.replaceChild(newSpot, spot);

        if (localStorage.getItem("has-award-" + j) == "true"){
            document.getElementById("awardimg"+j).classList.remove("hide");
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
        spot.innerHTML = `
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/`+nam+`.png">
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/border.png">
            <button tabindex="-1" class="item art item-art spot`+i+`"></button>
            `;
        document.getElementsByClassName("spot" + i)[0].addEventListener('click', function() { select(i); });
        initItemsMeat(i + 1);
    }
}

// Function to add an item to the next free spot in the inventory.
function getIte(name) {
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    spot.innerHTML = `
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/`+name+`.png">
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/border.png">
            <button tabindex="-1" class="item art item-art spot`+free+`"></button>
            `;
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
    }
    for (var k = 1; k < localStorage.getItem("free"); k++) {
        if (localStorage.getItem("spot" + k) == name && (k != spot)) {
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

function addList(item){
    item.addEventListener('click', function(){select(item)});
}