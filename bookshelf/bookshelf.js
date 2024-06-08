if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    initItems();
    if (localStorage.getItem("has-key") == "true"){
        removeKey();
    }

    else {
        document.getElementById("key-button").addEventListener('click', getKey);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeKey(){
    document.getElementsByClassName("art")[0].innerHTML = `
                <span class="art tall">	              ________________________________________________</span>
                <span class="art">                   <sub>*</sub>*<sup>*</sup> .....................................................................................      .<sub>*</sub>*</span>
                <span class="art">               <sub>*</sub>*<sup>*</sup> <sub>*</sub>*<sup>*</sup>                                                                                   <sub>*</sub>*<sup>*</sup> <sub>*</sub>*<sup>*</sup>*</span>
                <span class="art">           <sub>*</sub>*<sup>*</sup> <sub>*</sub>*<sup>*</sup>                                                                                   <sub>*</sub>*<sup>*</sup> <sub>*</sub>*<sup>*</sup>    *</span>
                <span class="art">       <sub>*</sub>*<sup>*</sup> <sub>*</sub>*<sup>*</sup>...................................................................................<sub>*</sub>*<sup>*</sup> <sub>*</sub>*<sup>*</sup>        *</span>
                <span class="art">   <sub>*</sub>*<sup>*</sup>............................................................................................<sub>*</sub>*<sup>*</sup>	            *</span>
                <span class="art"> *                                                                                                *               <sub>*</sub>*<sup>*</sup></span>
                <span class="art">#                                                                                               *    <span class:half-space> </span>       .<sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup></span>
                <span class="art">#                       <a class="in-img" href="website/website.html">lachlanm.me</a>                     *   <span class:half-space> </span>     <sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup> *</span> 
                <span class="art">#                                                                                               *     <sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup>    *</span>
                <span class="art">  *...............................................................................................*<sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup>        *</span>
                <span class="art">   .............................................................................................. *<sub>*</sub>*<sup>*</sup>	            *</span>
                <span class="art"> *                                                                                                *                <sub>*</sub>*<sup>*</sup></span>
                <span class="art">#                                                                                               *             <sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup></span>
                <span class="art">#                           <span class="in-img">Ramblings</span>                           *         <sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup> *</span>
                <span class="art">#                                                                                               *     <sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup>    *</span>
                <span class="art">  *...............................................................................................*<sub>*</sub>*<sup>*</sup><sub>*</sub>*<sup>*</sup>        *</span>
                <span class="art">   ............................................................................................... <sub>*</sub>*<sup>*</sup>	            *</span>
                <span class="art"> *                                                                                                *               <sub>*</sub>*<sup>*</sup></span>
                <span class="art">#                                                                                               *             <sub>*</sub>*<sup>*</sup></span>
                <span class="art">#               <span class="in-img">Comprehension</span>                    *         <sub>*</sub>*<sup>*</sup></span>
                <span class="art">#                                                                                                *     <sub>*</sub>*<sup>*</sup></span>
                <span class="art">  *................................................................................................*<sub>*</sub>*<sup>*</sup></span>
    `
}

function getKey(){
    removeKey();
    localStorage.setItem("has-key", "true");
    initItems();
}

function initItems(){
    var item;
    const items = ['key'];
    for (let i = 0; i<items.length;i++){
        if (localStorage.getItem("has-" +items[i]) == "true"){
            item = document.getElementById(items[i]);
            if (item.classList.contains("selected")){
                item.classList.remove("selected");
            }
            item.classList.remove("hidden");
            item.addEventListener('click', function(){select(item)});
        }
    }
}

function select(item){
    var sel = false;
    if (item.classList.contains("selected")){
        sel = true;
    }
    var ite;
    let items = ["key"];
    for (let i = 0; i<items.length;i++){
        ite = document.getElementById(items[i]);
        if (item.classList.contains("selected")){
            item.classList.remove("selected");
        }
    }
    if (!sel){ 
        item.classList.add("selected");
    }
}