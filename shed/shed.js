if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
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
    "can" : ``
}

function ready(){
    localStorage.setItem("free", 1);
    localStorage.setItem("has-axe", 'false');
    localStorage.setItem("has-shovel", 'false');
    localStorage.setItem("has-can", 'false');
    localStorage.setItem("has-rose-seeds", 'false');
    localStorage.setItem("has-daisy-seeds", 'false');
    var path = localStorage.getItem("path");
    if (!(path.substring(path.lastIndexOf(" ")) == " ../shed/shed.html")){
        path = path + " ../shed/shed.html"
        localStorage.setItem("path",path);
    }

    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    var axeBut = document.getElementsByClassName("axe-button")[0];
    if (localStorage.getItem("has-axe") == "true"){
        axeBut.remove();
        document.getElementsByClassName("axe-del")[0].remove();
    }
    else{
        axeBut.addEventListener('click', function(){
            if (localStorage.getItem("free") < 9){
                document.getElementsByClassName("axe-del")[0].remove();
                axeBut.remove();
                getIte("axe");
                initItems();
            }
        });
    }

    var shovelBut = document.getElementsByClassName("shovel-button")[0];
    if (localStorage.getItem("has-shovel") == "true"){
        shovelBut.remove();
        document.getElementsByClassName("shovel-del")[0].remove();
    }
    else{
        shovelBut.addEventListener('click', function(){
            if (localStorage.getItem("free") < 9){
                document.getElementsByClassName("shovel-del")[0].remove();
                shovelBut.remove();
                getIte("shovel");
                initItems();
            }
        });
    }

    var roseBut = document.getElementsByClassName("rose-seeds")[0];
    if (localStorage.getItem("has-rose-seeds") == "true"){
        roseBut.remove();
        document.getElementsByClassName("rose-del")[0].remove();
    }
    else{
        roseBut.addEventListener('click', function(){
            if (localStorage.getItem("free") < 9){
                document.getElementsByClassName("rose-del")[0].remove();
                roseBut.remove();
                getIte("rose-seeds");
                initItems();
            }
        });
    }

    var daisyBut = document.getElementsByClassName("daisy-seeds")[0];
    if (localStorage.getItem("has-daisy-seeds") == "true"){
        daisyBut.remove();
        document.getElementsByClassName("daisy-del")[0].remove();
    }
    else{
        daisyBut.addEventListener('click', function(){
            if (localStorage.getItem("free") < 9){
                document.getElementsByClassName("daisy-del")[0].remove();
                daisyBut.remove();
                getIte("daisy-seeds");
                initItems();
            }
        });
    }
    
    initItems();
    sleep(40).then(() => {rainInc(); rainfInc();});
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
    initItemsMeat(1);
}

function initItemsMeat(i){
    if (i<localStorage.getItem("free")){
        const nam = localStorage.getItem("spot" + i);
        const spot = document.getElementById("spot" + i);
        spot.innerHTML = arts[nam];
        if (i == localStorage.getItem("free")-1){
            spot.addEventListener('click', function(){select(i)});
        }
        sleep(10).then(() => {initItemsMeat(i+1)})
    }
}

function addList(item){
    item.addEventListener('click', function(){select(item)});
}

function getIte(name){
    const free = localStorage.getItem("free");
    const spot = document.getElementById("spot" + free);
    spot.innerHTML = arts[name];
    localStorage.setItem("spot" + free, name);
    localStorage.setItem("has-" + name, "true");
    localStorage.setItem("free", parseInt(free)+1);
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