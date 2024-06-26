if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

var init;
function ready() {
    var hold;
    init = "true";
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    
    checkHave();
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";});

    var amythest1But = document.getElementsByClassName("amythest1-but")[0];
    if (localStorage.getItem("has-amythest1") == "true") {
        take(amythest1But, "amythest1");
    } else {
        amythest1But.addEventListener('click', function tk() {
            hold = held();
            if (hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                amythest1But.removeEventListener('click', tk);
                take(amythest1But, "amythest1");
            }
        });
    }

    var amythest2But = document.getElementsByClassName("amythest2-but")[0];
    if (localStorage.getItem("has-amythest2") == "true") {
        take(amythest2But, "amythest2");
    } else {
        amythest2But.addEventListener('click', function tk() {
            hold = held();
            if (hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                amythest2But.removeEventListener('click', tk);
                take(amythest2But, "amythest2");
            }
        });
    }

    var amythest3But = document.getElementsByClassName("amythest3-but")[0];
    if (localStorage.getItem("has-amythest3") == "true") {
        take(amythest3But, "amythest3");
    } else {
        amythest3But.addEventListener('click', function tk() {
            hold = held();
            if (hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                amythest3But.removeEventListener('click', tk);
                take(amythest3But, "amythest3");
            }
        });
    }

    var seedsBut = document.getElementsByClassName("amythest-seeds-but")[0];
    if (localStorage.getItem("has-amythest-seeds") == "true") {
        take(seedsBut, "amythest-seeds");
    } else {
        seedsBut.addEventListener('click', function tk() {
            hold = held();
            if (hold == "pickaxe" || hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                seedsBut.removeEventListener('click', tk);
                take(seedsBut, "amythest-seeds");
            }
        });
    }
}

function held(){
    return localStorage.getItem("spot" + localStorage.getItem("selected"));
}

function take(button, name) {
    var hold;
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
            hold = held();
            if (name == "amythest-seeds"){
                if (hold == "pickaxe" || hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                    button.removeEventListener('click', tk);
                    take(button, name);
                }
            }
            else {
                if (hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                    button.removeEventListener('click', tk);
                    take(button, name);
                }
            }
        });
    }
}

// Function to remove an item from the inventory.
function put(button, name) {
    var hold;
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name) {
        document.getElementsByClassName(name + "-art")[0].classList.remove("invis");
        if (name == "can") {
            document.getElementById("behind-can").classList.add("invis");
        }
        removeIte(localStorage.getItem("selected"));
        initItems();
        button.addEventListener('click', function tk() {
            hold = held();
            if (name == "amythest-seeds"){
                if (hold == "pickaxe" || hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                    button.removeEventListener('click', tk);
                    take(button, name);
                }
            }
            else {
                if (hold == "purple-pickaxe" || hold == "red-pickaxe" || hold == "green-pickaxe"){
                    button.removeEventListener('click', tk);
                    take(button, name);
                }
            }
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