if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

var init;
function ready() {
    init = "true";
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("has-award-7", "true");
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    
    checkHave();
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false"; nextBunny()});

    if (localStorage.getItem("lpot-full") == "true" && localStorage.getItem("rpot-full") == "true"){
        var port = document.getElementsByClassName("fore-art")[0];
        port.classList.remove("hide");
        var portBut = document.getElementsByClassName("portal")[0];
        portBut.addEventListener('click', function(){window.location.href = "../../ascii/portal/portal.html"});
    }
}

function nextBunny(){
    var bunx = parseInt(localStorage.getItem("bunny-x"));
    var bun = document.getElementsByClassName("bunny")[0];
    if (localStorage.getItem("dead-bunny") == "true"){
        bun.classList.remove("hide");
        bun.style.left = bunx + "px";
        bun.innerHTML = `
            <img draggable="false" id="bunny-anim" src="portal-art/dead-bunny.png" alt="">
        `
    }
    else {
        sleep((15 + Math.floor(Math.random() * 30))*1000).then(() => {
            bun.style.left = "915px";
            bun.classList.remove("hide");
            localStorage.setItem("bunny-x", 915);
            document.getElementById("bun-kill").addEventListener('click', function(){
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe"){
                    bun.innerHTML = `
                        <img draggable="false" id="bunny-anim" src="portal-art/dead-bunny.png" alt="">
                    `   
                    localStorage.setItem("dead-bunny", "true"); 
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) - 2);
                }
            });
            xInc();
        });
    }
}

function xInc(){
    var bunx = parseInt(localStorage.getItem("bunny-x"));
    bunx = bunx - 5;
    localStorage.setItem("bunny-x", bunx);
    document.getElementsByClassName("bunny")[0].style.left = bunx + "px";
    if (bunx > 430){
        if (localStorage.getItem("dead-bunny") != "true"){
            sleep(20).then(() => {xInc()});
        }
    }
    else {
        var bun = document.getElementsByClassName("bunny")[0];
        let newBun = bun.cloneNode(true);
        bun.parentNode.replaceChild(newBun, bun);
        newBun.classList.add("hide");
        nextBunny();
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
            <img draggable="false" class="item-art" alt="" src="../global-art/items/border.png">
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
            <img draggable="false" class="item-art" alt="" src="../global-art/items/`+nam+`.png">
            <img draggable="false" class="item-art" alt="" src="../global-art/items/border.png">
            <button tabindex="-1" class="item art item-art spot`+i+`"></button>
            `;
        document.getElementsByClassName("spot" + i)[0].addEventListener('click', function() { select(i); });
        sleep(10).then(() => { initItemsMeat(i + 1); });
    }
}

// Function to add an item to the next free spot in the inventory.
function getIte(name) {
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    spot.innerHTML = `
            <img draggable="false" class="item-art" alt="" src="../global-art/items/`+name+`.png">
            <img draggable="false" class="item-art" alt="" src="../global-art/items/border.png">
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