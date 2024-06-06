if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var requestButton = document.getElementById('requestPermission');
    var permission = localStorage.getItem('audioAutoplayPermission') === 'granted';
    var aud = document.getElementsByClassName("aud")[0];

    if (permission){
        playAudio(requestButton);
    }

    requestButton.addEventListener('click', () => {
        aud.play();
        localStorage.setItem('audioAutoplayPermission', 'granted');
        playAudio(requestButton);
    })
}

function playAudio(requestButton) {
    requestButton.parentElement.parentElement.removeChild('window');
    aud.play();
}