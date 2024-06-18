if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    sleep(10).then(() => ready());
}

var time
function ready(){
    var permission = localStorage.getItem('audioAutoplayPermission') === 'granted';
    time = localStorage.getItem("aud-spot");
    var aud = document.getElementsByClassName("aud")[0];

    if (permission){
        aud.currentTime = parseInt(time);
        aud.play();
    }
    incTime(time);
}

function incTime(){
    time = parseInt(time) + 1;
    if (parseInt(time) > 184){
        time = 0;
    }
    localStorage.setItem("aud-spot", time);
    sleep(1000).then(() => {incTime()});
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}