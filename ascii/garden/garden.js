// A dictionary (object) containing various items represented as HTML strings.
//Award arts
var plArts = {
    "dug" : `
                <ul class="item">
                    <li class="art hole"><span class="art hole"></span></li>
                    <li class="art hole"><span class="art hole"></span></li>
                    <li class="art hole"><span class="art hole">         ...--...  </span></li>
                    <li class="art hole"><span class="art hole">       .*        *. </span></li>
                    <li class="art hole"><span class="art hole">        *--...--*  </span></li>  
                </ul>
            `,
    "planted" :`
                <ul class="item">
                    <li class="art hole"><span class="art hole"></span></li>
                    <li class="art hole"><span class="art hole"></span></li>
                    <li class="art hole"><span class="art hole">        - . * - </span></li>
                    <li class="art hole"><span class="art hole">       ~ ^*. ~. </span></li>
                    <li class="art hole"><span class="art hole">        ~ * ,’‘     </span></li>  
                </ul>
            `,
    "watered" :`
                <ul class="item">
                    <li class="art hole"><span class="art hole">         | </span></li>
                    <li class="art hole"><span class="art hole">        ||     </span></li>  
                </ul>
            `,
    "rose" :`
                <ul class="item up">
                    <li class="art flower"><span class="art red flower">        ..-..</span></li>  
                    <li class="art flower"><span class="art red flower">       ((o))   </span></li>
                    <li class="art flower"><span class="art flower">        <span class="art green flower">\\</span><span class="art red flower">~</span><span class="art green flower">/</span>   <span class="art red flower">..-..</span></span></li>
                    <li class="art flower"><span class="art flower">       *<span class="art green flower">/|</span>    <span class="art red flower">((o))</span></span></li>
                    <li class="art flower"><span class="art flower">        <span class="art green flower">|\\      \\</span><span class="art red flower">~</span><span class="art green flower">/-</span>*</span></li>  
                    <li class="art flower"><span class="art flower">      *<span class="art green flower">-\\|</span>*   *<span class="art green flower">|/</span></span></li>
                    <li class="art flower"><span class="art flower">         *<span class="art green flower">\\\\  //</span> </span></li>  
                    <li class="art flower"><span class="art flower">           \\<span class="art green flower">| /</span>*</span></li>
                    <li class="art flower"><span class="art flower">           *<span class="art green flower">||</span> </span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>     
                </ul>
            `,
    "daisy" :`
                <ul class="item up">
                    <li class="art flower"><span class="art flower">             - o -   </span></li>
                    <li class="art flower"><span class="art flower">            <span class="art flower">o</span> <span class="art yellow flower">O</span> <span class="art flower">o</span>    </span></li> 
                    <li class="art flower"><span class="art flower">             - o -  </span></li>
                    <li class="art flower"><span class="art green flower">               || </span></li> 
                    <li class="art flower"><span class="art green flower">               || #</span></li>
                    <li class="art flower"><span class="art green flower">               ||//</span></li> 
                    <li class="art flower"><span class="art green flower">            # ||/ </span></li>
                    <li class="art flower"><span class="art green flower">             \\\\||</span></li> 
                    <li class="art flower"><span class="art green flower">              \\||</span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>
                    <li class="art flower"><span class="art flower"></span></li>  
                </ul>
            `
}

import { getAch } from "../../artHold.js";
var art = getAch();

import { getArt } from "../../artHold.js";
var arts = getArt();
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

// Function to set up the initial state and event listeners.
 var init;
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
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";  rainInc(); rainfInc(); });
    var shed = document.getElementsByClassName("shed")[0];
    shed.addEventListener('click', ifKey);

    for (var i = 1; i<7; i++){
        setCrop(i);
    }

    var map = document.getElementsByClassName("map")[0];
    map.addEventListener('click', openMap);
}

function openMap(){
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "map1"){
        localStorage.setItem("put-map-1", "true");
        removeIte(localStorage.getItem("selected"));
        localStorage.setItem("has-map1", "true");
        initItems();
    }
    else if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "map2"){
        localStorage.setItem("put-map-2", "true");
        removeIte(localStorage.getItem("selected"));
        localStorage.setItem("has-map2", "true");
        initItems();
    }
    else {
        window.location.href = "../map/map.html"
    }
}

function setCrop(crop){
    let sit = localStorage.getItem("plot-state" + crop);
    var text = document.getElementById("plot" + crop + "-del");
    toDig(crop);
    if (sit == "toPick"){
        if (localStorage.getItem("plot-type" + crop) == "rose-seeds"){
            text.innerHTML = plArts["rose"];
        }
        else {
            text.innerHTML = plArts["daisy"];
        }
        toPick(crop);
    }

    if (sit == "toGrow"){
        text.innerHTML = plArts["watered"];
        toGrow(crop);
    }

    if (sit == "toWater"){
        text.innerHTML = plArts["planted"];
        toWater(crop);
    }

    if (sit == "toPlant"){
        text.innerHTML = plArts["dug"];
        toPlant(crop);
    }

    if (sit == "toDig"){
        text.innerHTML = "";
        toDig(crop);
    }
}

function toDig(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementById("plot" + spot + "-del");

    button.addEventListener('click', function sh(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "shovel"){;
            let bt = button.cloneNode(true);
            button.parentNode.replaceChild(bt, button);
            button = bt;

            button.addEventListener('click', sh);
            localStorage.setItem("crop-time" + spot, 0);
            localStorage.setItem("plot-state" + spot, "toPlant");
            text.innerHTML = plArts["dug"];
            toPlant(spot);
        }
    });
}

function toPlant(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementById("plot" + spot + "-del");

    button.addEventListener('click', function pl(){
        var type = localStorage.getItem("spot" + localStorage.getItem("selected"));
        if (type == "daisy-seeds" || type == "rose-seeds"){
            button.removeEventListener('click', pl);
            localStorage.setItem("plot-state" + spot, "toWater");
            text.innerHTML = plArts["planted"];
            localStorage.setItem("plot-type" + spot, type);
            toWater(spot);
        }
    })
}

function toWater(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementById("plot" + spot + "-del");

    button.addEventListener('click', function wt(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "can" && localStorage.getItem("ascii-water") == "true"){
            button.removeEventListener('click', wt);
            localStorage.setItem("plot-state" + spot, "toGrow");
            text.innerHTML = plArts["watered"];
            toGrow(spot);
            sleep(62000).then(() => {
                toGrow(spot);
            })
        }
        /*else {
            if (!(localStorage.getItem("ascii-water") == "true")){
                var warning = document.getElementById("warning");
                warning.classList.remove("invis");
                sleep(1000).then(() => {warning.classList.add("invis")});
            }
        }*/
    });
}

function toGrow(spot){
    const d = new Date();
    var text = document.getElementById("plot" + spot + "-del");
    if (localStorage.getItem("crop-time" + spot) == 0){
        localStorage.setItem("crop-time" + spot, d.getTime());
    }
    var time = d.getTime();
    if (time - localStorage.getItem("crop-time" + spot) > 60000){
        if (localStorage.getItem("plot-type" + spot) == "rose-seeds"){
            text.innerHTML = plArts["rose"];
        }
        else {
            text.innerHTML = plArts["daisy"];
        }
        toPick(spot);
    }
}

function toPick(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementById("plot" + spot + "-del");

    button.addEventListener('click', function pi(){
        if (localStorage.getItem("free") < 9){
            button.removeEventListener('click', pi);
            localStorage.setItem("plot-state" + spot, "toDig");
            text.innerHTML = "";
            toDig(spot);
            localStorage.setItem("crop-time" + spot, 0);
            if (localStorage.getItem("plot-type" + spot) == "rose-seeds"){
                getIte("rose")
                initItems();
            }
            else {
                getIte("daisy");
                initItems();
            }
        }
    });
}

function take(button, name) {
    if (localStorage.getItem("free") < 9 || init == "true") {
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

var raina = 0;
var rainb = 23;

var rainsa = [
    "|                     .                                                                                                                   .                                                                        |",
    "|                                                                             .                                                                                                                                    |",
    "|                                                      .                                                                                                      .                                                    |",
    "|                                                                                                                                                                                                                  |",
    "|                             .                                                        .                                   .                                                                                       |",
    "|                                                                                                                                                                                                    .             |",
    "|  .                                                                  .                                                                                                   .                                        |",
    "|                                                                                                                                                                                                                  |",
    "|                    .                                                                                                                              .                                                              |",
    "|                                               .                                                 .                                                                                                                |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                  .                                   .                                                                    .                      |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                              .   |",
    "|                        .                                                                                                                                 .                                                       |",
    "|                                                                                                                                    .                                                                             |",
    "|                                                   .                                                                                                                                                              |",
    "|                                                                                                                                                                         .                                        |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                              .                                                                                                                   |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                   .                                            .                                                                                               . |",
    "|                                                                                                                                                                                                                  |",
    "|    .                                                                                                                                                                                                             |",
    "|                      .                                                                                                                           .                          .                                    |",
    "|                                                                                                                                                                                                                  |",
    "|                                   .                                                                          .                                                                                      .            |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                        .                                                                                                                         |",
    "|                                                            .                                                                                                                                                     |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                        .                                                                         |",
    "|                                      .                                                                                                                                                                           |",
    "|            .                                                                                                                                                                     .                               |",
    "|                                                                            .                                                                                                                                  .  |",
    "|                                                                                                   .                                                                                                              |",
    "|                                                      .                                                                 .                                  .                                                      |",
    "|                                                                                                                                                                                                                  |",
    "|.                          .                                                                                                                                                                                      |",
    "|                                                                                                                                                                                     .                            |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                 .                                      .                                         |",
    "|                                       .                                 .                    .                                                                                                                   |",
    "|      .                                                                                                                                                                                                       .   |",
    "|                                                                                                                                                                                                                  |",
    "|                                                     .                                                                                                                                                            |",
    "|                                                                                                                                                                                                                  |"
]

var rainsb = [
    "|                                                                                                                                                                                                                  |",
    "|    l                                                                                                                                                                                                             |",
    "|                                                                                                                                         l                                                                        |",
    "|                                                                                                                                                                                                                 l|",
    "|                                                          l                                                                                                                                                       |",
    "|                                                                                                     l                                                                                                            |",
    "|                                                                                                                                                                                                                  |",
    "|                 l                                                                                                                                                                                                |",
    "|                                                                                                                                                                                      l                           |",
    "|                                                                                                                                                          l                                                       |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                             :                                                                                    |",
    "|                                l                                                                                                                                                                                 |",
    "|                                                                                                                                                                                                                  |",
    "|                                                            l                                                                                         :                                                           |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                l                                 |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                    l                                                                                                             |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                             l                                                                    |",
    "|                  l                              :                                                                                                                                                                |",
    "|                                                                          l                                                                                                              :                        |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                  l                                            l                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                 l                                                                                                                                                    l           |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|  l                                                                                                                                                                                                               |",
    "|                                                                                                                                   l                                                                              |",
    "|                                                                              l                                                                                                                                   |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                         l                                        |",
    "|                  l                                                                                                                                                                                               |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |"
]
function rainInc(){
    var cur;
    for (var i = 0; i < 47; i++){
        cur = document.getElementById(i);
        cur.innerHTML = rainsa[(47 + i - raina)%47]
    }

    raina = raina + 2;
    if (raina > 46){
        raina = raina-47;
    }
    sleep(50).then(() => {rainInc()});
}

function rainfInc(){
    var cur;
    for (var i = 48; i < 95; i++){
        cur = document.getElementById(i);
        cur.innerHTML = rainsb[(47 + i - rainb)%47]
    }

    rainb = rainb + 3;
    if (rainb > 46){
        rainb = rainb-47;
    }
    sleep(50).then(() => {rainfInc()});
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
        sleep(3).then(() => { initItemsMeat(i + 1); });
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

// Function to handle going back to the previous page.

function ifKey(){
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "key"){
        window.location.assign("../shed/shed.html");
    }
}