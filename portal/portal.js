// A dictionary (object) containing various items represented as HTML strings.
var art = {};
import { getArt } from "../artHold.js";
var arts = getArt();
var bypass = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

function ready() {
    // Initialize selected item to -1 (no selection)
    localStorage.setItem("selected", -1);
    localStorage.setItem("free", 1);
    /*localStorage.setItem("rpot-full", "true");
    localStorage.setItem("lpot-full", "true");*/

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
    if ((path.substring(path.substring(0, path.lastIndexOf(" ")).lastIndexOf(" "), path.lastIndexOf(" ")) == " ../portal/portal.html")){
        localStorage.setItem("path", path.substring(0, path.lastIndexOf(" ")));
    }
    else if (!(path.substring(path.lastIndexOf(" ")) == " ../portal/portal.html")){
        path = path + " ../portal/portal.html"
        localStorage.setItem("path",path);
    }

    // Set up the 'back' button click event to go back to the previous page.
    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    var pool = document.getElementsByClassName("pool")[0];
    pool.addEventListener('click', function(){
        if(localStorage.getItem("spot" + localStorage.getItem("selected")) == "can"){
            localStorage.setItem("ascii-water", "true");
            removeIte(localStorage.getItem("selected"));
            getIte("can");
        }
    });
    
    // Initialize items and start rain effects
    initItems();
    sleep(40).then(() => { rainInc(); rainfInc(); splashInc();});

    var mapBut = document.getElementsByClassName("map-pc")[0];
    if (localStorage.getItem("has-map1") == "true") {
        take(mapBut, "map1");
    } else {
        mapBut.addEventListener('click', function tk() {
            mapBut.removeEventListener('click', tk);
            take(mapBut, "map1");
        });
    }

    var lpotBut = document.getElementsByClassName("lpot")[0];
    if (localStorage.getItem("lpot-full") == "true") {
        bypass = true;
        checkPortal();
        put(lpotBut, "rose");
    } else {
        lpotBut.addEventListener('click', function pt() {
            localStorage.setItem("lpot-full", "true");
            checkPortal();
            lpotBut.removeEventListener('click', pt);
            put(lpotBut, "rose");
        });
    }

    sleep(10).then(() => {
        var rpotBut = document.getElementsByClassName("rpot")[0];
        if (localStorage.getItem("rpot-full") == "true") {
            bypass = true;
            checkPortal();
            put(rpotBut, "daisy");
        } else {
            rpotBut.addEventListener('click', function pt() {
                localStorage.setItem("rpot-full", "true");
                checkPortal();
                rpotBut.removeEventListener('click', pt);
                put(rpotBut, "daisy");
            });
        }
    })

    var bird = document.getElementById("bird");
    if (localStorage.getItem("dead-bird") == "true"){
        document.getElementById("bird-del").innerHTML = `
                <ul id="bird-del" class="art item">
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span></li>
                <li class="art in-list"><span class="art in-list"></span>   <span class="art in-list red">-</span><span class="art in-list maroon">.</span>-<span class="art in-list maroon">.</span><span class="art in-list red">%</span><span class="art in-list maroon">-*.</span></li>
                <li class="art in-list"><span class="art in-list"></span><span class="art in-list maroon">&lt;/</span>*<span class="art in-list maroon">%-</span><span class="art in-list red"></span>*<span class="art in-list maroon">.</span><span class="art in-list red">--.</span> </li>
                </ul>
            `;
    }

    else {
        bird.addEventListener('click', function kl(){
            if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe"){
                localStorage.setItem("karma", parseInt(localStorage.getItem("karma"))-1);
                document.getElementById("bird-del").innerHTML = `
                    <ul id="bird-del" class="art item">
                    <li class="art in-list"><span class="art in-list"></span></li>
                    <li class="art in-list"><span class="art in-list"></span></li>
                    <li class="art in-list"><span class="art in-list"></span></li>
                    <li class="art in-list"><span class="art in-list"></span></li>
                    <li class="art in-list"><span class="art in-list"></span></li>
                    <li class="art in-list"><span class="art in-list"></span>   <span class="art in-list red">-</span><span class="art in-list maroon">.</span>-<span class="art in-list maroon">.</span><span class="art in-list red">%</span><span class="art in-list maroon">-*.</span></li>
                    <li class="art in-list"><span class="art in-list"></span><span class="art in-list maroon">&lt;/</span>*<span class="art in-list maroon">%-</span><span class="art in-list red"></span>*<span class="art in-list maroon">.</span><span class="art in-list red">--.</span> </li>
                    </ul>
                `
                bird.removeEventListener('click', kl);
                localStorage.setItem("dead-bird", "true");
            }
        });
    }
}

function checkPortal(){
    var port = document.getElementById("portal");
    var portDel = document.getElementById("portal-del");
    if (localStorage.getItem("lpot-full") == "true" && localStorage.getItem("rpot-full") == "true"){
        localStorage.setItem("portal1-open", "true");
        port.addEventListener('click', goPixel);
        if (portDel.classList.contains("invis")){
            portDel.classList.remove("invis");
        }
    }
    else {
        localStorage.setItem("portal1-open", "false");
        port.removeEventListener('click', goPixel);
        portDel.classList.add("invis");
    }
}

function goPixel(){

}

function take(button, name) {
    if (localStorage.getItem("free") < 9) {
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
        if (name == "rose"){
            localStorage.setItem("lpot-full", "false");
            checkPortal();
        }
        if (name == "daisy"){
            localStorage.setItem("rpot-full", "false");
            checkPortal();
        }
    }
}

// Function to remove an item from the inventory.
function put(button, name) {
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name || bypass) {
        document.getElementsByClassName(name + "-del")[0].classList.remove("invis");
        if (name == "can") {
            document.getElementById("behind-can").classList.add("invis");
        }
        if (!bypass){
            removeIte(localStorage.getItem("selected"));
            initItems();
        }
        bypass = false;
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });
        if (name == "rose"){
            localStorage.setItem("lpot-full", "true");
            checkPortal();
        }
        if (name == "daisy"){
            localStorage.setItem("rpot-full", "true");
            checkPortal();
        }
    } 
    else {
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

var raina = 0;
var rainb = 23;
var splashes = 0;

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

var splashImg = [
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                                        </span>
        <span class="art splashes">                              o       </span>
        <span class="art splashes">           o                              </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">       o                                 </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                   o                       </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">    o                                      </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                   o                      </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">                             o           </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                     </span>
    `,   
    `   
        <span class="art splashes">            o                           </span>
        <span class="art splashes">                    o                    </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">           o                              </span>
        <span class="art splashes">                                     </span>
    `,
    `
        <span class="art splashes">                                       </span>
        <span class="art splashes">                                        </span>
        <span class="art splashes">                           o              </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">        o                                 </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">          o                               </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                            o            </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                     </span>
    `,
    `
        <span class="art splashes">                                       </span>
        <span class="art splashes">                                        </span>
        <span class="art splashes">        o                                 </span>
        <span class="art splashes">                                 o         </span>
        <span class="art splashes">                                        </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">           o                          </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                     </span>
    `,
    `
        <span class="art splashes">                                       </span>
        <span class="art splashes">                     o                  </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">               o                           </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">       o            o                   </span>
        <span class="art splashes">                                     </span>
    `,
    `
        <span class="art splashes">                                       </span>
        <span class="art splashes">                                      </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                               o         </span>
        <span class="art splashes">                                     </span>
        <span class="art splashes">        o                              </span>
        <span class="art splashes">                                     </span>
    `,
    `   
        <span class="art splashes">                                        </span>
        <span class="art splashes">       o                   o             </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                           </span>
        <span class="art splashes">                                         </span>
        <span class="art splashes">                 o                    </span>
        <span class="art splashes">                                          </span>
        <span class="art splashes">                                     </span>
    `

]

function splashInc(){
    splashes = splashes + 1;
    if (splashes > 12){
        splashes = splashes - 13;
    }
    document.getElementsByClassName("splashes")[0].innerHTML = splashImg[splashes];
    sleep(150).then(() => {splashInc()});
}

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
        addArray.push(i);

        if (localStorage.getItem("spot" + i) == name) {
            localStorage.setItem("has-" + name, "true");
        }
    }
    localStorage.setItem("free", spot);
    for (let ind in addArray) {
        getIte(localStorage.getItem("spot" + addArray[ind]));
    }
    select(spot);
}

// Function to handle the selection of an item.
function select(item) {
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