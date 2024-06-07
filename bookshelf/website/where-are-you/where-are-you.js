if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
var spot = -1;
var lpages = [
    `<h1 class="title pg">Where Are You?</h1> 
    <p class="pg">
    Welcome. If you're new here, you opened the right book to the right page, so good job. 
    If you're not, welcome back, though you should already know your way around the place.
    </p>
    <p class="pg">
    This is my world, and you're in my house (but that's okay! You're welcome here!). 
    I spend a lot of my free time curating and growing this place; at first I made it to learn the tools such a process entails, 
    namely js, css, and html, but at some point it just became a hobby, and a venue for art. Though making something cool to others 
    is nice, the aim of this page has always been to make something comfortable. Specifically, to make </p>`, 

    `<p class="pg">
    thoughts. What I put here is split into three books, as you've already seen; "lachlan.me," "Ramblings," and "Comprehension."
    The first covers info about the site and myself, the second is a collection of ideas/stats/things I've written — essentially a normal blog, — 
    and in the third I put notes on confusing things I read. This is mostly to improve my own understanding, but if you want my take on 
    things feel free to check it out!
    </p>
    <p class="pg">
    Outside the house is a bit different. This is more inspired by classic RPGs, specifically puzzle solving ones (think Infocom). 
    I won't say too much about it - no spoilers, - but keep in mind that house and the outside world aren't completely separate. 
    <b class="pg">Items you find out there can affect</b>
    </p>`
];
var rpages = [
    `<p class="pg">
    something comfortable to me.
    It's a space I would want to work in, or read in, or really do anything in. 
    </p>
    <p class="pg">
    A lot of the design choices, ascii art, for example, are because I wanted to/felt it would be nice. 
    This is the best reason possible. If you like it, maybe we can be friends, 
    and if you don't, then unfortunately for you, this is still my house. 
    </p>
    <p class="pg">
    Inside the house is my ideal cozy space - warm bed, fire, and rain. It's what my family does for Christmas. 
    The ascii art just seems minimal and nice to me, which I suspect comes from my residual feelings about CandyBox2, which I've played 
    dozen(s) of times. It being so safe and cozy for me, this is a place I'm comfortable writing my 
    </p>`,

    `<b class="pg">things inside the house.</b>
    <p class="pg">
    I think that should be everything you need to know to get started. Good luck, and welcome to my house :)
    </p>
    <p class="pg">
    I hope you enjoy your stay!
    </p>`
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