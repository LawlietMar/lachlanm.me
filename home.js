if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var fired = false;
var timeout;

function ready(){
    var stay = document.getElementsByClassName("stay-button")[0];
    stay.addEventListener('click', rekindle);
}

var cnt = 20;
function rekindle(){
    if (fired == false){
        var fire = document.getElementsByClassName("fire")[0];
        var add = "the" + '\xa0' + "fire" + '\xa0' + "is" + '\xa0' + "burning" + '\xa0' + "brightly!"
        erase(fire);
        if (cnt == 0){
            write(fire, cnt, add);
        }

        fired = true;
    }
}

function erase(fire){
    if (cnt > 0){
        cnt = cnt - 1;
        fire.innerText = fire.innerText.substring(0, fire.innerText.length -1);
        sleep(50).then(() => {erase(fire);});
    }
}

function write(fire, cnt, add){
    if (cnt == 0){
        fire.classList.add("burning-fire");
    }
    if (cnt < 30){
        fire.innerText = fire.innerText + add.charAt(cnt);
        cnt = cnt + 1;
        sleep(80).then(() => {write(fire, cnt, add);});
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }