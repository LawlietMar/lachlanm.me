import { getShopDia } from "../../global-art/dialogues.js";

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

var init;
var inConvo;
function ready() {
    inConvo = "false";
    init = "true";
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    
    checkHave();

    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";});

    document.getElementsByClassName("keeper")[0].addEventListener('click', function(){
        var held = localStorage.getItem("spot" + localStorage.getItem("selected"));
        var heldT = held.substring(0, held.length - 1);
        if (heldT == "sapphire" || heldT == "amythest"){
            removeIte(localStorage.getItem("selected"));
            if (localStorage.getItem("held-coins") == 0){
                getIte("coin");
            }
            localStorage.setItem("held-coins", parseInt(localStorage.getItem("held-coins")) + 3);
        }
        if (held == "amythest-seeds" || held == "emerald-seeds"){
            respondWait("seeds");
        }
    });
    var into = "enter";

    if (localStorage.getItem("has-orb1") == "true" || localStorage.getItem("has-orb2") == "true" || localStorage.getItem("has-orb3") == "true"){
        into = into + "o";
    }
    if (localStorage.getItem("ask-old-man") == "true"){
        into = into + "l";
    }

    respond(into);
}

function respondWait(inT){
    if (inConvo == "false"){
        respond(inT);
    }
    else {
        sleep(50).then(() => {
            respondWait(inT);
        });
    }
}

function respond(inText){
    inConvo = "true";
    document.getElementsByClassName("text-box")[0].innerHTML = `
    <img draggable="false" class="text-box-art" alt="" src="../../global-art/text-box.png">
    <p class="text-box-text"></p>
    <ul class="text-box-buttons"></ul>
    `;
    var box = document.getElementsByClassName("text-box")[0];
    //If leave we close the box
    if (inText == 'leave'){
        box.classList.add("shadow-realm");
        box.childNodes[1].innerHTML = "";
        box.childNodes[2].innerHTML = "";
    }
    else {
        if (box.classList.contains("shadow-realm")){
            box.classList.remove("shadow-realm")
        }

        var text = getShopDia(inText);
        if (text[0].length == 0){
            setButtons(text);
        }
        else {
            setText(text);
        }
    }
}

var clickReady;
function setText(text){
    var doneGif;
    clickReady = "false";
    var pages = text[0].length;
    var count = 1;

    document.getElementsByClassName("text-box-buttons")[0].innerHTML = `<button class="hide text-box-button"></button>`;
    setPage(count, text).then(function(){
        clickReady = "true";
        doneGif = document.createElement("div");
        doneGif.innerHTML = `<img draggable="false" class="text-box-art" alt="" src="../../global-art/done.gif">`
        document.getElementsByClassName("text-box")[0].insertBefore(doneGif, document.getElementsByClassName("text-box")[0].children[1]);
    });
    document.getElementsByClassName("text-box-button")[0].addEventListener('click', function tx(){
        if (clickReady == "true"){
            if (count < pages){
                document.getElementsByClassName("text-box-text")[0].innerHTML = "";
                clickReady = "false";
                count = count + 1;
                doneGif.remove();
                setPage(count, text).then(function(){
                    clickReady = "true";
                    doneGif = document.createElement("div");
                    doneGif.innerHTML = `<img draggable="false" class="text-box-art" alt="" src="../../global-art/done.gif">`
                    document.getElementsByClassName("text-box")[0].insertBefore(doneGif, document.getElementsByClassName("text-box")[0].children[1]);
                });
            }
            else {
                document.getElementsByClassName("text-box-button")[0].removeEventListener('click', tx);
                document.getElementsByClassName("text-box-text")[0].innerHTML = "";
                setButtons(text);
            }
        }
        else {
            clickReady = "true";
            document.getElementsByClassName("text-box-text")[0].innerHTML = text[0][count-1];

            doneGif = document.createElement("div");
            doneGif.innerHTML = `<img draggable="false" class="text-box-art" alt="" src="../../global-art/done.gif">`
            document.getElementsByClassName("text-box")[0].insertBefore(doneGif, document.getElementsByClassName("text-box")[0].children[1]);
        }
    });
}

async function setPage(count, text){
    await write(text[0][count-1], 0);
    return;
}

async function write(text, spot){
    if (spot >= text.length || clickReady == "true"){
        return;
    }
    else{
        spot = spot + 1;
        document.getElementsByClassName("text-box-text")[0].innerHTML = text.substring(0, spot);
        await sleep(8);
        await write(text, spot);
        return;
    }
}

function setButtons(text){
    document.getElementsByClassName("text-box")[0].innerHTML = `
            <img draggable="false" class="text-box-art" alt="" src="../../global-art/text-box.png">
            <p class="text-box-text"></p>
            <ul class="arrows text-box-buttons"></ul>
            `;
    var buts = text[1];
    if (buts.length == 0){
        document.getElementsByClassName("text-box")[0].innerHTML = "";
        inConvo = "false";
    }
    else {
        buts.forEach(function(value, index){
            var newNode = document.createElement("li");
            var newBut = document.createElement("button");
            var newText = document.createTextNode(value);

            newNode.appendChild(newText);
            newNode.appendChild(newBut);
            document.getElementsByClassName("text-box-buttons")[0].appendChild(newNode);

            newNode.classList.add("choice" + index);
            newBut.classList.add("choiceBut" + index, "hide");

            newBut.addEventListener('click', async function(){
                inConvo = "false";
                document.getElementsByClassName("text-box")[0].innerHTML = "";
                if (value == "Why would I want coin?" && localStorage.getItem("has-coin-purse") == "true"){
                    respond(value + "1");
                }
                else if (value == ""){
                    respond(value + "1");
                }
                else if (value != "Leave"){
                    document.getElementsByClassName("text-box")[0].classList.remove("arrows");
                    respond(value);
                }
                else {
                    window.location.href = "../crossroads/crossroads.html";
                }
            });
        });
    }
    inConvo = "false";
}

function take(button, name) {
    if (localStorage.getItem("free") < 9 || init == "true") {
        document.getElementsByClassName(name + "-art")[0].classList.add("invis");
        if (!(localStorage.getItem("has-" + name) == "true")) {
            getIte(name);
            initItems();
        }
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }

    else {
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });
    }
}

// Function to remove an item from the inventory.
function put(button, name) {
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name) {
        document.getElementsByClassName(name + "-art")[0].classList.remove("invis");
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
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe"){
        respondWait("axe");
    }
}  

function addList(item){
    item.addEventListener('click', function(){select(item)});
}