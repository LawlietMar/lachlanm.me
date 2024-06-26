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

    if (localStorage.getItem("faded") == "true"){
        fade(0);
    }

    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";});

    var fore = document.getElementsByClassName("fore-swap")[0];
    var eBut = document.getElementsByClassName("elevator-but")[0];
    if (localStorage.getItem("rope-placed") == "false"){
        eBut.addEventListener('click', function place(){
            if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "rope"){
                eBut.removeEventListener('click', place);
                localStorage.setItem("rope-placed", "true");
                removeIte(localStorage.getItem("selected"));
                initItems();
                fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/string.png" alt="">`;

                eBut.addEventListener('click', function up(){
                    eBut.removeEventListener('click', up);
                    localStorage.setItem("elevator-position", "top");
                    fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-coming.gif" alt="">`;
                    sleep(3000).then(() => {
                        fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-end.gif" alt="">`;
                        sleep(380).then(() => {
                            fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-done.png" alt="">`;
        
                            eBut.addEventListener('click', function(){
                                localStorage.setItem("elevator-position", "bottom");
                                sleep(3).then(() => {window.location.href = "../../cavern/elevator/elevator.html";});
                            });
                        });
                    });
                });
            }
        });
    }

    else if (localStorage.getItem("elevator-position") == "top"){
        fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-done.png" alt="">`;
        eBut.addEventListener('click', async function(){
            await(fade(1));
            localStorage.setItem("elevator-position", "bottom");
            sleep(1000).then(() => {window.location.href = "../../cavern/elevator/elevator.html";});
        });
    }

    else {
        fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/string.png" alt="">`;
        eBut.addEventListener('click', function up(){
            eBut.removeEventListener('click', up);
            localStorage.setItem("elevator-position", "top");
            fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-coming.gif" alt="">`;
            sleep(3000).then(() => {
                fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-end.gif" alt="">`;
                sleep(380).then(() => {
                    fore.innerHTML = `<img draggable="false" class="fore-art" src="elevator-art/main-done.png" alt="">`;

                    eBut.addEventListener('click', async function(){
                        localStorage.setItem("elevator-position", "bottom");
                        await(fade(1));
                        sleep(1000).then(() => {window.location.href = "../../cavern/elevator/elevator.html";});
                    });
                });
            });
        });
    }
    document.getElementsByClassName("togo")[0].remove();
}

async function fade(dir){
    if (localStorage.getItem("faded") == "true"){
        localStorage.setItem("faded", "false");
    }
    else {
        localStorage.setItem("faded", "true");
    }

    var fade = document.createElement("div");
    fade.innerHTML = `<img draggable="false" class="main-art" src="../../global-art/black.png" alt="">`;
    document.getElementsByTagName("body")[0].appendChild(fade);
    fade.style.opacity = 0;
    await fadeG(0, dir, fade);
    if (dir == 0){
        fade.remove();
    }
    return;
}

async function fadeG(spot, dir, el){
    if (spot == 11){
        return;
    }
    else {
        if (dir == 0){
            el.style.opacity = 1 - 0.1 * spot;
        }
        else {
            console.log(document.getElementsByTagName("body"));
            el.style.opacity = 0.1 * spot;
        }
    }
    await sleep(100);
    await fadeG(spot + 1, dir, el);
    return;
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