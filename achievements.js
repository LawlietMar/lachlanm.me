//html sprites
var arts = {
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
    initItems();
}

function sleep(ms) { // Sleep function to delay execution
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initItems(){ // Initialize item slots
    initItemsMeat(1); // Initialize items starting from slot 1
}

function initItemsMeat(i){ // Recursive function to initialize items
    if (localStorage.getItem("has-award-" + i) == "true"){
        document.getElementById("award"+i).innerHTML = arts[i];
    }
    sleep(5).then(() => {initItemsMeat(i+1)}) // Recursive call with delay
}