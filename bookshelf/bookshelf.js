if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var fired = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}