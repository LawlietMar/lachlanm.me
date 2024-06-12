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
    // Initialize path variable from local storage
    var path = localStorage.getItem("path");
    
    // If the current path does not end with '../shed/shed.html', append it
    if (!(path.substring(0, path.substring(0, path.lastIndexOf(" ")).lastIndexOf(" ")) == " ../garden/garden.html")){
        localStorage.setItem("path", path.substring(0, path.lastIndexOf(" ")));
    }
    else if (!(path.substring(path.lastIndexOf(" ")) == " ../garden/garden.html")){
        path = path + " ../garden/garden.html"
        localStorage.setItem("path",path);
    }

    // Get the 'back' button element and add an event listener to go back to the previous page
    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    sleep(40).then(() => { rainInc(); rainfInc(); });
}

var raina = 0; // Initialize raina variable for rain animation
var rainb = 23; // Initialize rainb variable for rain animation

var rainsa = [
    "                                                                                                                                                                                                                   ",
    "                                                                               .                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                       .                                                                                                                           ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                  .                                                                                                                ",
    "                                                                                                                                                                                                                   ",
    "                                                                                   .                                                                                                                               ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                               .                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                   .                                                                                                                               ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                         .                                                                                                                         ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                             .                                                                                                                                     ",
    "                                                                                                    .                                                                                                              ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                               .                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                  ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   "
]

var rainsb = [
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                      l                                                                                                            ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                     l                                                                                                             ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                  ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                               l                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                  ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   ",
    "                                                                                                                                                                                                                   "
]
function rainInc(){ // Function to increment rain animation part A
    var cur;
    for (var i = 0; i < 47; i++){ // Iterate through elements to update rain animation
        cur = document.getElementById(i);
        cur.innerHTML = rainsa[(47 + i - raina)%47] // Update innerHTML with appropriate rain character
    }

    raina = raina + 2; // Increment raina
    if (raina > 46){ // Reset raina if it exceeds the limit
        raina = raina-47;
    }
    sleep(50).then(() => {rainInc()}); // Recursive call to continue animation
}

function rainfInc(){ // Function to increment rain animation part B
    var cur;
    for (var i = 48; i < 95; i++){ // Iterate through elements to update rain animation
        cur = document.getElementById(i);
        cur.innerHTML = rainsb[(47 + i - rainb)%47] // Update innerHTML with appropriate rain character
    }

    rainb = rainb + 3; // Increment rainb
    if (rainb > 46){ // Reset rainb if it exceeds the limit
        rainb = rainb-47;
    }
    sleep(50).then(() => {rainfInc()}); // Recursive call to continue animation
}

function sleep(ms) { // Sleep function to delay execution
    return new Promise(resolve => setTimeout(resolve, ms));
}

function goBack(){ // Function to navigate back to the previous path
    var prev = "";
    var path = localStorage.getItem("path");
    var lastSpace = path.lastIndexOf(" ");

    path = path.substring(0, lastSpace);
    lastSpace = path.lastIndexOf(" ");

    prev = path.substring(lastSpace + 1); // Get the previous path
    localStorage.setItem("path", path.substring(0, lastSpace)); // Update path in local storage
    window.location.href = prev; // Navigate to the previous path
}