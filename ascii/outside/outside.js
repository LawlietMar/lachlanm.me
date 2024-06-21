// A dictionary (object) containing various items represented as HTML strings.
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

var init;
function ready() {
    init = "true";
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("has-award-8", "true");
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
    sleep(40).then(() => {init = "false";  rainInc(); rainfInc(); checkOpen()});
    
    var fore = document.getElementsByClassName("hide")[1];
    fore.addEventListener('click', checkOpen);
}

function checkOpen(){
    if ((localStorage.getItem('has-forest') == 'true') || localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe"){
        localStorage.setItem('has-forest', 'true');
        var pict = document.getElementById("picture");
        pict.innerHTML = `
                <span class="art">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
                <span class="art">|          /         \\   /\\    /\\     /      \\          /             \\          /     \\                                 /        \\   /..        ..\\    /\\/\\ */                \\            /      \\  /\\  */\\     |</span>
                <span class="art">|/\\      /             \\/  \\  /  \\   /.      .\\  /\\    /               \\    /\\  /       \\                               /          \\/\\ /**----**\\    /  \\ \\/.....        .....\\          /        \\/  \\ /* \\    |</span>
                <span class="art">|  \\   /                 \\  \\/    \\   /**'**\\  /  \\  /                 \\/\\/  \\/         \\                             /            \\ /            \\  /    \\  /     *****     \\    /\\  //.        .\\   /*  *\\   |</span>
                <span class="art">|   \\/                     \\/      \\ /        \\/    \\/                   \\ \\  /..       ..\\                           /..          ..\\              \\/      \\/                   \\/\\/  \\/  /*-----*\\  /    - \\   |</span>
                <span class="art">|  /                         \\      /          \\     --....       ....---  \\  / ***** \\                             /*--....--*\\                \\.   ../                     \\/    \\  /          \\/     *  \\  |</span>
                <span class="art">|/                             \\   /            \\.....\\/    *****    \\     \\/           \\                           /              \\                \\** /                       \\     \\/           \\      -   \\ |</span>
                <span class="art">|                                \\/              \\   /                 \\     /             \\                         /                \\              ..\\  /                         \\    /             \\..     ...\\|</span>
                <span class="art">|...                       ........\\..       .....\\ /.*--....    ....--*.\\ /               \\                      /                   \\-----*****\\  /....                   ....\\  /               \\ **-*\\   |</span>
                <span class="art">|  /*****--------***** \\ '    /  *****   \\   /           -         \\/...            ...\\                   /....             ....\\   *-        \\    / *****-----***** \\   /.....       .....\\       \\ |</span>
                <span class="art">|/                            \\   /              \\ /                       \\  /***-----**\\                        / ********** \\           *    \\  /         -               \\   /   ******   \\         \\|</span>
                <span class="art">|                               \\/                \\                         \\/               \\                      /                  \\                \\/                           \\ /                \\          |</span>
                <span class="art">|                                 \\                \\                        /                 \\                    /                    \\               /                             \\                  \\       ..|</span>
                <span class="art">|                                   \\               \\--................---/       -           \\                 /          -            \\         ..../                               \\                  \\****| |</span>
                <span class="art">|                              -      \\........-----\\  ||  .----. |     /                     \\                /.........................\\***** | /.................................\\-...........-----\\  |  | | </span>
                <span class="art">|          -               *            \\  |  |         | ||\`---\`| |    /-----...........-----\\                      |  -----  |   | |      |   |           | | .----.|  |            |   |   | |    \\.l...../ | </span>
                <span class="art">|-----.......................----------\\   |          \\.|   |  |./           |      |   |                 </span><span class="art invis">-</span><span class="art">          |    |     |   |    |       |           |   |\`---\`|| |            |   |     |              |</span>
                <span class="art">|          |  |    |   | |   \\...../| |  |    |   ,\`-\`-\`-\`-\`-\`-\`-\`-\`-\`-     | |        |                 </span><span class="art invis">*</span><span class="art">          | |     |  |    \\.........l./        \`-\`-\`-\`-\`-\`-\`-\`-\`-\`-      \\.l......./              |</span>
                <span class="art">|          |       |     |          \\.l......./ &lt;     Garden      |.     |       |  |                 </span><span class="art invis">-</span><span class="art">          \\.l......./                         .|       Beach      \`&gt;                           |</span>
                <span class="art">|          | |           |                         \`------------------       \\...l...../                 </span><span class="art invis">-*</span><span class="art">                                              --------------------’                             | </span>
                <span class="art">|           \\.........../                                  | |    |                                          </span><span class="art invis">-</span><span class="art">                                                     |   |   |                                       |</span>
                <span class="art">|                                                          |    | |                                          </span><span class="art invis">-</span><span class="art">                                                     |       |                                       |</span>
                <span class="art">|                                                          |    | |                                          </span><span class="art invis">*</span><span class="art">                                                     | |   | |                                       |</span>
                <span class="art">|                                                          ||     |                                          </span><span class="art invis">-</span><span class="art">                                                     | |     |                                       |</span>
                <span class="art">|                                                          ||  |  |                                         </span><span class="art invis">--</span><span class="art">                                                     |    |  |                                       |</span>
                <span class="art">|                                                          |  |   |                                          </span><span class="art invis">*</span><span class="art">                                                     |    |  |                                       |</span>
                <span class="art">| -----------------------------------------------|*----*|-------------------------------------------------------------------------------|*----*|-------------------------------  |</span>
                <span class="art">|                                                          *----*                                                                                                  -----*                                       | </span>
                <span class="art">|                                                                                                                                                                                                                  |</span>
                <span class="art">|                                                                                                                                                                                                                  | </span>
                <span class="art">|                                                                                                                                                                                                                  | </span>
                <span class="art">|                                                                                                                                                                                                                  |</span>
                <span class="art">|                                                                                                                                                                                                                  |</span>
                <span class="art">| -----------------------------------------------------------------------------                           -------------------------------------------------------------------------- |</span>
                <span class="art">|                                                                                           /                           \\                                                                                          |</span>
                <span class="art">|                                                                                          /                             \\                                                                                         | </span>
                <span class="art">|                                                                                         /                               \\                                                                                        |</span>
                <span class="art">|                                                                                        /                                 \\                                                                                       |</span>
                <span class="art">|                                                                                       /                                   \\                                                                                      | </span>
                <span class="art">|                                                                                      /                                     \\                                                                                     | </span>
                <span class="art">|                                                                                     /                                       \\                                                                                    |</span>
                <span class="art">|                                                                                    /                                         \\                                                                                   |</span>
                <span class="art">|                                                                                   /                                           \\                                                                                  |</span>
                <span class="art">|                                                                                  /                                             \\                                                                                 |</span>
                <span class="art">|                                                                                 /                                               \\                                                                                |</span>
                <span class="art">|                                                                                /                                                 \\                                                                               |</span>
                <span class="art">|                                                                               /                                                   \\                                                                              | </span>
                <span class="art">|                                                                              /                                                     \\                                                                             | </span>
                <span class="art">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>;`
        var fore = document.getElementsByClassName("hide")[1];
        fore.removeEventListener('click', checkOpen);
        fore.addEventListener('click', function(){
            window.location.href = "../portal/portal.html";
        })
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
