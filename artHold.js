var ach = {
    "8" : `
                    <li class="art artln"><span class="art artln">      |************|</span></li>
                    <li class="art artln"><span class="art artln">      |...../\\x/\\......|</span></li>
                    <li class="art artln"><span class="art artln">      |..<-.   ..->..|</span></li>
                    <li class="art artln"><span class="art artln">      l...../....\\......l </span></li>     
        `,
    "7" : `
                    <li class="art artln"><span class="art artln">      |************|</span></li>
                    <li class="art artln"><span class="art artln">      |   ^^  /.\\  ^  |</span></li>
                    <li class="art artln"><span class="art artln">      | ^      ||     ^|</span></li>
                    <li class="art artln"><span class="art artln">      l....^...O...^.l </span></li>     
        `,
    "6" : `
                    <li class="art artln"><span class="art artln">      |************|</span></li>
                    <li class="art artln"><span class="art artln">      |*.     \\  /   .*|</span></li>
                    <li class="art artln"><span class="art artln">      |  :     v    :  |</span></li>
                    <li class="art artln"><span class="art artln">      l.*.....l.l....*..l </span></li>     
        `
}
var arts = {
    // Key item HTML representation
    "key" : `
                <ul class="item" id="key">
                    <li class="art artln"><span class="art artln">      .---.                </span></li>
                    <li class="art artln"><span class="art artln">     l      \`--^-^--^-. </span></li>
                    <li class="art artln"><span class="art artln">     l  O   ----------*</span></li>
                    <li class="art artln"><span class="art artln">      \`----’</span></li>     
                </ul>
            `,
    // Axe item HTML representation
    "axe" : `
                <ul class="item" id="axe">
                    <li class="art artln"><span class="art artln">                       ..  </span></li>
                    <li class="art artln"><span class="art artln">            ...---***-:\` </span></li>
                    <li class="art artln"><span class="art artln">   ...---***---**\\    \`-.  </span></li>
                    <li class="art artln"><span class="art artln">  *---***         *--..--* </span></li>     
                </ul>
            `,
    // Shovel item HTML representation
    "shovel": `
                <ul class="item" id="shovel">
                    <li class="art artln"><span class="art artln">   .                  .--...</span></li>
                    <li class="art artln"><span class="art artln">  : /\`-............../ .... \\</span></li>
                    <li class="art artln"><span class="art artln">  : /.-**********| *** /</span></li>
                    <li class="art artln"><span class="art artln">   *                 *--** </span></li>     
                </ul>
            `,
    // Rose seeds item HTML representation
    "rose-seeds" : `
                <ul class="item" id="rose-seeds">
                    <li class="art artln"><span class="art artln">         .-:::::::-.</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  |  ..-..  |</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | ((o))<span class="art invis in-list">*</span>|</span></li>
                    <li class="art artln"><span class="art artln">         l..........l</span></li>     
                </ul>
            `,
    // Daisy seeds item HTML representation
    "daisy-seeds" : `
                <ul class="item" id="daisy-seeds">
                    <li class="art artln"><span class="art artln">         .-:::::::-.</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | - o -  |</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | oOo<span class="art invis in-list">*</span>|</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  l....l.....l</span></li>     
                </ul>
            `,
    // Can item HTML representation
    "can" : `
                <ul class="item" id="can">
                    <li class="art artln"><span class="art artln">         ..--..     .---.</span></li>
                    <li class="art artln"><span class="art artln">   .--./**--**\\.-*.\`\`.*</span></li>
                    <li class="art artln"><span class="art artln"><span class="art invis in-list">*</span> l.C|        *.-* **</span></li>
                    <li class="art artln"><span class="art artln"><span class="art invis in-list">*</span>  **' *-....-*  </span></li>     
                </ul>
            `,
    "map1" : `
                <ul class="item" id="map1">
                    <li class="art artln"><span class="art artln">       |/*-*v-**&#123;</span></li>
                    <li class="art artln"><span class="art artln">       |\\..  \\..   &#125;</span></li>
                    <li class="art artln"><span class="art artln">       |    \\.../    &#123</span></li>
                    <li class="art artln"><span class="art artln">       ------------</span></li>     
                </ul>
            `,
    "rose" : `
                <ul class="item" id="rose">
                    <li class="art artln"><span class="art artln red">            ..-..  </span></li>
                    <li class="art artln"><span class="art artln red">           ((o))  </span></li>
                    <li class="art artln"><span class="art artln">            <span class="art artln green">\\</span><span class="art artln red">~</span><span class="art artln green">/-</span>*</span></li>
                    <li class="art artln"><span class="art artln">           *<span class="art artln green">|/</span>   </span></li>     
                </ul>
            `,
    "daisy" : `
                <ul class="item" id="daisy">
                    <li class="art artln"><span class="art artln">            <span class="art artln white">- o -</span> </span></li>
                    <li class="art artln"><span class="art artln">           <span class="art artln white">o</span> <span class="art artln yellow">O</span> <span class="art artln white">o</span> </span></li>
                    <li class="art artln"><span class="art artln">            <span class="art artln white">- o - </span></span></li>
                    <li class="art artln"><span class="art artln">              <span class="art artln green">||</span>   </span></li>     
                </ul>
            `,
    "fish" : `
                <ul class="item" id="fish">
                    <li class="art artln"><span class="art artln">     |\\        …--.    </span></li>
                    <li class="art artln"><span class="art artln">     | *---**....x *.</span></li>
                    <li class="art artln"><span class="art artln">     | .---...   *   .*  </span></li>
                    <li class="art artln"><span class="art artln">     |/        **--* </span></li>     
                </ul>
            `,
    "map2" : `
                <ul class="item" id="map2">
                    <li class="art artln"><span class="art artln"></span></li>
                    <li class="art artln"><span class="art artln">     ./********-.    </span></li>
                    <li class="art artln"><span class="art artln">     |. (::::::() (**()</span></li>
                    <li class="art artln"><span class="art artln">      \\...........-***   </span></li>
                </ul>
            `,
    "branch" : `
                <ul class="item" id="branch">
                    <li class="art artln"><span class="art artln">                 ....---.   </span></li>
                    <li class="art artln"><span class="art artln">      ...---***        .*</span></li>
                    <li class="art artln"><span class="art artln">    .**.         ...---*</span></li>
                    <li class="art artln"><span class="art artln">     *.:.---***          </span></li>
                </ul>
            `,
    "shell" : `
                <ul class="item" id="shell">
                    <li class="art artln"><span class="art artln">         ..-** **-..    </span></li>
                    <li class="art artln"><span class="art artln">        /  \\   |   /  \\</span></li>
                    <li class="art artln"><span class="art artln">        *-.\\     /.-* </span></li>
                    <li class="art artln"><span class="art artln">            \\\\...// </span></li>
                </ul>
            `,
    "map-shack" : `
                <ul class="item" id="map-shack">
                    <li class="art artln"><span class="art artln">                  .-**.  </span></li>
                    <li class="art artln"><span class="art artln">             ..-*  .-*</span></li>
                    <li class="art artln"><span class="art artln">         .-*  ..-*</span></li>
                    <li class="art artln"><span class="art artln">       @.-*  </span></li>
                </ul>
            `,
    "grave-map" : `
                <ul class="item" id="grave-map">
                    <li class="art artln"><span class="art artln">                ..-**.  </span></li>
                    <li class="art artln"><span class="art artln">            ..-* ..-* </span></li>
                    <li class="art artln"><span class="art artln">       ..-*  ..-*   </span></li>
                    <li class="art artln"><span class="art artln">     @..-* </span></li>
                </ul>
            `,
    "fishing-rod" : `
                <ul class="item" id="fishing-rod">
                    <li class="art artln"><span class="art artln">                      ..--*/</span></li>
                    <li class="art artln"><span class="art artln">               ..--**     /</span></li>
                    <li class="art artln"><span class="art artln">        ..--**           C</span></li>
                    <li class="art artln"><span class="art artln"> ..--**..*  </span></li>
                </ul>
            `,
    "orb1" : `
                <ul class="item" id="orb1">
                    <li class="art artln"><span class="art artln"></span></li>
                    <li class="art artln"><span class="art artln">           ...---..          </span></li>
                    <li class="art artln"><span class="art artln">       .-:*  <span class="art artln blue">@</span>   *:-</span></li>
                    <li class="art artln"><span class="art artln">           **---** </span></li>
                </ul>
            `,
    "oar" : `
                <ul class="item" id="oar">
                    <li class="art artln"><span class="art artln">                    :: </span></li>
                    <li class="art artln"><span class="art artln">                .-*</span></li>
                    <li class="art artln"><span class="art artln">          .--*:  </span></li>
                    <li class="art artln"><span class="art artln">         *..-*</span></li>
                </ul>
            `,
    "cornflower-seeds" : `
                <ul class="item" id="cornflower-seeds">
                    <li class="art artln"><span class="art artln">         .-:::::::-.</span></li>
                    <li class="art artln"><span class="art artln">      <span class="art invis in-list">-</span>  | -. l .- |</span></li>
                    <li class="art artln"><span class="art artln">         | --O-- |</span></li>
                    <li class="art artln"><span class="art artln">         l..::.l.::.l </span></li>     
                </ul>
            `,
    "poppy-seeds" : `
                <ul class="item" id="poppy-seeds">
                    <li class="art artln"><span class="art artln">         .-:::::::-.</span></li>
                    <li class="art artln"><span class="art artln">         | @ -.  | </span></li>
                    <li class="art artln"><span class="art artln">         |  *-.. \\ |</span></li>
                    <li class="art artln"><span class="art artln">         l.......ll.l  </span></li>     
                </ul>
            `,
    "shed-map" : `
                <ul class="item" id="shed-map">
                    <li class="art artln"><span class="art artln">         l***--****|</span></li>
                    <li class="art artln"><span class="art artln">         \\ .   /.\\ /\\ |</span></li>
                    <li class="art artln"><span class="art artln">         / /\\|  -...| |</span></li>
                    <li class="art artln"><span class="art artln">        |.....**--...|</span></li>     
                </ul>
            `,
    "poppy" : `
                <ul class="item" id="poppy">
                    <li class="art artln"><span class="art orange artln">         .:-:-. </span></li>
                    <li class="art artln"><span class="art artln">        <span class="art orange artln">((O*-:</span><span class="art green artln">.</span></span></li>
                    <li class="art artln"><span class="art artln">         <span class="art orange artln">*--**</span><span class="art green artln">-.\\  .  </span></span></li> 
                    <li class="art artln"><span class="art green artln">                \\ |//</span></li>     
                </ul>
            `,
    "cornflower" : `
                <ul class="item" id="cornflower">
                    <li class="art artln"><span class="art blue artln">    <span class="art invis in-list">*</span>      -.  l  .-</span></li>
                    <li class="art artln"><span class="art blue artln">    <span class="art invis in-list">-</span>       --O--</span></li>
                    <li class="art artln"><span class="art artln">            <span class="art blue artln">.-</span> <span class="art green artln">||</span> <span class="art blue artln">-.</span></span></li>
                    <li class="art artln"><span class="art green artln">    <span class="art invis in-list">-</span>          ||</span></li>    
                </ul>
            `,
    "p1cornflower" : `
                <ul class="item" id="p1cornflower">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p1cornflower.png">   
                </ul>
            `,
    "p1poppy" : `
                <ul class="item" id="p1poppy">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p1poppy.png">   
                </ul>
            `,
    "p1daisy" : `
                <ul class="item" id="p1daisy">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p1daisy.png">   
                </ul>
            `,
    "p1rose" : `
                <ul class="item" id="p1rose">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p1rose.png">   
                </ul>
            `,
    "map-fotm" : `
                <ul class="item" id="map-fotm">
                    <li class="art artln"><span class="art artln">         ||*******|</span></li> 
                    <li class="art artln"><span class="art artln">         ||/**-*\\  /</span></li> 
                    <li class="art artln"><span class="art artln">         |||.-../\\  \\</span></li> 
                    <li class="art artln"><span class="art artln">         ||........./</span></li>    
                </ul>
            `,
    "rope" : `
                <ul class="item" id="rope">
                    <li class="art artln"><span class="art artln">          .--**--.. </span></li> 
                    <li class="art artln"><span class="art artln">         :-*--..--*</span></li> 
                    <li class="art artln"><span class="art artln">          **--..--*:</span></li> 
                    <li class="art artln"><span class="art artln">          -...----* </span></li>    
                </ul>
            `,
    "pole" : `
                <ul class="item" id="pole">
                    <li class="art artln"><span class="art artln">              ..--**l*. </span></li> 
                    <li class="art artln"><span class="art artln">       ..--**..--***.l</span></li> 
                    <li class="art artln"><span class="art artln">      |..--** ..--** </span></li> 
                    <li class="art artln"><span class="art artln">      *...--** </span></li>    
                </ul>
            `,
    "unlit-torch" : `
                <ul class="item" id="unlit-torch">
                    <li class="art artln"><span class="art artln"></span></li>    
                    <li class="art artln"><span class="art artln">                     ##</span></li> 
                    <li class="art artln"><span class="art artln">             ..--**</span></li> 
                    <li class="art artln"><span class="art artln">      ..--**  </span></li> 
                </ul>
            `,
    "torch" : `
                <ul class="item" id="torch">
                    <li class="art artln"><span class="art artln">                  -*.:.</span></li> 
                    <li class="art artln"><span class="art artln">                  \\\\.//</span></li> 
                    <li class="art artln"><span class="art artln">            ..--** </span></li> 
                    <li class="art artln"><span class="art artln">     ..--**</span></li>    
                </ul>
            `,
    "pickaxe" : `
                <ul class="item" id="pickaxe">
                    <li class="art artln"><span class="art artln">             **--..</span></li> 
                    <li class="art artln"><span class="art artln">                .%\\</span></li> 
                    <li class="art artln"><span class="art artln">           .-:-*    \\ </span></li> 
                    <li class="art artln"><span class="art artln">      .-:-*         *</span></li>    
                </ul>
            `,
    "unlit-oar" : `
                <ul class="item" id="unlit-oar">
                    <li class="art artln"><span class="art artln">                   ::</span></li> 
                    <li class="art artln"><span class="art artln">               .-*</span></li> 
                    <li class="art artln"><span class="art artln">         .=*: </span></li> 
                    <li class="art artln"><span class="art artln">        *:=*</span></li>    
                </ul>
            `,
    "lit-oar" : `
                <ul class="item" id="lit-oar">
                    <li class="art artln"><span class="art artln">                     ::</span></li> 
                    <li class="art artln"><span class="art artln">        -:*-:   .-* </span></li> 
                    <li class="art artln"><span class="art artln">          --* *: </span></li> 
                    <li class="art artln"><span class="art artln">          *:=* </span></li>    
                </ul>
            `,
    "coin" : `
                <ul class="item" id="coin">
                    <li class="art artln"><span class="art artln">           .-***-.  </span></li> 
                    <li class="art artln"><span class="art artln">          /<span class="art invis in-list">*</span>  .-.  \\     </span></li> 
                    <li class="art artln"><span class="art artln">          \\   *-*  /       </span></li> 
                    <li class="art artln"><span class="art artln">           *-....-* </span></li>    
                </ul>
            `,
    "cut-fish" : `
                <ul class="item" id="cut-fish">
                    <li class="art artln"><span class="art artln">                ....  </span></li> 
                    <li class="art artln"><span class="art artln">         ..--**   *-.</span></li> 
                    <li class="art artln"><span class="art artln">     -:::............-* </span></li> 
                    <li class="art artln"><span class="art artln"></span></li>    
                </ul>
            `,
    "cooked-fish" : `
                <ul class="item" id="cooked-fish">
                    <li class="art artln"><span class="art artln">                ....</span></li> 
                    <li class="art artln"><span class="art artln">         ..--**...*-. </span></li> 
                    <li class="art artln"><span class="art artln">     -:::...::::.....-*</span></li> 
                    <li class="art artln"><span class="art artln"></span></li>    
                </ul>
            `,
    "orb2" : `
                <ul class="item" id="orb2">
                    <li class="art artln"><span class="art artln">     |************| </span></li> 
                    <li class="art artln"><span class="art artln">     |      &lt;l>>    |  </span></li> 
                    <li class="art artln"><span class="art artln">     |   <:l>>>    |</span></li> 
                    <li class="art artln"><span class="art artln">     l.................l </span></li>    
                </ul>
            `,
    "purple-pickaxe" : `
                <ul class="item" id="pickaxe">
                    <li class="art artln"><span class="art artln purple">             **--..</span></li> 
                    <li class="art artln"><span class="art artln">                .<span class="art artln purple">%\\</span></span></li> 
                    <li class="art artln"><span class="art artln">           .-:-*    <span class="art artln purple">\\ </span></span></li> 
                    <li class="art artln"><span class="art artln">      .-:-*         <span class="art artln purple">*</span></span></li>    
                </ul>
            `,
    "amythest1" : `
                <ul class="item" id="amythest1">
                    <li class="art artln"><span class="art artln">         ..--**--.. </span></li> 
                    <li class="art artln"><span class="art artln">        /   /    \\   \\ </span></li> 
                    <li class="art artln"><span class="art artln">        *-.\\    / .-* </span></li> 
                    <li class="art artln"><span class="art artln">           *-..-*</span></li>    
                </ul>
            `,
    "amythest2" : `
                <ul class="item" id="amythest2">
                    <li class="art artln"><span class="art artln">         ..--**--.. </span></li> 
                    <li class="art artln"><span class="art artln">        /   /    \\   \\ </span></li> 
                    <li class="art artln"><span class="art artln">        *-.\\    / .-* </span></li> 
                    <li class="art artln"><span class="art artln">           *-..-*</span></li>    
                </ul>
            `,
    "amythest3" : `
                <ul class="item" id="amythest3">
                    <li class="art artln"><span class="art artln">         ..--**--.. </span></li> 
                    <li class="art artln"><span class="art artln">        /   /    \\   \\ </span></li> 
                    <li class="art artln"><span class="art artln">        *-.\\    / .-* </span></li> 
                    <li class="art artln"><span class="art artln">           *-..-*</span></li>    
                </ul>
            `,
    "amythest-seeds" : `
                <ul class="item" id="amythest-seeds">
                    <li class="art artln"><span class="art artln">             .----.    </span></li> 
                    <li class="art artln"><span class="art artln">        .--.*-..-*.--.  </span></li> 
                    <li class="art artln"><span class="art artln">         \\./ .--.   \\./ </span></li> 
                    <li class="art artln"><span class="art artln">            *-.-*     </span></li>    
                </ul>
            `,
    "amythest" : `
                <ul class="item" id="amythest">
                    <li class="art artln"><span class="purple artln art">         .-**-.</span></li>
                    <li class="art artln"><span class="purple artln art">         *-:**|</span></li>
                    <li class="art artln"><span class="pink artln art">            *\\ \\ </span></li>
                    <li class="art artln"><span class="green artln art">               ||</span></li> 
                </ul>
            `,
    "emerald" : `
                <ul class="item" id="emerald">
                    <li class="art artln"><span class="green artln art">           .--*--.     </span></li>
                    <li class="art artln"><span class="green artln art">          :--.:.--:   </span></li>
                    <li class="art artln"><span class="green artln art">           *-. .-* </span></li>
                    <li class="art artln"><span class="green artln art">              ||  </span></li>  
                </ul>
            `,
    "p1amythest" : `
                <ul class="item" id="p1amythest"> 
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p1amythest.png">   
                </ul>
            `,
    "p1emerald" : `
                <ul class="item" id="p1emerald">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p1emerald.png">   
                </ul>
            `,
    "p2amythest" : `
                <ul class="item" id="p2amythest">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p2amythest.png">   
                </ul>
            `,
    "p2emerald" : `
                <ul class="item" id="p2emerald">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p2emerald.png">   
                </ul>
            `,
    "p2rose" : `
                <ul class="item" id="p2rose">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p2rose.png">   
                </ul>
            `,
    "p2daisy" : `
                <ul class="item" id="p2daisy">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p2daisy.png">   
                </ul>
            `,
    "p2poppy" : `
                <ul class="item" id="p2poppy">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p2poppy.png">   
                </ul>
            `,
    "p2cornflower" : `
                <ul class="item" id="p2cornflower">
                    <img class="abs flower" draggable="false" alt="" src="../../global-art/items/p2cornflower.png">   
                </ul>
            `
};

export function getArt(){
    return arts;
}

export function getAch(){
    return ach;
}