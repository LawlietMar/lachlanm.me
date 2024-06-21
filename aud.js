if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready2);
} else {
    // If the document is already loaded, call the ready function directly.
    ready2();
}

export function ready2(){
    sleep(10).then(() => {
        var has = localStorage.getItem("balls");
        document.getElementsByClassName("aud2")[0].volume = parseFloat(has) * 0.4;

    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}