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
    // Get the current path from localStorage and update it if necessary.
    var path = localStorage.getItem("path");
    if ((path.substring(path.substring(0, path.lastIndexOf(" ")).lastIndexOf(" "), path.lastIndexOf(" ")) == " ../beach/beach.html")){
        localStorage.setItem("path", path.substring(0, path.lastIndexOf(" ")));
    }
    else if (!(path.substring(path.lastIndexOf(" ")) == " ../beach/beach.html")){
        path = path + " ../beach/beach.html"
        localStorage.setItem("path",path);
    }

    // Set up the 'back' button click event to go back to the previous page.
    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => {init = "false";  rainInc(); rainfInc(); checkOpen()});
    
    var fore = document.getElementsByClassName("hide")[1];
    fore.addEventListener('click', checkOpen);

    // Set up the bird element to handle interactions with the axe item.
    var bird = document.getElementsByClassName("bird")[0];
    if (localStorage.getItem("dead-birdB") == "true") {
        // If the bird is marked as dead, display the corresponding HTML.
        document.getElementById("bird-del").innerHTML = `
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span>   <span class="art in-list red">-</span><span class="art in-list maroon">.</span>-<span class="art in-list maroon">.</span><span class="art in-list red">%</span><span class="art in-list maroon">-*.</span></li>
                <li class="art in-list"><span class="art in-list"></span><span class="art in-list maroon">&lt;/</span>*<span class="art in-list maroon">%-</span><span class="art in-list red"></span>*<span class="art in-list maroon">.</span><span class="art in-list red">--.</span> </li>
            `;
    } else {
        if (!(localStorage.getItem("birdBfed") == "true")){
            bird.addEventListener('click', function fd(){
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "fish"){
                    sleep(20).then(() => {
                        removeIte(localStorage.getItem("selected"));
                        initItems();
                    });
                    setBird();
                    localStorage.setItem("birdBfed", "true");
                    bird.removeEventListener("click", fd);
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) + 1);
                }
            });
            // Set up a click event for the bird to handle interactions with the axe item.
            bird.addEventListener('click', function kl() {
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe") {
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) - 2);
                    document.getElementById("bird-del").innerHTML = `
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span>   <span class="art in-list red">-</span><span class="art in-list maroon">.</span>-<span class="art in-list maroon">.</span><span class="art in-list red">%</span><span class="art in-list maroon">-*.</span></li>
                        <li class="art in-list"><span class="art in-list"></span><span class="art in-list maroon">&lt;/</span>*<span class="art in-list maroon">%-</span><span class="art in-list red"></span>*<span class="art in-list maroon">.</span><span class="art in-list red">--.</span> </li>
                    `;
                    let newBd = bird.cloneNode(true);
                    bird.parentNode.replaceChild(newBd, bird);
                    localStorage.setItem("dead-birdB", "true");
                }
            });
        }
        else {
            setBird();
            bird.addEventListener('click', function kl() {
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe") {
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) - 2);
                    document.getElementById("bird-del").innerHTML = `
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span></li>
                        <li class="art in-list"><span class="art in-list"></span>   <span class="art in-list red">-</span><span class="art in-list maroon">.</span>-<span class="art in-list maroon">.</span><span class="art in-list red">%</span><span class="art in-list maroon">-*.</span></li>
                        <li class="art in-list"><span class="art in-list"></span><span class="art in-list maroon">&lt;/</span>*<span class="art in-list maroon">%-</span><span class="art in-list red"></span>*<span class="art in-list maroon">.</span><span class="art in-list red">--.</span> </li>
                    `;
                    let newBd = bird.cloneNode(true);
                    bird.parentNode.replaceChild(newBd, bird);
                    localStorage.setItem("dead-birdB", "true");
                }
            });
        }
    }
    //moveMoon();
}

function setBird(){
    var bird = document.getElementById("bird-del");
    bird.innerHTML = `
            <li class="art in-list"><span class="art in-list">     .--.            </span></li>
            <li class="art in-list"><span class="art in-list">&lt;&lt;*^  *-::::::/  </span></li>
            <li class="art in-list"><span class="art in-list">     *--.-...-..*    </span></li>
            <li class="art in-list"><span class="art in-list">         .l  .l </span></li>
            `;
}

/*function moveMoon(){
    var moon = parseInt(localStorage.getItem("moon"));
    if (moon > 4){
        moon = moon - 5;
    }
    localStorage.setItem("moon", moon+1);
    checkOpen();
    sleep(1000).then(() => {moveMoon();});
}*/

function checkOpen(){
    var moon = localStorage.getItem("moon");
    var moonD = document.getElementsByClassName("moon")[0];
    moonD.id = "moon" + moon;
    if (moon == 3){
        document.getElementsByClassName("cove")[0].addEventListener("click", function(){
            //window.location.href = ../pixel/entry/entry.html;
        });
        var pict = document.getElementById("picture");
        pict.innerHTML = `
                <span class="art">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  </span>
                <span class="art">|                                                                                                                                                                                                            </span>
                <span class="art">|                                                                                                                                                                                                            </span>
                <span class="art">|                       </span>
                <span class="art">|                 </span>
                <span class="art">|                </span>
                <span class="art">|                 </span>
                <span class="art">|                    </span>
                <span class="art">|                  </span>
                <span class="art">|     </span>
                <span class="art">|     </span>
                <span class="art">|     </span>
                <span class="art">|     </span>
                <span class="art">|............................................................................................................................................................................................................... </span>
                <span class="art">|-------------------------------------------------------------------------------------------------------------------- |\\*.------------------------------------------------------  </span>
                <span class="art">|---------------------------- ...-:::::-.--... --------------------------------------------------------------------------|\\--*.---------------------------------------------------</span>
                <span class="art">|----------------............ .*.*#####*.*.\\    ******************-----------------------******************        \\----*.              .................-----------------***** </span>
                <span class="art">|-------------.............../ /########\\ \\.\\---------------------...............................--------------------******|\\-----*.********..............-----------*************</span>
                <span class="art">|\\     ..                      / /#########\\ \\-\\****-------------------.......................------------------***********\\-----*.*********        ................---------****** </span>
                <span class="art">| **-*  \\**************/./##########\\.\\-\\..................                                     .............----------------|\\       *.***********                ..........--------- </span>
                <span class="art">|   //    *\\ .........          ****************--..              **********--------***********                       ..........||\\-------*.---------*************                       </span>
                <span class="art">|-...\\ ....-**-...   *********\\                       *|..........................         ......---------------***********            |\\         *.                                                   </span>
                <span class="art">|    /             **\\            /**-..                 /\\                          *******                                                   ||\\ --------*............--------------************** </span>
                <span class="art">|   |     -*         /**************|              /.............                                        ........------------***********|\\           *.                                              </span>
                <span class="art">|**--..........--***.                 /|             |\\              ***********---------**********                                     ||\\            *.                      .....-----*******</span>
                <span class="art">|        \\       -     \\                 /              |                                                                                     ** ...||.\\.----------*.----***********               ..-* </span>
                <span class="art">|        |             /|***********/              /..................                                           ........--------********      ||\\             *.                                 /  \\</span>
                <span class="art">|        |             \\|             //              /                   ********---------------**********                                   || \\              *.                          .-**--**</span>
                <span class="art">|        |             /...          /              /\\                                                                                                  ||  \\               *.         ....-------.-*   /   /</span>
                <span class="art">|       / \\         ../*-.******/              /                                                                                      ...........-------\\................*. *****           /  **-.   |</span>
                <span class="art">|..   //  |   ..-**   ..-*|                    /*************----------........................---------------***********                   ||***********||  -    )-      .-*|           |\\ </span>
                <span class="art">|****---:::*----***  \\.|  *     &#41;-                                                                                    -                        )-     ||*-----------*||             .*    *--./*   /</span>
                <span class="art">|               /           \\                -                                -        &#41;-                                               *                  ||             ..//             /*-...     ....\\--...</span>
                <span class="art">|               |            \\                             *                                              *                                                //               || -&#41;         /       ***        /</span>
                <span class="art">|                \\        \\ -***-.                                                                                                            -&#41;        -            *         /        *. /        |      /</span>
                <span class="art">|             ./  \\        \\.      /          &#41;-               -                  -&#41;      -             -      &#41;      *           *            /                              *         /          /  \\    |</span>
                <span class="art">|***---....-/    |         *\\    |           /                                    /                            /                              *                                        |         /|     .- /</span>
                <span class="art">|                 \\           *:- \\          *                                    *                            *                                          .......----------------   /\\          |    \\*-..-  </span>
                <span class="art">|                  \\            *-.\\*****-------------------------------------------------------------------------------*************.......-------------- .-*| \\         /     *.   /</span>
                <span class="art">|**--.|../                        *|*-.***-------------------------------------------------------------------------------************                        *-..   |      / \\      *./ </span>
                <span class="art">|      /  \\        *    |\\      *-.     *.                                                                                                                                              **-.     |  *-. / </span>
                <span class="art">|     /                 / \\        /  ..-*                                                                                                                                                    *.  /      \\ </span>
                <span class="art">|----....           ......-----****                                                                                                                                                           **---..|  .. </span>
                <span class="art">|         *:::::--**                                                                                                                                                                                    **  *.</span>
                <span class="art">|...---***                                                                                                                                                                                                    *</span>
                <span class="art">|                                                                                                                                                                                          </span>
                <span class="art">|                                                                                                                                                                                              </span>
                <span class="art">|                                                                                                                                                                                                          </span>
                <span class="art">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>`
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
        sleep(10).then(() => { initItemsMeat(i + 1); });
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

function goBack() {
    var prev = "";
    var path = localStorage.getItem("path");
    var lastSpace = path.lastIndexOf(" ");

    path = path.substring(0, lastSpace);
    lastSpace = path.lastIndexOf(" ");

    prev = path.substring(lastSpace + 1);
    localStorage.setItem("path", path.substring(0, lastSpace));
    window.location.href = prev;
}