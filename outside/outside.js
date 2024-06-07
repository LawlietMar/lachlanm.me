if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    sleep(40).then(() => {checkOpen()});
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}