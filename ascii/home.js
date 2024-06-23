import { ready2 } from "../aud.js";
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
    localStorage.setItem("moon", 1);
    localStorage.setItem("balls", 0);
    localStorage.setItem("aud-spot-forest", 0);
    localStorage.setItem("aud-spot-beach", 0);

    localStorage.setItem("dead-bird", "false");
    localStorage.setItem("dead-birdB", "false");
    localStorage.setItem("lpot-full", "false");
    localStorage.setItem("rpot-full", "false");
    localStorage.setItem("tpot-full", "true");
    localStorage.setItem("ascii-water", "false");
    localStorage.setItem("p1water", "false");

    localStorage.setItem("torch-placed", "false");
    localStorage.setItem("rope-placed", "false");
    localStorage.setItem("elevator-position", "mid");

    localStorage.setItem("dead-bunny", "false");
    localStorage.setItem("bunny-x", 1100);

    localStorage.setItem("has-key", "false");
    localStorage.setItem("has-axe", "false");
    localStorage.setItem("has-shovel", "false");
    localStorage.setItem("has-can", "false");
    localStorage.setItem("has-rose-seeds", "false");
    localStorage.setItem("has-daisy-seeds", "false");
    localStorage.setItem("has-poppy-seeds", "false");
    localStorage.setItem("has-cornflower-seeds", "false");

    localStorage.setItem("has-rose", "false");
    localStorage.setItem("has-daisy", "false");
    localStorage.setItem("has-poppy", "false");
    localStorage.setItem("has-cornflower", "false");
    localStorage.setItem("has-p1rose", "false");
    localStorage.setItem("has-p1daisy", "false");
    localStorage.setItem("has-p1poppy", "false");
    localStorage.setItem("has-p1cornflower", "false");

    localStorage.setItem("has-map1", "false");
    localStorage.setItem("has-map2", "false");
    localStorage.setItem("has-fish", "false");
    localStorage.setItem("has-fishing-rod", "false");
    localStorage.setItem("has-forest", "false");
    localStorage.setItem("has-shell", "false");
    localStorage.setItem("has-map-shack", "false");
    localStorage.setItem("has-grave-map", "false");
    localStorage.setItem("has-orb1", "false");
    localStorage.setItem("has-shed-map", "false");
    localStorage.setItem("has-oar", "false");
    localStorage.setItem("has-pole", "false");
    localStorage.setItem("has-unlit-torch", "false");
    localStorage.setItem("has-torch", "false");
    localStorage.setItem("has-unlit-oar", "false");
    localStorage.setItem("has-lit-oar", "false");

    localStorage.setItem("burned-shell", "false");
    localStorage.setItem("burned-cup", "false");
    localStorage.setItem("burned-totem", "false");
    localStorage.setItem("burned-fish", "false");
    localStorage.setItem("appeased", "false");

    localStorage.setItem("put-map-1", "false");
    localStorage.setItem("put-map-2", "false");

    localStorage.setItem("birdPfed", "false");
    localStorage.setItem("birdBfed", "false");

    localStorage.setItem("spot1", 0);
    localStorage.setItem("spot2", 0);
    localStorage.setItem("spot3", 0);
    localStorage.setItem("spot4", 0);
    localStorage.setItem("spot5", 0);
    localStorage.setItem("spot6", 0);
    localStorage.setItem("spot7", 0);
    localStorage.setItem("spot8", 0);

    localStorage.setItem("plot-state1", "toDig");
    localStorage.setItem("plot-state2", "toDig");
    localStorage.setItem("plot-state3", "toDig");
    localStorage.setItem("plot-state4", "toDig");
    localStorage.setItem("plot-state5", "toDig");
    localStorage.setItem("plot-state6", "toDig");

    localStorage.setItem("crop-time1", 0);
    localStorage.setItem("crop-time2", 0);
    localStorage.setItem("crop-time3", 0);
    localStorage.setItem("crop-time4", 0);
    localStorage.setItem("crop-time5", 0);
    localStorage.setItem("crop-time6", 0);

    localStorage.setItem("p1plot-state1", "toDig");
    localStorage.setItem("p1plot-state2", "toDig");
    localStorage.setItem("p1plot-state3", "toDig");
    localStorage.setItem("p1plot-state4", "toDig");
    localStorage.setItem("p1plot-state5", "toDig");
    localStorage.setItem("p1plot-state6", "toDig");

    localStorage.setItem("p1crop-time1", 0);
    localStorage.setItem("p1crop-time2", 0);
    localStorage.setItem("p1crop-time3", 0);
    localStorage.setItem("p1crop-time4", 0);
    localStorage.setItem("p1crop-time5", 0);
    localStorage.setItem("p1crop-time6", 0);

    ready2();
}