import { getGardensDia } from "../../global-art/dialogues.js";

var plArts = {
    "dug" : `<img class="abs" draggable="false" alt="" src="gardens-art/hole.png">`,
    "planted" :`<img class="abs" draggable="false" alt="" src="gardens-art/planted.png">`,
    "watered" :`<img class="abs" draggable="false" alt="" src="gardens-art/sprouted.png">`,
    "rose" :`<img class="abs" draggable="false" alt="" src="gardens-art/red-flower.png">`,
    "daisy" :`<img class="abs" draggable="false" alt="" src="gardens-art/yellow-flower.png">`,
    "poppy" :`<img class="abs" draggable="false" alt="" src="gardens-art/orange-flower.png">`,
    "cornflower" :`<img class="abs" draggable="false" alt="" src="gardens-art/blue-flower.png">`,
    "emerald" :`<img class="abs" draggable="false" alt="" src="gardens-art/green-flower.png">`,
    "amythest" :`<img class="abs" draggable="false" alt="" src="gardens-art/purple-flower.png">`
}

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

    for (var i = 1; i<7; i++){
        setCrop(i);
    }

    document.getElementsByClassName("banker")[0].addEventListener('click', function(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "coin"){
            removeIte(localStorage.getItem("selected"));
            initItems();
            localStorage.setItem("banked-coins", parseInt(localStorage.getItem("banked-coins")) + parseInt(localStorage.getItem("held-coins")));
            localStorage.setItem("held-coins", 0);
        }
        else {
            if (localStorage.getItem("banked-coins") == 0){
                respond("enter");
            }
            else {
                respond("enterb");
            }
        }
    })
}

function setCrop(crop){
    let sit = localStorage.getItem("p2plot-state" + crop);
    var text = document.getElementsByClassName("plot-" + crop + "-art")[0];
    toDig(crop);
    if (sit == "toPick"){
        if (localStorage.getItem("p2plot-type" + crop) == "rose-seeds"){
            text.innerHTML = plArts["rose"];
        }
        else if (localStorage.getItem("p2plot-type" + crop) == "cornflower-seeds"){
            text.innerHTML = plArts["cornflower"];
        }
        else if (localStorage.getItem("p2plot-type" + crop) == "poppy-seeds"){
            text.innerHTML = plArts["poppy"];
        }
        else if (localStorage.getItem("p2plot-type" + crop) == "amythest-seeds"){
            text.innerHTML = plArts["amythest"];
        }
        else if (localStorage.getItem("p2plot-type" + crop) == "emerald-seeds"){
            text.innerHTML = plArts["emerald"];
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
    }
}

function toDig(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];

    button.addEventListener('click', function sh(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "shovel"){
            let bt = button.cloneNode(true);
            button.parentNode.replaceChild(bt, button);
            button = bt;

            button.addEventListener('click', sh);
            localStorage.setItem("p2crop-time" + spot, 0);
            localStorage.setItem("p2plot-state" + spot, "toPlant");
            text.innerHTML = plArts["dug"];
            toPlant(spot);
        }
    });
}

function toPlant(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];

    button.addEventListener('click', function pl(){
        var type = localStorage.getItem("spot" + localStorage.getItem("selected"));
        if (type == "daisy-seeds" || type == "rose-seeds" || type == "poppy-seeds" || type == "cornflower-seeds" || type == "amythest-seeds" || type == "emerald-seeds"){
            button.removeEventListener('click', pl);
            localStorage.setItem("p2plot-state" + spot, "toWater");
            text.innerHTML = plArts["planted"];
            localStorage.setItem("p2plot-type" + spot, type);
            toWater(spot);
        }
    })
}

function toWater(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];

    button.addEventListener('click', function wt(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "can" && localStorage.getItem("ascii-water") == "true"){
            console.log(5);
            button.removeEventListener('click', wt);
            localStorage.setItem("p2plot-state" + spot, "toGrow");
            text.innerHTML = plArts["watered"];
            toGrow(spot);
            sleep(62000).then(() => {
                toGrow(spot);
            })
        }
    });
}

function toGrow(spot){
    const d = new Date();
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];
    if (localStorage.getItem("p2crop-time" + spot) == 0){
        localStorage.setItem("p2crop-time" + spot, d.getTime());
    }
    var time = d.getTime();
    if (time - localStorage.getItem("p2crop-time" + spot) > 60000){
        if (localStorage.getItem("p2plot-type" + spot) == "rose-seeds"){
            text.innerHTML = plArts["rose"];
        }
        else if (localStorage.getItem("p2plot-type" + spot) == "poppy-seeds"){
            text.innerHTML = plArts["poppy"];
        }
        else if (localStorage.getItem("p2plot-type" + spot) == "cornflower-seeds"){
            text.innerHTML = plArts["cornflower"];
        }
        else if (localStorage.getItem("p2plot-type" + spot) == "amythest-seeds"){
            text.innerHTML = plArts["amythest"];
        }
        else if (localStorage.getItem("p2plot-type" + spot) == "emerald-seeds"){
            text.innerHTML = plArts["emerald"];
        }
        else {
            text.innerHTML = plArts["daisy"];
        }
        toPick(spot);
    }
}

function toPick(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];

    button.addEventListener('click', function pi(){
        if (localStorage.getItem("free") < 9){
            button.removeEventListener('click', pi);
            localStorage.setItem("p2plot-state" + spot, "toDig");
            text.innerHTML = "";
            toDig(spot);
            localStorage.setItem("p2crop-time" + spot, 0);
            if (localStorage.getItem("p2plot-type" + spot) == "rose-seeds"){
                getIte("p2rose")
                initItems();
            }
            else if (localStorage.getItem("p2plot-type" + spot) == "poppy-seeds"){
                getIte("p2poppy")
                initItems();
            }
            else if (localStorage.getItem("p2plot-type" + spot) == "cornflower-seeds"){
                getIte("p2cornflower")
                initItems();
            }
            else if (localStorage.getItem("p2plot-type" + spot) == "amythest-seeds"){
                getIte("p2amythest")
                initItems();
            }
            else if (localStorage.getItem("p2plot-type" + spot) == "emerald-seeds"){
                getIte("p2emerald")
                initItems();
            }
            else {
                getIte("p2daisy");
                initItems();
            }
        }
    });
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

        var text = getGardensDia(inText);
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
    if (text[0][count-1] == "You currently are holding  coins."){
        await write(text[0][count-1].substring(0, 26) + localStorage.getItem("held-coins") + text[0][count-1].substring(26), 0);
    }
    else{
        await write(text[0][count-1], 0);
    }
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
                document.getElementsByClassName("text-box")[0].innerHTML = "";
                inConvo = "false";
                if (value == "I'd like to make a withdrawal."){
                    if (localStorage.getItem("held-coins") != 0){
                        if (localStorage.getItem("spot1") == "coin"){
                            removeIte(1);
                        }
                        else if (localStorage.getItem("spot2") == "coin"){
                            removeIte(2);
                        }
                        else if (localStorage.getItem("spot3") == "coin"){
                            removeIte(3);
                        }
                        else if (localStorage.getItem("spot4") == "coin"){
                            removeIte(4);
                        } 
                        else if (localStorage.getItem("spot5") == "coin"){
                            removeIte(5);
                        }
                        else if (localStorage.getItem("spot6") == "coin"){
                            removeIte(6);
                        } 
                        else if (localStorage.getItem("spot7") == "coin"){
                            removeIte(7);
                        }
                        else if (localStorage.getItem("spot8") == "coin"){
                            removeIte(8);
                        } 
                    }
                    getIte("coin");
                    initItems();
                    localStorage.setItem("held-coins", parseInt(localStorage.getItem("banked-coins")) + parseInt(localStorage.getItem("held-coins")))
                    localStorage.setItem("banked-coins", 0);
                    initItems();
                }
                if (value != "Leave"){
                    document.getElementsByClassName("text-box")[0].classList.remove("arrows");
                    respond(value);
                }
            });
        });
    }
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
}  

function addList(item){
    item.addEventListener('click', function(){select(item)});
}