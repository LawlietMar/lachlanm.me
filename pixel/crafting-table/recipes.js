var recipes = {
    //2 item recipes
    "axe branch" : [["pole"], ["branch"]],
    "axe pole" : [["oar"], ["pole"]],
    "pole rope" : [["unlit-torch"], ["pole", "rope"]],
    "oar rope" : [["unlit-oar"], ["oar", "rope"]],
    "axe fish" : [["cut-fish"], ["fish"]],
    "cut-fish torch" : [["cooked-fish"], ["cut-fish"]],
    "cut-fish lit-oar" : [["cooked-fish"], ["cut-fish"]],

    //3 item recipes
    "axe orb1 unlit-torch": [["torch"], ["unlit-torch"]],
    "axe orb2 unlit-torch": [["torch"], ["unlit-torch"]],
    "axe orb3 unlit-torch": [["torch"], ["unlit-torch"]], 
    "key orb1 unlit-torch": [["torch"], ["unlit-torch"]],
    "key orb2 unlit-torch": [["torch"], ["unlit-torch"]],
    "key orb3 unlit-torch": [["torch"], ["unlit-torch"]], 
    "orb1 shovel unlit-torch": [["torch"], ["unlit-torch"]],
    "orb2 shovel unlit-torch": [["torch"], ["unlit-torch"]],
    "orb3 shovel unlit-torch": [["torch"], ["unlit-torch"]], 
    "orb1 pickaxe unlit-torch": [["torch"], ["unlit-torch"]],
    "orb2 pickaxe unlit-torch": [["torch"], ["unlit-torch"]],
    "orb3 pickaxe unlit-torch": [["torch"], ["unlit-torch"]],
    "branch rope unlit-torch": [["torch"], ["unlit-torch"]],
    "pole rope unlit-torch": [["torch"], ["unlit-torch"]],

    "axe orb1 unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "axe orb2 unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "axe orb3 unlit-oar": [["lit-oar"], ["unlit-oar"]], 
    "key orb1 unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "key orb2 unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "key orb3 unlit-oar": [["lit-oar"], ["unlit-oar"]], 
    "orb1 shovel unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "orb2 shovel unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "orb3 shovel unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "orb1 pickaxe unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "orb2 pickaxe unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "orb3 pickaxe unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "branch rope unlit-oar": [["lit-oar"], ["unlit-oar"]],
    "pole rope unlit-oar": [["lit-oar"], ["unlit-oar"]]

    //4 item recipes 

    //5 item recipes 

    //6 item recipes 

    //7 item recipes 

    //8 item recipes 

}

export function sendRec(){
    return recipes;
}