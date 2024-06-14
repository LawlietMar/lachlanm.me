if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var permission = localStorage.getItem('audioAutoplayPermission') === 'granted';
    var aud = document.getElementsByClassName("aud")[0];

    if (permission){
        aud.play();
    }
}