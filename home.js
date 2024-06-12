if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var fired = false;
var timeout;

function ready(){
    localStorage.setItem("path", "../index.html ../index.html ../index.html")

    var stay = document.getElementsByClassName("stay-button")[0];
    stay.addEventListener('click', rekindle);

    var reset = document.getElementsByClassName("reset")[0];
    reset.addEventListener("click", resetP);
    if (!(localStorage.getItem("reset") == "true")){
        resett(document.getElementsByClassName("reset")[0]);
    }
}

var cnt = 20;
function rekindle(){
    if (fired == false){
        var fire = document.getElementsByClassName("fire")[0];
        var add = "the" + '\xa0' + "fire" + '\xa0' + "is" + '\xa0' + "burning" + '\xa0' + "brightly!"
        erase(fire, add);

        fired = true;
        var list = document.getElementsByClassName("choices")[0];
        list.removeChild(list.children[0]);
    }
}

function erase(fire, add){
    if (cnt > 0){
        cnt = cnt - 1;
        fire.innerText = fire.innerText.substring(0, fire.innerText.length -1);
        if (cnt < 28){
            sleep(50).then(() => {erase(fire, add);});
        }
    }
    if (cnt == 0){
        write(fire, add);
    }
}

function write(fire, add){
    if (cnt == 0){
        fire.classList.add("burning-fire");
    }
    if (cnt < 30){
        fire.innerText = fire.innerText + add.charAt(cnt);
        cnt = cnt + 1;
        sleep(55).then(() => {write(fire, add);});
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetP(){
    var ite = document.getElementsByClassName("reset")[0];
    ite.innerHTML = "Are you sure?";
    ite.classList.add("burning-fire");
    ite.addEventListener('click', function(){resett(ite)});
}

function resett(ite){
    ite.parentElement.remove();
    localStorage.setItem("reset", "true");
    localStorage.setItem("karma", 0);
    localStorage.setItem("dead-bird", "false");


    localStorage.setItem("has-key", "true");
    localStorage.setItem("has-axe", false);
    localStorage.setItem("has-shovel", false);
    localStorage.setItem("has-can", false);
    localStorage.setItem("has-rose-seeds", false);
    localStorage.setItem("has-daisy-seeds", false);
    localStorage.setItem("has-rose", false);
    localStorage.setItem("has-daisy", false);
    localStorage.setItem("has-map1", false);
    localStorage.setItem("has-forest", false);

    
    localStorage.setItem("spot1", "key");
    localStorage.setItem("spot2", 0);
    localStorage.setItem("spot3", 0);
    localStorage.setItem("spot4", 0);
    localStorage.setItem("spot5", 0);
    localStorage.setItem("spot6", 0);
    localStorage.setItem("spot7", 0);
    localStorage.setItem("spot8", 0);
}