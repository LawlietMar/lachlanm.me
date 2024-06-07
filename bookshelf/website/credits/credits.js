if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
var spot = -1;
var lpages = [
    `<h1 class="title pg">Credits</h1> 
    <p class="pg">
        There are many reasons this website came into existence, but there are a few thank yous I'd like to say in particular. In order of approximate importance:
        <ul class="pg">
            <li class="pg">
                <b class="pg">Thank you to Logan</b> for motivating me to be a better person and do something cool, as well as giving some inspiration for this site 
                <p></p>
            </li>
            <li class="pg">
                Thank you to Huxley for helping me troubleshoot my endless random bugs/issues and tolerating my hard-coding stubborness
            </li>
        </ul>
    </p>
    <p class="pg">
   `
];
var rpages = [
    `
    <ul class="pg">
        <li class="pg">
            Thank you to Agniv for supporting me throughout the process, helping me bounce ideas, and generally being a cool motivating person
        </li>
    </ul>`
];

function ready(){
    var lbut = document.getElementsByClassName("lbut")[0];
    var rbut = document.getElementsByClassName("rbut")[0];

    lbut.addEventListener('click', pagel);
    rbut.addEventListener('click', pager);
    pager();
}

function pagel(){
    sleep(50).then(() => {
        if (spot > 0){
            spot = spot - 1;
            document.getElementById("pl").innerHTML = lpages[spot];
            document.getElementById("pr").innerHTML = rpages[spot];
        }
    });
}

function pager(){
    sleep(50).then(() => {
        if (spot == -1 || spot < (lpages.length - 1)){
            spot = spot + 1;
            document.getElementById("pl").innerHTML = lpages[spot];
            document.getElementById("pr").innerHTML = rpages[spot];
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}