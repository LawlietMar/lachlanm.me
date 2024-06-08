if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    sleep(40).then(() => {rainInc(); rainfInc(); checkOpen();});
    var fore = document.getElementsByClassName("hidden")[1];
    fore.addEventListener('click', checkOpen);
}

function checkOpen(){
    if ((localStorage.getItem('has-forest') == 'true') || document.getElementById("axe").classList.contains("selected")){
        localStorage.setItem('has-forest', 'true');
        var pict = document.getElementById("picture");
        pict.innerHTML = `
                    <span class="art">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
                    <span class="art">|          /         \\   /\\    /\\     /      \\          /             \\          /                                       /        \\   /..        ..\\    /\\/\\ */                \\            /      \\  /\\  */\\     |</span>
                    <span class="art">|/\\      /             \\/  \\  /  \\   /.      .\\  /\\    /               \\    /\\  /       \\                               /          \\/\\ /**----**\\    /  \\ \\/.....        .....\\          /        \\/  \\ /* \\    |</span>
                    <span class="art">|  \\   /                 \\  \\/    \\   /**'**\\  /  \\  /                 \\/\\/  \\/         \\                             /            \\ /            \\  /    \\  /     *****     \\    /\\  //.        .\\   /*  *\\   |</span>
                    <span class="art">|   \\/                     \\/      \\ /        \\/    \\/                   \\ \\  /..       ..\\                           /..          ..\\              \\/      \\/                   \\/\\/  \\/  /*-----*\\  /    - \\   |</span>
                    <span class="art">|  /                         \\      /          \\     --....       ....---  \\  / ***** \\                             /*--....--*\\                \\.   ../                     \\/    \\  /          \\/     *  \\  |</span>
                    <span class="art">|/                             \\   /            \\.....\\/    *****    \\     \\/           \\                           /              \\                \\** /                       \\     \\/           \\      -   \\ |</span>
                    <span class="art">|                                \\/              \\   /                 \\     /             \\                         /                \\              ..\\  /                         \\    /             \\..     ...\\|</span>
                    <span class="art">|...                       ........\\..       .....\\ /.*--....    ....--*.\\ /               \\                      /                   \\-----*****\\  /....                   ....\\  /               \\ **-*\\   |</span>
                    <span class="art">|  /*****--------***** \\ '    /  *****   \\   /           -         \\/...            ...\\                   /....             ....\\   *-        \\    / *****-----***** \\   /.....       .....\\       \\ |</span>
                    <span class="art">|/                            \\   /              \\ /                       \\  /***-----**\\                        / ********** \\           *    \\  /         -               \\   /   ******   \\         \\|</span>
                    <span class="art">|                               \\/                \\                         \\/               \\                      /                  \\                \\/                           \\ /                \\          |</span>
                    <span class="art">|                                 \\                \\                        /                 \\                    /                    \\               /                             \\                  \\       ..|</span>
                    <span class="art">|                                   \\               \\--................---/       -           \\                 /          -            \\         ..../                               \\                  \\****| |</span>
                    <span class="art">|                              -      \\........-----\\  ||  .----. |     /                     \\                /.........................\\***** | /.................................\\-...........-----\\  |  | | </span>
                    <span class="art">|          -               *            \\  |  |         | ||\`---\`| |    /-----...........-----\\                      |  -----  |   | |      |   |           | | .----.|  |            |   |   | |    \\.l...../ | </span>
                    <span class="art">|-----.......................----------\\   |          \\.|   |  |./           |      |   |                 </span><span class="art invis">-</span><span class="art">          |    |     |   |    |       |           |   |\`---\`|| |            |   |     |              |</span>
                    <span class="art">|          |  |    |   | |   \\...../| |  |    |   ,\`-\`-\`-\`-\`-\`-\`-\`-\`-\`-     | |        |                 </span><span class="art invis">*</span><span class="art">          | |     |  |    \\.........l./        \`-\`-\`-\`-\`-\`-\`-\`-\`-\`-      \\.l......./              |</span>
                    <span class="art">|          |       |     |          \\.l......./ &lt;     Garden      |.     |       |  |                 </span><span class="art invis">-</span><span class="art">          \\.l......./                         .|       Beach      \`&gt;                           |</span>
                    <span class="art">|          | |           |                         \`------------------       \\...l...../                 </span><span class="art invis">-*</span><span class="art">                                              --------------------’                             | </span>
                    <span class="art">|           \\.........../                                  | |    |                                          </span><span class="art invis">-</span><span class="art">                                                     |   |   |                                       |</span>
                    <span class="art">|                                                          |    | |                                          </span><span class="art invis">-</span><span class="art">                                                     |       |                                       |</span>
                    <span class="art">|                                                          |    | |                                          </span><span class="art invis">*</span><span class="art">                                                     | |   | |                                       |</span>
                    <span class="art">|                                                          ||     |                                          </span><span class="art invis">-</span><span class="art">                                                     | |     |                                       |</span>
                    <span class="art">|                                                          ||  |  |                                         </span><span class="art invis">--</span><span class="art">                                                     |    |  |                                       |</span>
                    <span class="art">|                                                          |  |   |                                          </span><span class="art invis">*</span><span class="art">                                                     |    |  |                                       |</span>
                    <span class="art">| -----------------------------------------------|*----*|-------------------------------------------------------------------------------|*----*|-------------------------------  |</span>
                    <span class="art">|                                                          *----*                                                                                                  -----*                                       | </span>
                    <span class="art">|                                                                                                                                                                                                                  |</span>
                    <span class="art">|                                                                                                                                                                                                                  | </span>
                    <span class="art">|                                                                                                                                                                                                                  | </span>
                    <span class="art">|                                                                                                                                                                                                                  |</span>
                    <span class="art">|                                                                                                                                                                                                                  |</span>
                    <span class="art">| -----------------------------------------------------------------------------                           -------------------------------------------------------------------------- |</span>
                    <span class="art">|                                                                                           /                           \\                                                                                          |</span>
                    <span class="art">|                                                                                          /                             \\                                                                                         | </span>
                    <span class="art">|                                                                                         /                               \\                                                                                        |</span>
                    <span class="art">|                                                                                        /                                 \\                                                                                       |</span>
                    <span class="art">|                                                                                       /                                   \\                                                                                      | </span>
                    <span class="art">|                                                                                      /                                     \\                                                                                     | </span>
                    <span class="art">|                                                                                     /                                       \\                                                                                    |</span>
                    <span class="art">|                                                                                    /                                         \\                                                                                   |</span>
                    <span class="art">|                                                                                   /                                           \\                                                                                  |</span>
                    <span class="art">|                                                                                  /                                             \\                                                                                 |</span>
                    <span class="art">|                                                                                 /                                               \\                                                                                |</span>
                    <span class="art">|                                                                                /                                                 \\                                                                               |</span>
                    <span class="art">|                                                                               /                                                   \\                                                                              | </span>
                    <span class="art">|                                                                              /                                                     \\                                                                             | </span>
                    <span class="art">--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>;`
    }
}

var raina = 0;
var rainb = 23;

var rainsa = [
    "|                     .                                                                                                                   .                                                                        |",
    "|                                                                             .                                                                                                                                    |",
    "|                                                      .                                                                                                      .                                                    |",
    "|                                                                                                                                                                                                                  |",
    "|                             .                                                        .                                   .                                                                                       |",
    "|                                                                                                                                                                                                    .             |",
    "|  .                                                                  .                                                                                                   .                                        |",
    "|                                                                                                                                                                                                                  |",
    "|                    .                                                                                                                              .                                                              |",
    "|                                               .                                                 .                                                                                                                |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                  .                                   .                                                                    .                      |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                              .   |",
    "|                        .                                                                                                                                 .                                                       |",
    "|                                                                                                                                    .                                                                             |",
    "|                                                   .                                                                                                                                                              |",
    "|                                                                                                                                                                         .                                        |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                              .                                                                                                                   |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                   .                                            .                                                                                               . |",
    "|                                                                                                                                                                                                                  |",
    "|    .                                                                                                                                                                                                             |",
    "|                      .                                                                                                                           .                          .                                    |",
    "|                                                                                                                                                                                                                  |",
    "|                                   .                                                                          .                                                                                      .            |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                        .                                                                                                                         |",
    "|                                                            .                                                                                                                                                     |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                        .                                                                         |",
    "|                                      .                                                                                                                                                                           |",
    "|            .                                                                                                                                                                     .                               |",
    "|                                                                            .                                                                                                                                  .  |",
    "|                                                                                                   .                                                                                                              |",
    "|                                                      .                                                                 .                                  .                                                      |",
    "|                                                                                                                                                                                                                  |",
    "|.                          .                                                                                                                                                                                      |",
    "|                                                                                                                                                                                     .                            |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                 .                                      .                                         |",
    "|                                       .                                 .                    .                                                                                                                   |",
    "|      .                                                                                                                                                                                                       .   |",
    "|                                                                                                                                                                                                                  |",
    "|                                                     .                                                                                                                                                            |"
]

var rainsb = [
    "|                                                                                                                                                                                                                  |",
    "|    l                                                                                                                                                                                                             |",
    "|                                                                                                                                         l                                                                        |",
    "|                                                                                                                                                                                                                 l|",
    "|                                                          l                                                                                                                                                       |",
    "|                                                                                                     l                                                                                                            |",
    "|                                                                                                                                                                                                                  |",
    "|                 l                                                                                                                                                                                                |",
    "|                                                                                                                                                                                      l                           |",
    "|                                                                                                                                                          l                                                       |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                             :                                                                                    |",
    "|                                l                                                                                                                                                                                 |",
    "|                                                                                                                                                                                                                  |",
    "|                                                            l                                                                                         :                                                           |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                l                                 |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                    l                                                                                                             |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                             l                                                                    |",
    "|                  l                              :                                                                                                                                                                |",
    "|                                                                          l                                                                                                              :                        |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                  l                                            l                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                 l                                                                                                                                                    l           |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|  l                                                                                                                                                                                                               |",
    "|                                                                                                                                   l                                                                              |",
    "|                                                                              l                                                                                                                                   |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                         l                                        |",
    "|                  l                                                                                                                                                                                               |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |",
    "|                                                                                                                                                                                                                  |"
]
function rainInc(){
    var cur;
    for (var i = 0; i < 46; i++){
        cur = document.getElementById(i);
        cur.innerHTML = rainsa[(46 + i - raina)%46]
    }

    raina = raina + 2;
    if (raina > 45){
        raina = raina-46;
    }
    sleep(50).then(() => {rainInc()});
}

function rainfInc(){
    var cur;
    for (var i = 47; i < 93; i++){
        cur = document.getElementById(i);
        cur.innerHTML = rainsb[(46 + i - rainb)%46]
    }

    rainb = rainb + 3;
    if (rainb > 45){
        rainb = rainb-46;
    }
    sleep(50).then(() => {rainfInc()});
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}