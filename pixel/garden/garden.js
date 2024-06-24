var plArts = {
    "dug" : `<img class="abs" draggable="false" alt="" src="garden-art/hole.png">`,
    "planted" :`<img class="abs" draggable="false" alt="" src="garden-art/planted.png">`,
    "watered" :`<img class="abs" draggable="false" alt="" src="garden-art/sprouted.png">`,
    "rose" :`<img class="abs" draggable="false" alt="" src="garden-art/grown-rose.png">`,
    "daisy" :`<img class="abs" draggable="false" alt="" src="garden-art/grown-daisy.png">`,
    "poppy" :`<img class="abs" draggable="false" alt="" src="garden-art/grown-poppy.png">`,
    "cornflower" :`<img class="abs" draggable="false" alt="" src="garden-art/grown-cornflower.png">`
}

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
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    
    checkHave();
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";});

    document.getElementsByClassName("shed")[0].addEventListener('click', function(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "key"){
            window.location.href = "../shed/shed.html";
        }
    });

    for (var i = 1; i<7; i++){
        setCrop(i);
    }
}

function setCrop(crop){
    let sit = localStorage.getItem("p1plot-state" + crop);
    var text = document.getElementsByClassName("plot-" + crop + "-art")[0];
    toDig(crop);
    if (sit == "toPick"){
        if (localStorage.getItem("p1plot-type" + crop) == "rose-seeds"){
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
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];

    button.addEventListener('click', function sh(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "shovel"){;
            let bt = button.cloneNode(true);
            button.parentNode.replaceChild(bt, button);
            button = bt;

            button.addEventListener('click', sh);
            localStorage.setItem("p1crop-time" + spot, 0);
            localStorage.setItem("p1plot-state" + spot, "toPlant");
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
        if (type == "daisy-seeds" || type == "rose-seeds" || type == "poppy-seeds" || type == "cornflower-seeds"){
            button.removeEventListener('click', pl);
            localStorage.setItem("p1plot-state" + spot, "toWater");
            text.innerHTML = plArts["planted"];
            localStorage.setItem("p1plot-type" + spot, type);
            toWater(spot);
        }
    })
}

function toWater(spot){
    var button = document.getElementById("plot" + spot);
    var text = document.getElementsByClassName("plot-" + spot + "-art")[0];

    button.addEventListener('click', function wt(){
        if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "can" && localStorage.getItem("p1water") == "true"){
            button.removeEventListener('click', wt);
            localStorage.setItem("p1plot-state" + spot, "toGrow");
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
    if (localStorage.getItem("p1crop-time" + spot) == 0){
        localStorage.setItem("p1crop-time" + spot, d.getTime());
    }
    var time = d.getTime();
    if (time - localStorage.getItem("p1crop-time" + spot) > 60000){
        if (localStorage.getItem("p1plot-type" + spot) == "rose-seeds"){
            text.innerHTML = plArts["rose"];
        }
        else if (localStorage.getItem("p1plot-type" + spot) == "poppy-seeds"){
            text.innerHTML = plArts["poppy"];
        }
        else if (localStorage.getItem("p1plot-type" + spot) == "cornflower-seeds"){
            text.innerHTML = plArts["cornflower"];
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
            localStorage.setItem("p1plot-state" + spot, "toDig");
            text.innerHTML = "";
            toDig(spot);
            localStorage.setItem("p1crop-time" + spot, 0);
            if (localStorage.getItem("p1plot-type" + spot) == "rose-seeds"){
                getIte("p1rose")
                initItems();
            }
            else if (localStorage.getItem("p1plot-type" + spot) == "poppy-seeds"){
                getIte("p1poppy")
                initItems();
            }
            else if (localStorage.getItem("p1plot-type" + spot) == "cornflower-seeds"){
                getIte("p1cornflower")
                initItems();
            }
            else {
                getIte("p1daisy");
                initItems();
            }
        }
    });
}

function take(button, name) {
    if (localStorage.getItem("free") < 9 || init == "true") {
        document.getElementsByClassName(name + "-art")[0][0].classList.add("invis");
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
        document.getElementsByClassName(name + "-art")[0][0].classList.remove("invis");
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