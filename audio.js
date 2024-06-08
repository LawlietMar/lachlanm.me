if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var requestButton = document.getElementById('requestPermission');
    var permission = localStorage.getItem('audioAutoplayPermission') === 'granted';
    var aud = document.getElementsByClassName("aud")[0];
    var list = requestButton.parentElement.parentElement; 
    var outside = document.getElementsByClassName("travel-button")[1];

    if (permission){
        playAudio(aud,list);
    }

    outside.addEventListener('click', () => {
        localStorage.setItem('audioAutoplayPermission', 'granted');
    });

    requestButton.addEventListener('click', () => {
        list.removeChild(requestButton.parentElement);
        aud.play();
        localStorage.setItem('audioAutoplayPermission', 'granted');
        playAudio(aud, list);
    })
}

function playAudio(aud, list) {
    aud.play();

    if (navigator.userActivation.isActive){
        const node = document.createElement("li");
        const stopButton = document.createElement('button');
        stopButton.textContent = 'Close the window';
        stopButton.classList.add('stay-button')
        node.appendChild(stopButton);
        list.appendChild(node);

        stopButton.addEventListener('click', () => {
            list.removeChild(stopButton.parentElement);
            aud.pause();
            localStorage.setItem('audioAutoplayPermission', 'null');
            stopAudio(aud, list);
        })
    }
}

function stopAudio(aud, list){
    aud.pause();

    const node = document.createElement("li");
    const requestButton = document.createElement('button');
    requestButton.textContent = 'Open the window';
    requestButton.classList.add('stay-button')
    requestButton.setAttribute('id', 'requestPermission');
    node.appendChild(requestButton);
    list.appendChild(node);

    requestButton.addEventListener('click', () => {
        list.removeChild(requestButton.parentElement);
        aud.play();
        localStorage.setItem('audioAutoplayPermission', 'granted');
        playAudio(aud, list);
    })
}