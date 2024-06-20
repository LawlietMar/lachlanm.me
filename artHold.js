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
                    <li class="art artln"><span class="art artln">      l....^..O....^.l </span></li>     
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
            `
};

export function getArt(){
    return arts;
}

export function getAch(){
    return ach;
}