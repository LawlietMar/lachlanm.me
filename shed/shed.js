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

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    localStorage.setItem("selected", -1);
    /*localStorage.setItem("free", 1);
    localStorage.setItem("has-axe", 'false');
    localStorage.setItem("has-shovel", 'false');
    localStorage.setItem("has-can", 'false');
    localStorage.setItem("has-rose-seeds", 'false');
    localStorage.setItem("has-daisy-seeds", 'false');*/
    
    var path = localStorage.getItem("path");
    if (!(path.substring(path.lastIndexOf(" ")) == " ../shed/shed.html")){
        path = path + " ../shed/shed.html"
        localStorage.setItem("path",path);
    }

    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    var axeBut = document.getElementsByClassName("axe-button")[0];
    if (localStorage.getItem("has-axe") == "true"){
        take(axeBut, "axe");
    }
    else{
        axeBut.addEventListener('click', function tk(){
            axeBut.removeEventListener('click', tk);
            take(axeBut, "axe");
        });
    }

    var shovelBut = document.getElementsByClassName("shovel-button")[0];
    if (localStorage.getItem("has-shovel") == "true"){
        take(shovelBut, "shovel");
    }
    else{
        shovelBut.addEventListener('click', function tk(){
            shovelBut.removeEventListener('click', tk);
            take(shovelBut, "shovel");
        });
    }

    var canBut = document.getElementsByClassName("can-button")[0];
    if (localStorage.getItem("has-can") == "true"){
        take(canBut, "can");
    }
    else{
        canBut.addEventListener('click', function tk(){
            document.getElementById("behind-can").classList.remove("invis");
            canBut.removeEventListener('click', tk);
            take(canBut, "can");
        });
    }

    var roseBut = document.getElementsByClassName("rose-seeds")[0];
    if (localStorage.getItem("has-rose-seeds") == "true"){
        take(roseBut, "rose-seeds");
    }
    else{
        roseBut.addEventListener('click', function tk(){
            roseBut.removeEventListener('click', tk);
            take(roseBut, "rose-seeds");
        });
    }

    var daisyBut = document.getElementsByClassName("daisy-seeds")[0];
    if (localStorage.getItem("has-daisy-seeds") == "true"){
        take(daisyBut, "daisy-seeds");
    }
    else{
        daisyBut.addEventListener('click', function tk(){
            daisyBut.removeEventListener('click', tk);
            take(daisyBut, "daisy-seeds");
        });
    }
    
    initItems();
    sleep(40).then(() => {rainInc(); rainfInc();});
}

function take(button, name){
    if (localStorage.getItem("free") < 9){
        document.getElementsByClassName(name + "-del")[0].classList.add("invis");
        if (name == "can"){
            document.getElementById("behind-can").classList.remove("invis");
        }
        if (!(localStorage.getItem("has-"+name) == "true")){
            getIte(name);
            initItems();
        }
        button.addEventListener('click', function pt(){
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

function put(button, name){
    if (localStorage.getItem("spot"+localStorage.getItem("selected")) == name){
        document.getElementsByClassName(name + "-del")[0].classList.remove("invis");
        if (name == "can"){
            document.getElementById("behind-can").classList.add("invis");
        }
        removeIte(localStorage.getItem("selected"));
        initItems();
        button.addEventListener('click', function tk(){
            button.removeEventListener('click', tk);
            take(button, name);
        });
    }
    else {
        button.addEventListener('click', function pt(){
            button.removeEventListener('click', pt);
            put(button, name);
        });
    }
}

var raina = 0;
var rainb = 23;

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

function initItems(){
    for (let j = 1; j < 9; j++){
        const spot = document.getElementById("spot" + j);
        spot.innerHTML = "";
        let newSpot = spot.cloneNode(true);
        spot.parentNode.replaceChild(newSpot, spot);
    }
    initItemsMeat(1);
}

function initItemsMeat(i){
    if (i<localStorage.getItem("free")){
        var nam = localStorage.getItem("spot" + i);
        var spot = document.getElementById("spot" + i);
        spot.innerHTML = arts[nam];
        spot.addEventListener('click', function(){select(i)});
        sleep(10).then(() => {initItemsMeat(i+1)})
    }
}

function getIte(name){
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    spot.innerHTML = arts[name];
    localStorage.setItem("spot" + free, name);
    localStorage.setItem("has-" + name, "true");
    localStorage.setItem("free", parseInt(free)+1);
}

function removeIte(spot){
    var addArray = [];
    var name = localStorage.getItem("spot" + spot);
    localStorage.setItem("has-" + name, "false");
    for (var i = parseInt(spot)+1; i<localStorage.getItem("free"); i++){
        addArray.push(i);

        if (localStorage.getItem("spot" + i) == name){
            localStorage.setItem("has-" + name, "true");
        }
    }
    localStorage.setItem("free", spot);
    for (let ind in addArray){
        getIte(localStorage.getItem("spot" + addArray[ind]));
    }
    select(spot);
}

function select(item){
    var sel = false;
    if (document.getElementById("spot" + item).classList.contains("selected")){
        sel = true;
    }
    var ite;
    for (let i = 1; i<9;i++){
        ite = document.getElementById("spot" + i);
        if (ite.classList.contains("selected")){
            ite.classList.remove("selected");
        }
    }
    if (!sel){
        localStorage.setItem("selected", item);
        document.getElementById("spot" + item).classList.add("selected");
    }
}

function goBack(){
    var prev = "";
    var path = localStorage.getItem("path");
    var lastSpace = path.lastIndexOf(" ");

    path = path.substring(0, lastSpace);
    lastSpace = path.lastIndexOf(" ");

    prev = path.substring(lastSpace + 1);
    localStorage.setItem("path", path.substring(0, lastSpace));
    window.location.href = prev;
}