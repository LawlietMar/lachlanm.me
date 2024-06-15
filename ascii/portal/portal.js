import { getAch } from "../../artHold.js";
var art = getAch();

// Importing a function to get art items from another JavaScript file.
import { getArt } from "../../artHold.js";
var arts = getArt();

// A flag to bypass certain conditions.
var bypass = false;

// Check if the document is still loading.
if (document.readyState == 'loading') {
    // If the document is loading, set up an event listener to call the ready function once the document is fully loaded.
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

// Function that initializes the state and sets up event listeners.
var init;
function ready() {
    init = "true";
    // Initialize local storage variables for item selection and free slots.
    localStorage.setItem("selected", -1);  // No item is selected initially.
    localStorage.setItem("free", 1);       // The first slot is available.

    // Uncomment the following lines to reset specific inventory items in local storage.
    /*
    localStorage.setItem("has-axe", 'false');
    localStorage.setItem("has-shovel", 'false');
    localStorage.setItem("has-can", 'false');
    localStorage.setItem("has-rose-seeds", 'false');
    localStorage.setItem("has-daisy-seeds", 'false');
    */

    // Check which items are currently available in the inventory.
    checkHave();

    // Retrieve and update the navigation path.
    var path = localStorage.getItem("path");
    if ((path.substring(path.substring(0, path.lastIndexOf(" ")).lastIndexOf(" "), path.lastIndexOf(" ")) == " ../portal/portal.html")){
        // If the current path includes a visit to the portal, update it to the previous path.
        localStorage.setItem("path", path.substring(0, path.lastIndexOf(" ")));
    } else if (!(path.substring(path.lastIndexOf(" ")) == " ../portal/portal.html")){
        // If the path does not include a visit to the portal, append it.
        path = path + " ../portal/portal.html";
        localStorage.setItem("path", path);
    }

    // Set up the 'back' button to navigate to the previous page.
    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    // Set up a click event for the pool element to handle filling a can with water.
    var pool = document.getElementsByClassName("pool")[0];
    if (!(localStorage.getItem("ascii-water") == "true")){
        pool.addEventListener('click', function(){
            if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "can") {
                localStorage.setItem("ascii-water", "true");
                removeIte(localStorage.getItem("selected"));
                getIte("can");
            }
        });
    }

    // Initialize items and start various animations.
    initItems();
    sleep(40).then(() => {init = "false";  rainInc(); rainfInc(); splashInc(); });

    // Set up the map button to add a map item to the inventory.
    var mapBut = document.getElementsByClassName("map-pc")[0];
    if (localStorage.getItem("has-map1") == "true") {
        take(mapBut, "map1");
    } else {
        mapBut.addEventListener('click', function tk() {
            mapBut.removeEventListener('click', tk);
            take(mapBut, "map1");
        });
    }

    // Set up the left pot button to manage the rose item.
    var lpotBut = document.getElementsByClassName("lpot")[0];
    if (localStorage.getItem("lpot-full") == "true") {
        bypass = "true";
        checkPortal();
        put(lpotBut, "rose");
    } else {
        lpotBut.addEventListener('click', function pt() {
            if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "rose"){
                localStorage.setItem("lpot-full", "true");
                checkPortal();
                lpotBut.removeEventListener('click', pt);
                put(lpotBut, "rose");
            }
        });
    }

    // Set up the right pot button to manage the daisy item.
    sleep(10).then(() => {
        var rpotBut = document.getElementsByClassName("rpot")[0];
        if (localStorage.getItem("rpot-full") == "true") {
            bypass = "true";
            checkPortal();
            put(rpotBut, "daisy");
        } else {
            rpotBut.addEventListener('click', function pt() {
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "daisy"){
                    localStorage.setItem("rpot-full", "true");
                    checkPortal();
                    rpotBut.removeEventListener('click', pt);
                    put(rpotBut, "daisy");
                }
            });
        }
    });

    // Set up the bird element to handle interactions with the axe item.
    var bird = document.getElementById("bird");
    if (localStorage.getItem("dead-bird") == "true") {
        // If the bird is marked as dead, display the corresponding HTML.
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
    } else {
        if (!(localStorage.getItem("birdPfed") == "true")){
            bird.addEventListener('click', function fd(){
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "daisy-seeds" || localStorage.getItem("spot" + localStorage.getItem("selected")) == "rose-seeds"){
                    sleep(20).then(() => {
                        removeIte(localStorage.getItem("selected"));
                        initItems();
                    });
                    bird.removeEventListener("click", fd);
                    setBird();
                    localStorage.setItem("birdPfed", "true");
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) + 1);
                }
            });
            // Set up a click event for the bird to handle interactions with the axe item.
            bird.addEventListener('click', function kl() {
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe") {
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) - 2);
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
                    let newBd = bird.cloneNode(true);
                    bird.parentNode.replaceChild(newBd, bird);
                    localStorage.setItem("dead-bird", "true");
                }
            });
        }
        else {
            setBird();
            bird.addEventListener('click', function kl() {
                if (localStorage.getItem("spot" + localStorage.getItem("selected")) == "axe") {
                    localStorage.setItem("karma", parseInt(localStorage.getItem("karma")) - 2);
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
                    let newBd = bird.cloneNode(true);
                    bird.parentNode.replaceChild(newBd, bird);
                    localStorage.setItem("dead-bird", "true");
                }
            });
        }
    }
}

function setBird(){
    var bird = document.getElementById("bird-del");
    bird.innerHTML = `
            <li class="art in-list"><span class="art in-list"></span>  .--.      </li>
            <li class="art in-list"><span class="art in-list"></span>&lt;. ^ \`::::’’ /</li>
            <li class="art in-list"><span class="art in-list"></span>   *-.--.-*</li>
            <li class="art in-list"><span class="art in-list"></span>     .’   \`. </li>
            `;
}

// Function to check and update the state of the portal based on the pots.
function checkPortal() {
    var port = document.getElementById("portal");
    var portDel = document.getElementById("portal-del");
    if (localStorage.getItem("lpot-full") == "true" && localStorage.getItem("rpot-full") == "true") {
        // If both pots are full, open the portal and make it visible.
        localStorage.setItem("portal1-open", "true");
        port.addEventListener('click', goPixel);
        if (portDel.classList.contains("invis")) {
            portDel.classList.remove("invis");
        }
    } else {
        // If either pot is empty, close the portal and hide it.
        localStorage.setItem("portal1-open", "false");
        port.removeEventListener('click', goPixel);
        portDel.classList.add("invis");
    }
}

// Function to handle navigation to the next page (to be defined).
function goPixel() {}

// Function to add an item to the inventory.
function take(button, name) {
    if (localStorage.getItem("free") < 9 || init == "true") {
        // Mark the item as invisible and add it to the inventory if it is not already present.
        document.getElementsByClassName(name + "-del")[0].classList.add("invis");
        if (!(localStorage.getItem("has-" + name) == "true" && name == "map1")) {
            getIte(name);
            initItems();
        }
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });

        // Update pot status if the item is a rose or daisy.
        if (name == "rose") {
            localStorage.setItem("lpot-full", "false");
            checkPortal();
        }
        if (name == "daisy") {
            localStorage.setItem("rpot-full", "false");
            checkPortal();
        }
    }
}

// Function to remove an item from the inventory.
function put(button, name) {
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name || bypass == "true") {
        // Make the item visible again and update the pot status if necessary.
        document.getElementsByClassName(name + "-del")[0].classList.remove("invis");
        if (!(bypass == "true")) {
            removeIte(localStorage.getItem("selected"));
            initItems();
        }
        bypass = "false";
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });

        // Update pot status if the item is a rose or daisy.
        if (name == "rose") {
            localStorage.setItem("lpot-full", "true");
            checkPortal();
        }
        if (name == "daisy") {
            localStorage.setItem("rpot-full", "true");
            checkPortal();
        }
    } else {
        // Set up the button to add the item back to the inventory if conditions are not met.
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

// Variables to manage the rain animation.
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

// Function to increment the splash animation.
function splashInc() {
    splashes = splashes + 1;
    if (splashes > 12) {
        splashes = splashes - 13;
    }
    document.getElementsByClassName("splashes")[0].innerHTML = splashImg[splashes];
    sleep(150).then(() => { splashInc(); });
}

// Function to increment the rain animation for the front layer.
function rainInc() {
    var cur;
    for (var i = 0; i < 47; i++) {
        cur = document.getElementById(i);
        cur.innerHTML = rainsa[(47 + i - raina) % 47];
    }

    raina = raina + 2;
    if (raina > 46) {
        raina = raina - 47;
    }
    sleep(50).then(() => { rainInc(); });
}

// Function to increment the rain animation for the back layer.
function rainfInc() {
    var cur;
    for (var i = 48; i < 95; i++) {
        cur = document.getElementById(i);
        cur.innerHTML = rainsb[(47 + i - rainb) % 47];
    }

    rainb = rainb + 3;
    if (rainb > 46) {
        rainb = rainb - 47;
    }
    sleep(50).then(() => { rainfInc(); });
}

// Function to create a promise that resolves after a specified time.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to check which items are currently available and retrieve them.
function checkHave() {
    var tems = [];
    for (var i = 1; i < 9; i++) {
        if (!(localStorage.getItem("spot" + i) == 0)) {
            tems.push(localStorage.getItem("spot" + i));
        }
    }
    for (let tem in tems) {
        if (localStorage.getItem("has-" + tems[tem]) == "true") {
            getIte(tems[tem]);
        }
    }
}

// Function to initialize the inventory items.
function initItems() {
    for (let j = 1; j < 9; j++) {
        const spot = document.getElementById("spot" + j);
        spot.innerHTML = "";
        let newSpot = spot.cloneNode(true);
        spot.parentNode.replaceChild(newSpot, spot);

        if (localStorage.getItem("has-award-" + j) == "true") {
            document.getElementById("award" + j).innerHTML = art[j];
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

// Function to add an item to the next free slot in the inventory.
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

// Function to add an event listener for selecting an item.
function addList(item) {
    item.addEventListener('click', function() { select(item); });
}

// Function to navigate to the previous page.
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