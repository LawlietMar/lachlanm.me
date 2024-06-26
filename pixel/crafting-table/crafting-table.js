import { sendRec } from "./recipes.js";
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

let recipes = sendRec();

var selected;
var init;
function ready() {
    init = "true";
    selected = [];
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    
    checkHave();
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";});

    document.getElementsByClassName("hammer")[0].addEventListener('click', craft);
}

function craft(){

    let names = [];
    selected.sort().reverse();
    selected.forEach(function(value){
        names.push(localStorage.getItem("spot" + value));
    });
    names.sort();

    let recipe = "";

    names.forEach(function(value){
        recipe = recipe + " " + value;
    });
    recipe = recipe.substring(1);

    if (recipes[recipe] != undefined){
        selected.forEach(function(value){
            if (recipes[recipe][1].includes(localStorage.getItem("spot" + value))){
                sleep(8-value).then(() => {removeIte(value);});
            }
        });
        sleep(9).then(() => {
            recipes[recipe][0].forEach(function(value){
                getIte(value);
            });
            initItems();
        });
    }

    sleep(10).then(() => {
        selected = [];
        clean();
    });

    checkLocals(recipe);
}

function checkLocals(recipe){
    if (recipe == "amythest-bunch pickaxe"){
        localStorage.setItem("pick-state", "purple-");
    }
    if (recipe == "purple-pickaxe rose-bunch"){
        localStorage.setItem("pick-state", "red-");
    }
    if (recipe == "emerald-bunch purple-pickaxe"){
        localStorage.setItem("pick-state", "green-");
    }
}

function clean(){
    let ite;
    for (let i = 1; i < 9; i++) {
        ite = document.getElementById("spot" + i);
        if (ite.classList.contains("selected")) {
            ite.classList.remove("selected");
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkHave(){
    let tems = [];
    for (let i = 1; i < 9; i++){
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
            <button tabindex="-1" class="item art item-art spot`+j+`"></button>
            `;
        let newSpot = spot.cloneNode(true);
        spot.parentNode.replaceChild(newSpot, spot);
    }
    // Recursively initialize items.
    initItemsMeat(1);
}

// Helper function to initialize each item in the inventory.
function initItemsMeat(i) {
    if (i < localStorage.getItem("free")) {
        let nam = localStorage.getItem("spot" + i);
        let spot = document.getElementById("spot" + i);
        spot.innerHTML = `
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/`+nam+`.png">
            <button tabindex="-1" class="item art item-art spot`+i+`"></button>
            `;
        document.getElementsByClassName("spot" + i)[0].addEventListener('click', function() { select(i); });
        sleep(3).then(() => { initItemsMeat(i + 1); });
    }
}

// Function to add an item to the next free spot in the inventory.
function getIte(name) {
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    spot.innerHTML = `
            <img draggable="false" class="item-art" alt="" src="../../global-art/items/`+name+`.png">
            <button tabindex="-1" class="item art item-art spot`+free+`"></button>
            `;
    localStorage.setItem("spot" + free, name);
    localStorage.setItem("has-" + name, "true");
    localStorage.setItem("free", parseInt(free) + 1);
}

// Function to remove an item from the inventory and adjust the remaining items.
function removeIte(spot) {
    let addArray = [];
    let name = localStorage.getItem("spot" + spot);
    localStorage.setItem("has-" + name, "false");
    for (let i = parseInt(spot) + 1; i < localStorage.getItem("free"); i++) {
        addArray.push(localStorage.getItem("spot" + i));
    }
    for (let k = 1; k < localStorage.getItem("free"); k++) {
        if (localStorage.getItem("spot" + k) == name && (k != spot)) {
            localStorage.setItem("has-" + name, "true");
        }
    }
    localStorage.setItem("free", spot);
    for (let j = localStorage.getItem("free"); j<9; j++){
        localStorage.setItem("spot" + j, 0);
    }
    for (let ind in addArray) {
        getIte(addArray[ind]);
    }
    select(spot);
}

// Function to handle the selection of an item.
function select(item) {
    if (document.getElementById("spot" + item).classList.contains("selected")) {
        document.getElementById("spot" + item).classList.remove("selected");
        var index = selected.indexOf(item);
        if (index != -1) {
            selected.splice(index, 1);
        }
    }
    else {
        document.getElementById("spot" + item).classList.add("selected");
        selected.push(item)
    }
}  

function addList(item){
    item.addEventListener('click', function(){select(item)});
}