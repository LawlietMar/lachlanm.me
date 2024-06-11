//html sprites
var arts = {
    "key" : `
                <ul class="item" id="key">
                    <li class="art artln"><span class="art artln">      .---.                </span></li>
                    <li class="art artln"><span class="art artln">     l      \`--^-^--^-. </span></li>
                    <li class="art artln"><span class="art artln">     l  O   ----------*</span></li>
                    <li class="art artln"><span class="art artln">      \`----’</span></li>     
                </ul>
            `,
    "axe" : `
                <ul class="item" id="axe">
                    <li class="art artln"><span class="art artln">                       ..  </span></li>
                    <li class="art artln"><span class="art artln">            ...---***-:\` </span></li>
                    <li class="art artln"><span class="art artln">   ...---***---**\\    \`-.  </span></li>
                    <li class="art artln"><span class="art artln">  *---***         *--..--* </span></li>     
                </ul>
            `,
    "shovel": `
                <ul class="item" id="shovel">
                    <li class="art artln"><span class="art artln">   .                  .--...</span></li>
                    <li class="art artln"><span class="art artln">  : /\`-............../ .... \\</span></li>
                    <li class="art artln"><span class="art artln">  : /.-**********| *** /</span></li>
                    <li class="art artln"><span class="art artln">   *                 *--** </span></li>     
                </ul>
            `,
    "rose-seeds" : `
                <ul class="item" id="rose-seeds">
                    <li class="art artln"><span class="art artln">         .-:::::::-.</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  |  ..-..  |</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | ((o))<span class="art invis in-list">*</span>|</span></li>
                    <li class="art artln"><span class="art artln">         l..........l</span></li>     
                </ul>
            `,
    "daisy-seeds" : `
                <ul class="item" id="daisy-seeds">
                    <li class="art artln"><span class="art artln">         .-:::::::-.</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | - o -  |</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | oOo<span class="art invis in-list">*</span>|</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  l....l.....l</span></li>     
                </ul>
            `,
    "can" : `
                <ul class="item" id="can">
                    <li class="art artln"><span class="art artln">         ..--..     .---.</span></li>
                    <li class="art artln"><span class="art artln">   .--./**--**\\.-*.\`\`.*</span></li>
                    <li class="art artln"><span class="art artln"><span class="art invis in-list">*</span> l.C|        *.-* **</span></li>
                    <li class="art artln"><span class="art artln"><span class="art invis in-list">*</span>  **' *-....-*  </span></li>     
                </ul>
            `
}

// Check if the document is still loading
if (document.readyState == 'loading') {
    // If the document is loading, wait for the 'DOMContentLoaded' event to call the 'ready' function
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the 'ready' function immediately
    ready();
}

// Function to initialize various elements and set up event listeners
function ready() {
    // Initialize the 'selected' item in local storage to -1 (no item selected)
    localStorage.setItem("selected", -1);

    // Set up the axe button behavior based on whether the axe is already taken
    var axeBut = document.getElementsByClassName("axe-button")[0];
    if (localStorage.getItem("has-axe") == "true") {
        take(axeBut, "axe");
    } else {
        axeBut.addEventListener('click', function tk() {
            axeBut.removeEventListener('click', tk);
            take(axeBut, "axe");
        });
    }

    // Set up the shovel button behavior based on whether the shovel is already taken
    var shovelBut = document.getElementsByClassName("shovel-button")[0];
    if (localStorage.getItem("has-shovel") == "true") {
        take(shovelBut, "shovel");
    } else {
        shovelBut.addEventListener('click', function tk() {
            shovelBut.removeEventListener('click', tk);
            take(shovelBut, "shovel");
        });
    }

    // Set up the can button behavior based on whether the can is already taken
    var canBut = document.getElementsByClassName("can-button")[0];
    if (localStorage.getItem("has-can") == "true") {
        take(canBut, "can");
    } else {
        canBut.addEventListener('click', function tk() {
            document.getElementById("behind-can").classList.remove("invis");
            canBut.removeEventListener('click', tk);
            take(canBut, "can");
        });
    }

    // Set up the rose seeds button behavior based on whether the rose seeds are already taken
    var roseBut = document.getElementsByClassName("rose-seeds")[0];
    if (localStorage.getItem("has-rose-seeds") == "true") {
        take(roseBut, "rose-seeds");
    } else {
        roseBut.addEventListener('click', function tk() {
            roseBut.removeEventListener('click', tk);
            take(roseBut, "rose-seeds");
        });
    }

    // Set up the daisy seeds button behavior based on whether the daisy seeds are already taken
    var daisyBut = document.getElementsByClassName("daisy-seeds")[0];
    if (localStorage.getItem("has-daisy-seeds") == "true") {
        take(daisyBut, "daisy-seeds");
    } else {
        daisyBut.addEventListener('click', function tk() {
            daisyBut.removeEventListener('click', tk);
            take(daisyBut, "daisy-seeds");
        });
    }

    // Initialize the items and start the rain animation functions
    initItems();
}

// Function to handle taking an item and updating the UI and local storage accordingly
function take(button, name) {
    // Check if there is space to add a new item (less than 9 items)
    if (localStorage.getItem("free") < 9) {
        // Hide the delete button for the item
        document.getElementsByClassName(name + "-del")[0].classList.add("invis");
        if (name == "can") {
            document.getElementById("behind-can").classList.remove("invis");
        }
        // If the item is not already taken, add it to the inventory
        if (!(localStorage.getItem("has-" + name) == "true")) {
            getIte(name);
            initItems();
        }
        // Add an event listener to the button to handle putting the item back
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

// Function to handle putting an item back and updating the UI and local storage accordingly
function put(button, name) {
    // Check if the selected item is the same as the one to be put back
    if (localStorage.getItem("spot" + localStorage.getItem("selected")) == name) {
        // Show the delete button for the item
        document.getElementsByClassName(name + "-del")[0].classList.remove("invis");
        if (name == "can") {
            document.getElementById("behind-can").classList.add("invis");
        }
        // Remove the item from the inventory
        removeIte(localStorage.getItem("selected"));
        initItems();
        // Add an event listener to the button to handle taking the item again
        button.addEventListener('click', function tk() {
            button.removeEventListener('click', tk);
            take(button, name);
        });
    } else {
        // Add an event listener to the button to handle putting the item back again
        button.addEventListener('click', function pt() {
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

function sleep(ms) { // Sleep function to delay execution
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initItems(){ // Initialize item slots
    for (let j = 1; j < 9; j++){ // Iterate through item slots
        const spot = document.getElementById("spot" + j);
        spot.innerHTML = ""; // Clear innerHTML
        let newSpot = spot.cloneNode(true); // Clone node to remove event listeners
        spot.parentNode.replaceChild(newSpot, spot); // Replace old node with new one
    }
    initItemsMeat(1); // Initialize items starting from slot 1
}

function initItemsMeat(i){ // Recursive function to initialize items
    if (i < localStorage.getItem("free")){ // Check if the slot should be initialized
        var nam = localStorage.getItem("spot" + i);
        var spot = document.getElementById("spot" + i);
        spot.innerHTML = arts[nam]; // Set innerHTML to corresponding art
        spot.addEventListener('click', function(){select(i)}); // Add click event listener
        sleep(5).then(() => {initItemsMeat(i+1)}) // Recursive call with delay
    }
}

function getIte(name){ // Function to get item and update local storage
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    console.log(spot);
    console.log(free);
    spot.innerHTML = arts[name]; // Set innerHTML to corresponding art
    localStorage.setItem("spot" + free, name); // Update local storage with item name
    localStorage.setItem("has-" + name, "true"); // Mark item as taken in local storage
    localStorage.setItem("free", parseInt(free)+1); // Increment free slot counter
}

function removeIte(spot){ // Function to remove item and update local storage
    var addArray = [];
    var name = localStorage.getItem("spot" + spot);
    localStorage.setItem("has-" + name, "false"); // Mark item as not taken in local storage
    for (var i = parseInt(spot)+1; i < localStorage.getItem("free"); i++){
        addArray.push(i);

        if (localStorage.getItem("spot" + i) == name){
            localStorage.setItem("has-" + name, "true"); // Re-mark item as taken if found again
        }
    }
    localStorage.setItem("free", spot); // Update free slot counter
    for (let ind in addArray){
        getIte(localStorage.getItem("spot" + addArray[ind])); // Re-add items to slots
    }
    select(spot); // Select the slot
}

function select(item){ // Function to handle item selection
    var sel = false;
    if (document.getElementById("spot" + item).classList.contains("selected")){
        sel = true;
    }
    var ite;
    for (let i = 1; i < 9; i++){
        ite = document.getElementById("spot" + i);
        if (ite.classList.contains("selected")){
            ite.classList.remove("selected"); // Remove selected class from all items
        }
    }
    if (!sel){
        localStorage.setItem("selected", item); // Mark item as selected in local storage
        document.getElementById("spot" + item).classList.add("selected"); // Add selected class to item
    }
}