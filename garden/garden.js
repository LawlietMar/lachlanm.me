if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var path = localStorage.getItem("path");
    if (!(path.substring(path.lastIndexOf(" ")) == " ../garden/garden.html")){
        path = path + " ../garden/garden.html"
        localStorage.setItem("path",path);
    }

    initItems();
    sleep(40).then(() => {rainInc(); rainfInc();});

    var back = document.getElementsByClassName("back")[0];
    back.addEventListener('click', goBack);

    var shed = document.getElementsByClassName("shed")[0];
    shed.addEventListener('click', ifKey);
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

function initItems(){
    var item;
    const items = ["key", "axe"];
    for (let i = 0; i<items.length;i++){
        if (localStorage.getItem("has-" +items[i]) == "true"){
            item = document.getElementById(items[i]);
            if (item.classList.contains("selected")){``
                item.classList.remove("selected");
            }
            item.classList.remove("hidden");
            addList(item);
        }
    }
}

function addList(item){
    item.addEventListener('click', function(){select(item)});
}

function select(item){
    var sel = false;
    if (item.classList.contains("selected")){
        sel = true;
    }
    var ite;
    let items = ["key", "axe"];
    for (let i = 0; i<items.length;i++){
        ite = document.getElementById(items[i]);
        if (ite.classList.contains("selected")){
            ite.classList.remove("selected");
        }
    }
    if (!sel){ 
        item.classList.add("selected");
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
    window.location.assign(prev);
}

function ifKey(){
    if (document.getElementById("key").classList.contains("selected")){
        window.location.assign("../shed/shed.html");
    }
}