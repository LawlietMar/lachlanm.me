if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}