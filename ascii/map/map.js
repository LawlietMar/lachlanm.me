if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If the document is already loaded, call the ready function directly.
    ready();
}

function ready(){
    if (!(localStorage.getItem("put-map-1") == "true")){
        document.getElementsByClassName("map1")[0].classList.add("invis");
    }
    if (!(localStorage.getItem("put-map-2") == "true")){
        document.getElementsByClassName("map2")[0].classList.add("invis");
    }
}